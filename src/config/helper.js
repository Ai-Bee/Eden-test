import { db } from "../config/offlineData";
import axiosInstance from "./axiosInstance";

/***
 * FOR DATABASE TRANSACTIONS
 * START
 */

/**
 *
 * @param {string} table
 * @returns a promise for
 * the number of rows in the
 * table
 */
let checkDBForData = async (table) => {
  return await db[table].count();
};

/**
 *
 * @param {string} tableName
 * @param {string} dataArray (the data)
 * being passed into the table
 * @param {object}} breedInfo
 * @returns a promise on completion
 * of the transaction
 *
 */
let storeDataToTable = (tableName, dataArray, breedInfo) => {
  let objectFormat;
  if (tableName == "images") {
    // cause only the "images" table uses the
    // "breedinfo" argument
    if (breedInfo) {
      let { breed, subbreed } = breedInfo;
      objectFormat = dataArray.map((item) => {
        return { link: item, breed, subbreed };
      });
    } else {
      objectFormat = dataArray.map((item) => {
        return { link: item };
      });
    }
  } else {
    objectFormat = dataArray.map((item) => {
      return { breed: item };
    });
  }
  return db.transaction("rw", tableName, async () => {
    await db[tableName].bulkAdd(objectFormat);
  });
};

/**
 *
 * @param {string} tableName
 * @returns a promise containing the data
 * for the requested table
 */
let fetchTableData = async (tableName) => {
  return await db[tableName].toArray();
};

/**
 *
 * @param {string} breed
 * @param {string} subbreed
 * @returns a promise containing the data
 * from the images table filtered based on
 * arguments passed in
 */
let filterTableByBreed = async (breed, subbreed) => {
  if (subbreed) {
    return await db.images
      .where("breed")
      .equals(breed)
      .filter((value) => value.subbreed == subbreed)
      .toArray();
  } else {
    return await db.images.where("breed").equals(breed).toArray();
  }
};

/**
 *
 * @param {string} table, the name of the table
 * to be cleared
 * @returns a promise after completion
 */
let clearEntireTable = async (table) => {
  return db[table].clear();
};

/***
 * FOR DATABASE TRANSACTIONS
 * END
 */

/***
 * FOR NETWORK REQUESTS
 * START
 */

/**
 *
 * this method uses the axios instance to
 * make requests using arguments passed in
 * and returns results
 *
 * @param {string} urlPath
 * @param {string} method
 * @returns a promise for the network request
 * response
 */
let genericFetch = async (urlPath, method) => {
  return await axiosInstance({
    url: urlPath,
    method: method,
  })
    .then(async (response) => {
      if (response.status === 200) {
        return response.data.message;
      }
    })
    .catch((error) => {
      return error;
    });
};

/***
 * FOR NETWORK REQUESTS
 * END
 */

export {
  checkDBForData,
  storeDataToTable,
  fetchTableData,
  filterTableByBreed,
  clearEntireTable,
  genericFetch,
};
