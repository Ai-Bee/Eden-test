<template>
  <div id="loader">
    <div class="flippers">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader-Component",
};
</script>

<style scoped lang="scss">
#loader {
  background-color: rgba(166, 164, 164, 0.325);
  z-index: 900;
  display: flex;
  height: 100vh;
  width: 100vw;
  position: fixed;
  padding: 40vh auto 0 auto !important;
}

@-webkit-keyframes flippers {
  0% {
    -webkit-transform: perspective(40px) rotateY(-180deg);
    transform: perspective(40px) rotateY(-180deg);
  }
  50% {
    -webkit-transform: perspective(40px) rotateY(0deg);
    transform: perspective(40px) rotateY(0deg);
  }
}
@keyframes flippers {
  0% {
    -webkit-transform: perspective(40px) rotateY(-180deg);
    transform: perspective(40px) rotateY(-180deg);
  }
  50% {
    -webkit-transform: perspective(40px) rotateY(0deg);
    transform: perspective(40px) rotateY(0deg);
  }
}

.flippers {
  height: 20px;
  display: grid;
  grid-template-columns: repeat(5, 20px);
  grid-gap: 5px;
  margin: auto;
}
.flippers div {
  -webkit-animation: flippers calc(1.25 * 1s) calc(var(--delay) * 1s) infinite
    ease;
  animation: flippers calc(1.25 * 1s) calc(var(--delay) * 1s) infinite ease;
  background-color: rgb(157, 150, 150);
}
.flippers div:nth-of-type(1) {
  --delay: 0.25;
}
.flippers div:nth-of-type(2) {
  --delay: 0.5;
}
.flippers div:nth-of-type(3) {
  --delay: 0.75;
}
.flippers div:nth-of-type(4) {
  --delay: 1;
}
.flippers div:nth-of-type(5) {
  --delay: 1.25;
}
</style>
