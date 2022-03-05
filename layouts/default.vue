<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <nuxt-link to="/">
        <img src="/logo.png" alt="DataGuard" class="logo" />
      </nuxt-link>
      <Navigation />
      <template v-slot:append>
        <div class="pa-5 d-flex align-center">
          <span>All plugins {{ DisableAll ? "disabled" : "enabled" }}</span>
          <v-switch
            v-model="DisableAll"
            :success="!DisableAll"
            :error="DisableAll"
            inset
            hide-details
            class="mt-0 ml-auto"
          ></v-switch>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",

  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Marketing",
          to: "/tab1",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Finance",
          to: "/tab2",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Personnel",
          to: "/tab3",
        },
      ],
      miniVariant: false,
      title: "DataGuard",
    };
  },
  mounted() {
    this.$store.dispatch("init");
    // this.$store.dispatch("fetchPlugins");
  },
  computed: {
    DisableAll: {
      get() {
        return this.$store.state.DisableAll;
      },
      set() {
        this.$store.dispatch("disableAllStatus", !this.$store.state.DisableAll);
      },
    },
  },
};
</script>
<style scoped>
.logo {
  width: 100%;
}
</style>
<style>
.v-navigation-drawer__content {
  background-color: #f1f1f1;
}
.tabs .v-list-item--active {
  background-color: #fff;
  border-left: 4px solid #c63040;
}
.tabs .v-list-item--active::before {
  opacity: 0;
}
.tabs .v-list-item--active .v-list-item__content {
  margin-left: -3px;
}
.v-navigation-drawer__append {
  background-color: #f1f1f1;
}
</style>
