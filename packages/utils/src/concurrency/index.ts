type Callback = (resolved?: unknown, rejected?: unknown) => void;

interface QueueObject {
  args: unknown;
  callbacks: Callback[];
}

export const lock = <T extends (...args: any) => Promise<any>>(func: T): T => {
  const queue: Record<string, QueueObject> = {};

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
    let queueIsIdle = Object.keys(queue).length <= 0;

    const argsHash = JSON.stringify(args); // better hash it for better performance
    if (queue[argsHash]) {
      queue[argsHash].callbacks.push(callback);
    } else {
      queue[argsHash] = { callbacks: [callback], args };
    }
    if (queueIsIdle) {
      processQueue();
    }
  };

  const processQueue = async () => {
    while (Object.keys(queue).length > 0) {
      for (const queueKey in queue) {
        if (Object.prototype.hasOwnProperty.call(queue, queueKey)) {
          const { args, callbacks } = queue[queueKey];
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
          delete queue[queueKey];
        }
      }
    }
  };

  return lockedFunction as T;
};
