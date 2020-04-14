<template>
  <div>
    <h1>HHH</h1>
    {{this.contributors}}
    <v-container class="grey lighten-5">
      <v-row no-gutters justify="center">
        <div v-for="contributor in contributors" :key="contributor.id" class="card">
          <router-link :to="'/user/' + contributor.login">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">OVERLINE</div>
                  <v-list-item-title class="headline mb-1">{{ contributor.login }}</v-list-item-title>
                  <v-list-item-subtitle>Contributions: {{ contributor.contributions }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar size="80" color="grey">
                  <v-img :src="contributor.avatar_url"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </router-link>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Repository_Detail',
  created() {
    const { params } = this.$route;
    this.getRepoDetail(params);
  },
  computed: {
    ...mapGetters(['repoDetail', 'loading', 'error', 'contributors'])
  },
  methods: {
    ...mapActions(['getRepoDetail'])
  }
};
</script>

<style scoped lang="less">
.card {
  margin: 0.5rem;
}
</style>