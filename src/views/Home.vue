<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters justify="center">
      <div v-for="item in allOrganizations" :key="item.id" class="card">
        <router-link :to="'/serie/' + item.id">
          <v-card class="mx-auto " max-width="344" outlined>
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
      </div> </v-row
  ></v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['allOrganizations'])
  },
  methods: {
    ...mapActions(['getOrganizations'])
  },
  created() {
    this.getOrganizations();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.card {
  margin: 1rem;
}
</style>
