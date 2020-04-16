<template>
  <div>
    <div v-if="loading">
      <Spinner />
    </div>

    <div v-else-if="error !== null" class="err mt-5">
      <v-alert type="error" dismissible="true">{{ error }}</v-alert>

      <a @click="this.reloadPage">
        <v-btn class="ma-2" tile color="success" dark>Reload Page</v-btn>
      </a>
    </div>

    <div v-else>
      <div class="container">
        <div class="user-img">
          <v-img
            :src="userDetail.avatar_url"
            :lazy-src="userDetail.avatar_url"
            aspect-ratio="1"
            class="grey lighten-2 img"
            width="400"
            height="500"
          ></v-img>
        </div>

        <div class="user-detail">
          <div class="user-detail-list">
            <div class="full-width">
              <h1 class="user-title red--text text--darken-4 mt-2 mb-2">{{ userDetail.name }}</h1>

              <Divider />
            </div>

            <div class="full-width" v-show="userDetail.bio !== null">
              <h4 class="user-detail-container list-item grey--text text--darken-2">
                <span class="red--text text--darken-4">Bio:&nbsp;</span>
                {{ userDetail.bio }}
              </h4>

              <Divider />
            </div>

            <div class="full-width" v-show="userDetail.company !== null">
              <h4 class="user-detail-container list-item grey--text text--darken-2">
                <span class="red--text text--darken-4">Company:&nbsp;</span>
                {{ userDetail.company }}
              </h4>

              <Divider />
            </div>

            <div class="full-width" v-show="userDetail.email !== null">
              <h4 class="user-detail-container list-item grey--text text--darken-2">
                <span class="red--text text--darken-4">Email:&nbsp;</span>
                {{ userDetail.email }}
              </h4>

              <Divider />
            </div>

            <div class="full-width">
              <h4 class="user-detail-container list-item grey--text text--darken-2">
                <span class="red--text text--darken-4">Username:&nbsp;</span>
                {{ userDetail.login }}
              </h4>

              <Divider />
            </div>

            <div class="full-width" v-show="userDetail.location !== null">
              <h4 class="user-detail-container list-item grey--text text--darken-2">
                <span class="red--text text--darken-4">Location:&nbsp;</span>
                {{ userDetail.location }}
              </h4>

              <Divider />
            </div>

            <div class="full-width" v-show="userDetail.blog !== ''">
              <h4 class="user-detail-container list-item grey--text text--darken-2">
                <span class="red--text text--darken-4">Blog:&nbsp;</span>
                {{ userDetail.blog }}
              </h4>

              <Divider />
            </div>

            <div class="full-width">
              <h4 class="user-detail-container list-item grey--text text--darken-2">
                <span class="red--text text--darken-4">Followers:&nbsp;</span>
                {{ userDetail.followers }}
              </h4>

              <Divider />
            </div>

            <div class="full-width">
              <h4 class="user-detail-container list-item grey--text text--darken-2">
                <span class="red--text text--darken-4">Following:&nbsp;</span>
                {{ userDetail.following }}
              </h4>

              <Divider />
            </div>

            <div class="full-width">
              <h4 class="user-detail-container list-item grey--text text--darken-2">
                <span class="red--text text--darken-4">Repositories:&nbsp;</span>
                {{ userDetail.public_repos }}
              </h4>

              <Divider />
            </div>

            <div class="full-width">
              <h4 class="user-detail-container list-item grey--text text--darken-2">
                <span class="red--text text--darken-4">Gists:&nbsp;</span>
                {{ userDetail.public_gists }}
              </h4>

              <Divider />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Repositories
      v-if="loading === false"
      :repositories="repositories"
      :login="userDetail.login"
      :loading="loading"
    />

    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/common/Spinner.vue';
import Divider from '@/components/common/Divider.vue';
import Repositories from '@/components/Repositories/Repositories.vue';
import Footer from '@/components/common/Footer.vue';

export default {
  name: 'User-Details',
  created() {
    const { login } = this.$route.params;
    this.getUserDetail(login);
  },
  computed: {
    ...mapGetters(['userDetail', 'loading', 'error', 'repositories']),
  },
  methods: {
    ...mapActions(['getUserDetail']),
  },
  components: {
    Spinner,
    Divider,
    Repositories,
    Footer,
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}

.user-img {
  width: 25%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem auto;
  border-radius: 10px;

  .img {
    border-radius: 10px;
    box-shadow: rgb(139, 21, 21) 10px 10px 2px 2px;
  }
  @media only screen and (max-width: 2000px) {
    width: 35%;
  }
  @media only screen and (max-width: 1000px) {
    width: 40%;
  }

  @media only screen and (max-width: 800px) {
    width: 70%;
  }

  @media only screen and (max-width: 600px) {
    width: 90%;
  }
}

.user-detail {
  width: 40%;
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
