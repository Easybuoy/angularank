<template>
  <div>
    <div v-if="loading">
      <Spinner />
    </div>

    <div v-else-if="error !== null">
      <Error :error="error" />
    </div>

    <v-container v-else class="grey lighten-5">
      <div class="user-detail">
        <div class="user-detail-list">
          <div class="full-width">
            <h1 class="user-title red--text text--darken-4 mt-2 mb-2">{{ repoDetail.name }}</h1>

            <Divider />
          </div>

          <div class="full-width" v-show="repoDetail.description !== null">
            <h4 class="user-detail-container list-item grey--text text--darken-2">
              <span class="red--text text--darken-4">Description:&nbsp;</span>
              {{ repoDetail.description }}
            </h4>

            <Divider />
          </div>

          <div class="full-width" v-show="repoDetail.homepage !== '' && repoDetail.homepage !== null">
            <h4 class="user-detail-container list-item grey--text text--darken-2">
              <span class="red--text text--darken-4">Homepage:&nbsp;</span>
              {{ repoDetail.homepage }}
            </h4>

            <Divider />
          </div>

          <div class="full-width" v-show="repoDetail.language !== null">
            <h4 class="user-detail-container list-item grey--text text--darken-2">
              <span class="red--text text--darken-4">Language:&nbsp;</span>
              {{ repoDetail.language }}
            </h4>

            <Divider />
          </div>

          <div class="full-width" v-show="repoDetail.open_issues !== null">
            <h4 class="user-detail-container list-item grey--text text--darken-2">
              <span class="red--text text--darken-4">Open Issues:&nbsp;</span>
              {{ repoDetail.open_issues }}
            </h4>

            <Divider />
          </div>

          <div class="full-width" v-show="repoDetail.created_at !== null">
            <h4 class="user-detail-container list-item grey--text text--darken-2">
              <span class="red--text text--darken-4">Created:&nbsp;</span>
              <span :v-text="this.formatDate(repoDetail.created_at)"> {{ created_at }}</span>
            </h4>

            <Divider />
          </div>

          <div class="full-width">
            <h4 class="user-detail-container list-item grey--text text--darken-2">
              <span class="red--text text--darken-4">Forks:&nbsp;</span>
              {{ repoDetail.forks }}
            </h4>

            <Divider />
          </div>

          <div class="full-width">
            <h4 class="user-detail-container list-item grey--text text--darken-2">
              <span class="red--text text--darken-4">Subscribers:&nbsp;</span>
              {{ repoDetail.subscribers_count }}
            </h4>

            <Divider />
          </div>

          <div class="full-width">
            <h4 class="user-detail-container list-item grey--text text--darken-2">
              <span class="red--text text--darken-4">Watchers:&nbsp;</span>
              {{ repoDetail.watchers_count }}
            </h4>

            <Divider />
          </div>

          <div class="full-width" v-show="repoDetail.pushed_at !== null">
            <h4 class="user-detail-container list-item grey--text text--darken-2">
              <span class="red--text text--darken-4">Last push:&nbsp;</span>
              <span :v-text="this.formatLastPushed(repoDetail.pushed_at)"> {{ pushed_at }}</span>
            </h4>

            <Divider />
          </div>
        </div>
      </div>

      <h1 class="red--text text--darken-4">Contributors</h1>
      <v-row no-gutters justify="center">
        <div v-for="contributor in contributors" :key="contributor.id" class="card">
          <router-link :to="'/user/' + contributor.login">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">OVERLINE</div>
                  <v-list-item-title class="headline mb-1">{{
                    contributor.login
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    >Contributions: {{ contributor.contributions }}</v-list-item-subtitle
                  >
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
import moment from 'moment';
import Divider from '@/components/common/Divider.vue';
import Spinner from '@/components/common/Spinner.vue';
import Error from '@/components/common/Error.vue';

export default {
  name: 'Repository_Detail',
  created() {
    const { params } = this.$route;
    this.getRepoDetail(params);
  },
  data: () => ({
    created_at: '',
    pushed_at: ''
  }),
  computed: {
    ...mapGetters(['repoDetail', 'loading', 'error', 'contributors'])
  },
  methods: {
    ...mapActions(['getRepoDetail']),
    formatDate(date) {
      this.created_at = moment(date).fromNow();
    },
    formatLastPushed(date) {
      this.pushed_at = moment(date).fromNow();
    }
  },
  components: { Divider, Spinner, Error }
};
</script>

<style scoped lang="less">
h1 {
  font-family: 'Concert One', cursive;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  margin: 1.5rem 0;
}

.card {
  margin: 0.5rem;
}

.user-detail {
  width: 70%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem auto;

  @media only screen and (max-width: 800px) {
    width: 70%;
  }

  @media only screen and (max-width: 600px) {
    width: 90%;
  }

  .user-detail-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    background-color: white;
    padding: 1rem;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
      0px 1px 5px 0px rgba(0, 0, 0, 0.12);

    .user-title {
      font-family: 'Concert One', cursive;
      text-align: center;
      width: 100%;
      text-transform: uppercase;
    }
  }

  .user-detail-container {
    font-size: 1.1rem;
  }
}

.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  width: 100%;
  font-family: 'Mallanna', sans-serif;
}

.full-width {
  width: 100%;
}
</style>
