<template>
  <div>
    <h1 class="red--text text--darken-4">Repositories</h1>
    <div class="repo-container" v-if="repositories.length > 0 && loading === false">
      <div
        class="v-card v-card--shaped v-sheet theme--light card"
        subtitle="true"
        supportingtext="true"
        style="width: 342px;"
        v-for="repo in repositories"
        :key="repo.id"
      >

        <div class="v-card__title">
          <v-icon medium color="red darken-4 ">mdi-github</v-icon>&nbsp;&nbsp;
          <span class="heading-font">{{ repo.name }}</span>
        </div>
        <div class="v-card__subtitle red--text text--darken-2 sub-font">{{ repo.language }}</div>
        <div class="v-card__text sub-font">{{ repo.description }}</div>

        <v-card-actions>
          <router-link :to="'/repo/' + login + '/' + repo.name">
            <v-btn text color="red darken-4">Details</v-btn>
          </router-link>
        </v-card-actions>
      </div>
    </div>

    <div v-else>
      <h3>No repository found for for this user</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Repositories',
  props: {
    repositories: {
      type: Array,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.repo-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}

.card {
  margin: 0.5rem;
}

.heading-font {
  font-size: 1.2rem;
  font-family: 'Concert One', cursive;
}

.sub-font {
  font-family: 'Mallanna', sans-serif;
  font-size: 1rem;
}

h1 {
  font-family: 'Concert One', cursive;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  margin: 1.5rem 0;
}

h3 {
  font-family: 'Concert One', cursive;
  text-align: center;
  margin: 1rem 0;
}
</style>
