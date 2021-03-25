import { hasIn } from "immutable";

export const getEnv = () => {
  switch (location.hostname) {
    case "www.dzcode.io":
    case "dzcode.io":
      return "production";
    case "stage.dzcode.io":
      return "staging";
    default:
      return "development";
  }
};

/**
 * Update specific fields in specific items in a collection
 *
 * @param originalCollection Old collection with all items
 * @param updatesCollection Changes we want to make
 * @param identifierField One filed used to identify the items needed for changes
 */
export const updateCollection = <T>(
  originalCollection: T[],
  updatesCollection: T[],
  identifierField: string,
) => {
  const clonedUC: T[] = Object.assign([], updatesCollection);

  const arrayToReturn: T[] = [];
  for (const original of originalCollection) {
    let updated: T | null = null;
    for (const updateIndex in clonedUC) {
      // check if it's there and it's not undefined as well
      if (clonedUC.hasOwnProperty(updateIndex) && clonedUC[updateIndex]) {
        const update = clonedUC[updateIndex];
        // found similar update:
        if (
          (update as Record<string, unknown>)[identifierField] ===
          (original as Record<string, unknown>)[identifierField]
        ) {
          // deep merge original with update to updated
          updated = Object.assign({}, original, update);
          // delete update from clonedUpdatesCollection
          delete clonedUC[updateIndex];
          break;
        }
      }
    }
    // no similar update found:
    if (updated === null) {
      // deep merge original with {} to updated; basically converting to JS object without mutation
      updated = Object.assign({}, original);
    }
    // add updated to arrayToReturn
    arrayToReturn.push(updated);
  }
  // add the new updates to arrayToReturn
  for (const updateIndex in clonedUC) {
    // check if it's there and it's not undefined as well
    if (clonedUC.hasOwnProperty(updateIndex) && clonedUC[updateIndex]) {
      const updated = Object.assign({}, clonedUC[updateIndex]);
      // add update to arrayToReturn
      arrayToReturn.push(updated);
    }
  }
  return arrayToReturn;
};

/**
 * Check if an item in a collection has specific fields present or not
 * @param collection Collection to check
 * @param identifierField
 * @param idValue
 * @param paths deep field path to check
 */
export const hasInCollection = <T>(
  collection: T[],
  identifierField: string,
  idValue: string,
  paths: string[][],
) => {
  for (const item of collection) {
    // found the item we're looking for
    if ((item as Record<string, unknown>)[identifierField] === idValue) {
      for (const path of paths) {
        if (!hasIn(item, path)) {
          return false; // item found, but one of the fields is missing FALSE
        }
      }
      return item; // item found, and contains all the fields needed TRUE
    }
  }
  return false; // item not found in collection FALSE
};
