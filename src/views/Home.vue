<template>
  <div>
    <div v-if="loading">
      <Spinner />
    </div>

    <div v-else-if="error !== null">
      <Error :error="error" />
    </div>

    <v-container v-else id="top" class="grey lighten-5">
      <Sort />
      <Divider />

      <v-row no-gutters justify="center">
        <div v-for="item in paginatedContributors" :key="item.id" class="card">
          <router-link :to="'/user/' + item.login">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1 red--text text--darken-4 title">{{
                    item.login
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="detail"
                    >Contributions: {{ item.contributions }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle class="detail"
                    >Followers: {{ item.followers }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle class="detail"
                    >Repositories: {{ item.public_repos }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle class="detail"
                    >Gists: {{ item.public_gists }}</v-list-item-subtitle
                  >
                </v-list-item-content>

                <v-list-item-avatar size="80" color="grey">
                  <v-img :src="item.avatar_url"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </router-link>
        </div>
      </v-row>
    </v-container>

    <Pagination :contributors="allContributors" :page="1" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/common/Spinner.vue';
import Sort from '@/components/common/Sort.vue';
import Error from '@/components/common/Error.vue';
import Pagination from '@/components/common/Pagination.vue';
import Divider from '@/components/common/Divider.vue';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['allContributors', 'paginatedContributors', 'loading', 'error']),
  },
  methods: {
    ...mapActions(['getContributors']),
  },
  created() {
    this.getContributors();
  },
  components: {
    Sort,
    Spinner,
    Error,
    Pagination,
    Divider,
  },
};
</script>

<style scoped lang="less">
a {
  text-decoration: none;
}

.card {
  margin: 0.5rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.12);
  }
}

.title {
  font-family: 'Concert One', cursive;
}

.detail {
  font-family: 'Mallanna', sans-serif;
  font-size: 1rem;
}
</style>
