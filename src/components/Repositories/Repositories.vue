<template>
  <div class="container">
    <div
      class="v-card v-card--shaped v-sheet theme--light"
      subtitle="true"
      supportingtext="true"
      style="width: 342px;"
      v-for="repo in repositories"
    >
      <div class="v-card__progress">
        <div
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          class="v-progress-linear v-progress-linear--absolute theme--light"
          style="height: 4px;"
        >
          <div
            class="v-progress-linear__background"
            style="opacity: 0.3; left: 0%; width: 100%;"
          ></div>
          <div class="v-progress-linear__buffer"></div>
          <div class="v-progress-linear__indeterminate v-progress-linear__indeterminate--active">
            <div class="v-progress-linear__indeterminate long"></div>
            <div class="v-progress-linear__indeterminate short"></div>
          </div>
        </div>
      </div>
      <!---->
      <div class="v-card__title">
        Card title
      </div>
      <div class="v-card__subtitle">Secondary text</div>
      <div class="v-card__text">
        Greyhound divisively hello coldly wonderfully marginally far upon excluding.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Repositories',
  props: {
    repositories: {
      type: Array,
      required: true
    }
  },
  created() {
    console.log(this.repositories, '=');
  }
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}
</style>
