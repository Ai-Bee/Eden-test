<template>
  <div class="home">
    <LoaderComponent v-show="appLoading" />
    <SearchComponent />
    <ImageGrid />
    <FloatingButton />
  </div>
</template>

<script>
// @ is an alias to /src
import FloatingButton from "@/components/FloatingButton.vue";
import ImageGrid from "@/components/ImageGrid.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  components: {
    LoaderComponent,
    ImageGrid,
    SearchComponent,
    FloatingButton,
  },
  computed: {
    ...mapGetters(["appLoading"]),
  },
  methods: {
    ...mapActions(["modifyLoadingState"]),
  },
};
</script>
