<template>
  <div id="searchComponent">
    <form @submit.prevent="searchBreed">
      <p>Search for a particular breed</p>
      <select v-model="breedSelected" required>
        <option value="null">Select a breed</option>
        <template v-for="(breed, index) in allBreeds">
          <option :value="breed" :key="index">{{ breed }}</option>
        </template>
      </select>
      <button class="cssGrey" type="submit">Find</button>
      <button class="cssRed" v-show="breedSelected" @click.prevent="resetPage">
        Reset
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { eventBus } from "@/main";

export default {
  name: "Search-Component",
  data() {
    return {
      breedSelected: null,
    };
  },
  methods: {
    ...mapActions(["getBreeds", "getRandomImages", "getSelectedBreed"]),
    /**
     * This gets called to fetch dogs of a seledted breed
     * some options are single-worded(for options without)
     * subbreed while other are multiworded(foroptions with subbreed)
     * Hence the additional logic to modify the input being passed into
     * the URL
     */
    searchBreed() {
      let category = this.breedSelected.split(" ");
      if (category.length > 1) {
        this.getSelectedBreed(`${category[1]}/${category[0]}`);
      } else {
        this.getSelectedBreed(this.breedSelected);
      }
    },
    resetPage() {
      this.getRandomImages();
      this.breedSelected = null;
    },
  },
  computed: {
    ...mapGetters(["allBreeds"]),
  },
  mounted() {
    this.getBreeds();
    // This event is emitted when the database is
    // reset/refreshed
    eventBus.$on("clearInputField", () => {
      this.breedSelected = null;
    });
  },
};
</script>

<style lang="scss" scoped>
#searchComponent {
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    padding-bottom: 15px;
    text-align: center;
    font-family: "Lato", sans-serif;
  }
  form {
    margin: 5rem auto 3rem;
    select {
      padding: 10px 14px;
      font-family: "Lato", sans-serif;
      border: 1px solid gray;
      margin-right: 10px;
    }
  }
  .cssGrey {
    font-family: "Lato", sans-serif;
    min-width: 130px;
    height: 40px;
    padding: 5px 10px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    outline: none;
    border-radius: 5px;
    z-index: 0;
    background: #fff;
    overflow: hidden;
    border: 2px solid #495057;
    color: rgb(49, 30, 114);
  }
  .cssGrey:hover {
    color: #fff;
  }
  .cssGrey:hover:after {
    width: 100%;
    color: #495057;
  }
  .cssGrey:after {
    content: "";
    position: absolute;
    z-index: -1;
    transition: all 0.3s ease;
    right: 0;
    top: 0;
    width: 0;
    height: 100%;
    background: #495057;
  }

  .cssRed {
    min-width: 130px;
    margin-left: 10px;
    height: 40px;
    color: #fff;
    padding: 5px 10px;
    font-weight: bold;
    cursor: pointer;
    font-family: "Lato", sans-serif;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    outline: none;
    border-radius: 5px;
    z-index: 0;
    background: #fff;
    overflow: hidden;
    border: 2px solid #d90429;
    color: #d90429;
  }
  .cssRed:hover {
    color: #fff;
  }
  .cssRed:hover:after {
    width: 100%;
  }
  .cssRed:after {
    content: "";
    position: absolute;
    z-index: -1;
    transition: all 0.3s ease;
    right: 0;
    top: 0;
    width: 0;
    height: 100%;
    background: #d90429;
  }
}

@media only screen and (max-width: 426px) {
  #searchComponent {
    form {
      margin: 5rem 3rem 3rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .cssRed {
      margin-top: 20px;
    }
  }
}

@media (prefers-color-scheme: dark) {
  #searchComponent {
    background-color: rgb(39, 39, 65);
    p {
      color: antiquewhite;
    }
  }
}
</style>
