<template>
  <div class="dropdown">
    <div class="text-center">
      <div>
        <v-btn class="ma-2" color="primary" dark @click="this.sortByContributors">
          Sort By Contributions
          <v-icon dark right>{{ sortByContributorsArrow }}</v-icon>
        </v-btn>

        <v-btn class="ma-2" color="orange" dark @click="this.sortByFollowers">
          Sort By Followers
          <v-icon dark right>{{ sortByFollowersArrow }}</v-icon>
        </v-btn>

        <v-btn class="ma-2" color="success" dark @click="this.sortByRepository">
          Sort By Repositories
          <v-icon dark right>{{ sortByRepositoryArrow }}</v-icon>
        </v-btn>

        <v-btn class="ma-2" color="purple" dark @click="this.sortByGists">
          Sort By Gists
          <v-icon dark right>{{ sortByGistsArrow }}</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Sort',
  data: () => ({}),
  computed: {
    ...mapGetters([
      'sortByContributorsArrow',
      'sortByGistsArrow',
      'sortByFollowersArrow',
      'sortByRepositoryArrow',
    ]),
  },
  methods: {
    ...mapActions([
      'getContributors',
      'sortByContributors',
      'sortByGists',
      'sortByFollowers',
      'sortByRepository',
    ]),
  },
};
</script>

<style>
.dropdown {
  display: flex;
  justify-content: center;
}
</style>
