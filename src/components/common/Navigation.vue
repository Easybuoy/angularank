<template>
  <div>
    <v-card class="overflow-hidden" style="border-radius: 0">
      <v-app-bar color="red accent-4" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>AngulaRank</v-toolbar-title>
      </v-app-bar>
    </v-card>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-center">AngulaRank</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group active-class="red--text text--accent-4">
          <v-list-item v-for="item in navItems" :key="item.id">
            <router-link :to="item.link" style="color: inherit">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data: () => ({
    drawer: false,
    navItems: [
      {
        id: 1,
        name: 'Home',
        icon: 'mdi-home',
        link: '/',
      },
    ],
  }),
};
</script>

<style>
.v-application a {
  color: inherit;
  text-decoration: none;
  display: flex;
}
</style>
