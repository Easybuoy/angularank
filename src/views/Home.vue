<template>
  <div>
    <div v-if="loading">
      <Spinner />
    </div>

    <div v-else-if="error !== null">
      <Error :error="error" />
    </div>

    <v-container v-else class="grey lighten-5">
      <Dropdown />

      <v-row no-gutters justify="center">
        <div v-for="item in allOrganizations" :key="item.id" class="card">
          <router-link :to="'/user/' + item.login">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">OVERLINE</div>
                  <v-list-item-title class="headline mb-1">{{ item.login }}</v-list-item-title>
                  <v-list-item-subtitle>Contributions: {{ item.contributions }}</v-list-item-subtitle>
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
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/common/Spinner.vue';
import Dropdown from '@/components/common/Dropdown.vue';
import Error from '@/components/common/Error.vue';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['allOrganizations', 'loading', 'error'])
  },
  methods: {
    ...mapActions(['getOrganizations'])
  },
  created() {
    this.getOrganizations();
  },
  components: {
    Dropdown,
    Spinner,
    Error
  }
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
</style>
