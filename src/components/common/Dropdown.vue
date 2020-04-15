<template>
  <div class="dropdown">
    <div class="text-center">
      <div>
        <v-btn class="ma-2" color="primary" dark @click="this.sortByContributors">
          Sort By Contributions
          <v-icon dark right>{{sortByContributorsArrow}}</v-icon>
        </v-btn>

        <v-btn class="ma-2" color="orange" dark @click="this.sortByFollowers">
          Sort By Followers
          <v-icon dark right>{{sortByFollowersArrow}}</v-icon>
        </v-btn>

        <v-btn class="ma-2" color="success" dark>
          <v-icon dark left>mdi-arrow-up</v-icon>Sort By Repositories
        </v-btn>

        <v-btn class="ma-2" color="purple" dark @click="this.sortByGists">
          <v-icon dark left>{{sortByGistsArrow}}</v-icon>Sort By Gists
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Dropdown',
  data: () => ({}),
  computed: {
    ...mapGetters([
      'allContributors',
      'sortByContributorsArrow',
      'sortByGistsArrow',
      'sortByFollowersArrow'
    ])
  },
  methods: {
    ...mapActions(['getContributors', 'sortByContributors', 'sortByGists', 'sortByFollowers', 'sortByRepository'])
  }
};
</script>

<style>
.dropdown {
  display: flex;
  justify-content: center;
}
</style>
