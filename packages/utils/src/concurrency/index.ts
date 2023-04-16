type Callback = (resolved?: unknown, rejected?: unknown) => void;

interface QueueObject {
  args: unknown;
  callbacks: Callback[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lockFactory = <T extends (...args: any) => Promise<any>>(func: T): T => {
  const queue: Record<string, QueueObject> = {};
  let timer: NodeJS.Timer | null = null;

  const lockedFunction = async (...args: Parameters<T>) => {
    return await new Promise((resolve, reject) => {
      pushToQueue(args, (resolved, rejected) => {
        if (rejected) {
          reject(rejected);
        } else {
          resolve(resolved);
        }
      });
    });
  };

  const pushToQueue = (args: unknown, callback: Callback) => {
    const queueIsIdle = Object.keys(queue).length <= 0;

    const argsHash = JSON.stringify(args); // better hash it for better performance
    if (queue[argsHash]) {
      queue[argsHash].callbacks.push(callback);
    } else {
      queue[argsHash] = { callbacks: [callback], args };
    }
    if (queueIsIdle) {
      processFirstItem("manual");
    }
  };

  const processFirstItem = async (runType?: "manual") => {
    const queueKeys = Object.keys(queue);

    if (queueKeys.length <= 0) {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      return;
    } else if (runType === "manual") {
      if (!timer) {
        timer = setInterval(processFirstItem, 0);
      }
      return;
    }
    const { args, callbacks } = queue[queueKeys[0]];
    delete queue[queueKeys[0]];
    try {
      const result = await func(...(args as unknown[]));
      for (let index = 0; index < callbacks.length; index++) {
        callbacks[index](result);
      }
    } catch (error) {
      for (let index = 0; index < callbacks.length; index++) {
        callbacks[index](undefined, error);
      }
    }
  };

  return lockedFunction as T;
};
