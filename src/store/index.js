import Vue from "vue";
import Vuex from "vuex";
import {
  checkDBForData,
  fetchTableData,
  clearEntireTable,
  storeDataToTable,
  genericFetch,
  filterTableByBreed,
} from "@/config/helper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    imagesArray: [],
    breeds: [],
    tempImage: null,
  },
  getters: {
    appLoading(state) {
      return state.loading;
    },
    allImages(state) {
      return state.imagesArray;
    },
    allBreeds(state) {
      return state.breeds;
    },
    singleView(state) {
      return state.tempImage;
    },
  },
  mutations: {
    stopLoading(state, currState) {
      state.loading = currState;
    },
    setTempImage(state, imageLink) {
      state.tempImage = imageLink;
      // For instances where the user refreshes the page
      localStorage.setItem("tempImage", imageLink);
    },
    clearImages(state) {
      state.imagesArray = [];
    },
    storeImages(state, imageArray) {
      state.imagesArray.push(...imageArray);
    },
    /**
     *
     * @param {string} state
     * @param {array | object} allBreeds
     *
     * If the data is from a network request its an
     * object, if its from indexeddb its an array,
     * and is handled accordingly in each case
     */
    storeBreeds(state, allBreeds) {
      let tempObject = [];
      if (Array.isArray(allBreeds)) {
        state.breeds = allBreeds;
      } else {
        for (let breed in allBreeds) {
          if (allBreeds[breed].length > 0) {
            allBreeds[breed].map((el) => {
              tempObject.push(`${el} ${breed}`);
            });
          } else {
            tempObject.push(breed);
          }
        }
        state.breeds = tempObject;
        // this stores list of breeds to indexeddb
        storeDataToTable("breeds", tempObject);
      }
    },
  },
  actions: {
    clearRandomImagesFromDB(context) {
      clearEntireTable("images");
      context.commit("clearImages");
    },
    /**
     *
     * @param {string} context
     * @param {string} imageLink
     */
    setTempImage(context, imageLink) {
      context.commit("setTempImage", imageLink);
    },
    /**
     *
     * @param {string} context
     * @param {boolean} currState
     */
    modifyLoadingState(context, currState) {
      context.commit("stopLoading", currState);
    },
    /**
     *
     * @param {string} context
     * @param {string} selectedBreed
     */
    async getSelectedBreed(context, selectedBreed) {
      try {
        let breed,
          subbreed = null;
        /**
         * @param selectedBreed can either be in formats;
         * "husky" or "italian/bulldog" depending on if
         * the dog has a subbreed hence the small drama below
         */
        let breedString = selectedBreed.split("/");
        if (breedString.length > 1) {
          breed = breedString[1];
          subbreed = breedString[0];
        } else {
          breed = selectedBreed;
        }
        let breedInfo = {
          breed,
          subbreed,
        };
        context.dispatch("modifyLoadingState", true);
        // first checks if the data exists offline
        let data = await filterTableByBreed(
          breedInfo.breed,
          breedInfo.subbreed
        );
        if (data.length > 0) {
          context.dispatch("modifyLoadingState", false);
          context.commit("clearImages");
          let arrayFormat = data.map((item) => item.link);
          context.commit("storeImages", arrayFormat);
        } else {
          let apiResponse = await genericFetch(
            `/breed/${selectedBreed}/images/random/20`,
            "get"
          );
          context.dispatch("modifyLoadingState", false);
          context.commit("clearImages");
          if (apiResponse.length > 0) {
            context.commit("storeImages", apiResponse);
            storeDataToTable("images", apiResponse, breedInfo);
          }
        }
      } catch (error) {
        context.dispatch("modifyLoadingState", false);
      }
    },
    /**
     *
     * @param {string} context
     * @param {boolean} freshBatch
     */
    getRandomImages(context, freshBatch) {
      try {
        context.dispatch("modifyLoadingState", true);
        // first checks if the data exists offline

        checkDBForData("images")
          .then(async (res) => {
            if (res >= 100) {
              // fetches image links from indexeddb
              let values = await fetchTableData("images");
              context.dispatch("modifyLoadingState", false);
              // creates an array from it
              let modifiedFormat = values.map((item) => item.link);
              context.commit("storeImages", modifiedFormat);
            } else {
              let apiResponse = await genericFetch(
                "/breeds/image/random/50",
                "get"
              );
              if (freshBatch) {
                context.commit("clearImages");
              }
              context.dispatch("modifyLoadingState", false);
              if (apiResponse.length > 0) {
                context.commit("storeImages", apiResponse);
                storeDataToTable("images", apiResponse);
              }
            }
          })
          .catch(async () => {
            let apiResponse = await genericFetch(
              "/breeds/image/random/50",
              "get"
            );
            if (freshBatch) {
              context.commit("clearImages");
            }
            context.dispatch("modifyLoadingState", false);
            if (apiResponse.length > 0) {
              context.commit("storeImages", apiResponse);
              storeDataToTable("images", apiResponse);
            }
          });
      } catch (error) {
        context.dispatch("modifyLoadingState", false);
      }
    },
    /**
     *
     * @param {string} context
     *
     * this fetches list of breeds and stores in
     * indexeddb to avoid... avoidable network calls
     */
    async getBreeds(context) {
      try {
        checkDBForData("breeds").then(async (res) => {
          if (res >= 10) {
            let values = await fetchTableData("breeds");
            let modifiedFormat = values.map((item) => item.breed);
            context.commit("storeBreeds", modifiedFormat);
          } else {
            let apiResponse = await genericFetch("/breeds/list/all", "get");
            if (apiResponse) {
              context.commit("storeBreeds", apiResponse);
            }
          }
        });
      } catch (error) {
        // console.error(error);
      }
    },
  },
});
