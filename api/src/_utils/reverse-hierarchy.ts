type ForeignKeyParentKeyRecord = { from: string; setParentAs: string };

export function reverseHierarchy(
  _obj: unknown,
  foreignKeyParentKeyRecord: ForeignKeyParentKeyRecord[],
  parentWithItsKey: Record<string, unknown> = {},
): any {
  if (Array.isArray(_obj)) {
    return _obj
      .map((item) => reverseHierarchy(item, foreignKeyParentKeyRecord, parentWithItsKey))
      .reduce((pV, cV) => [...pV, ...cV], []);
  }

  if (typeof _obj !== "object") {
    return _obj;
  }

  const obj = { ..._obj, ...parentWithItsKey };

  const objWithRecognizedKeys: Record<string, unknown> = {};
  const objWithoutRecognizedKeys: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const mappedKey = foreignKeyParentKeyRecord.find(({ from: mk }) => mk === key)?.from;
    if (mappedKey) objWithRecognizedKeys[mappedKey] = value;
    else objWithoutRecognizedKeys[key] = value;
  }

  if (Object.keys(objWithRecognizedKeys).length > 0) {
    let res: unknown[] = [];
    for (const recognizedKey in objWithRecognizedKeys) {
      if (Object.prototype.hasOwnProperty.call(objWithRecognizedKeys, recognizedKey)) {
        const recognizedObj = objWithRecognizedKeys[recognizedKey];
        const { setParentAs } = foreignKeyParentKeyRecord.find(
          ({ from }) => from === recognizedKey,
        ) as ForeignKeyParentKeyRecord;
        const reversedPredecessor = reverseHierarchy(recognizedObj, foreignKeyParentKeyRecord, {
          [setParentAs]: objWithoutRecognizedKeys,
        });
        res = res.concat(reversedPredecessor);
      }
    }
    return res;
  }

  return [objWithoutRecognizedKeys];
}
