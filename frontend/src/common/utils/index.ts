import { hasIn, mergeDeep } from "immutable";

export const getEnv = () => {
  switch (location.hostname) {
    case "localhost":
      return "development";
    case "staging.dzcode.io":
      return "staging";
    case "www.dzcode.io":
    default:
      return "production";
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
  // BUG: mergeDeep adds fields to arrays instead of overwriting them!!
  const arrayToReturn: T[] = [];
  for (const original of originalCollection) {
    let updated: T | null = null;
    for (const updateIndex in updatesCollection) {
      // check if it's there and it's not undefined as well
      if (
        updatesCollection.hasOwnProperty(updateIndex) &&
        updatesCollection[updateIndex]
      ) {
        const update = updatesCollection[updateIndex];
        // found similar update:
        if (update[identifierField] === original[identifierField]) {
          // deep merge original with update to updated
          updated = mergeDeep(original, update);
          // delete update from updatesCollection
          delete updatesCollection[updateIndex];
          break;
        }
      }
    }
    // no similar update found:
    if (updated === null) {
      // deep merge original with {} to updated; basically converting to JS object without mutation
      updated = mergeDeep(original, {});
    }
    // add updated to arrayToReturn
    arrayToReturn.push(updated);
  }
  // add the new updates to arrayToReturn
  for (const updateIndex in updatesCollection) {
    // check if it's there and it's not undefined as well
    if (
      updatesCollection.hasOwnProperty(updateIndex) &&
      updatesCollection[updateIndex]
    ) {
      const updated = mergeDeep(updatesCollection[updateIndex], {});
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
    if (item[identifierField] === idValue) {
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
