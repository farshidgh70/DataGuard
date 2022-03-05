<template>
  <v-list class="tabs">
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :to="item.route"
      router
      exact
    >
      <v-list-item-action>
        <v-icon>{{ icon(item.icon) }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  computed: {
    items() {
      return this.$store.state.tabs;
    },
  },
  methods: {
    icon(item) {
      let result = "";
      switch (item) {
        case "icon-finance":
          result = "mdi-finance";
          break;
        case "icon-marketing":
          result = "mdi-apps";
          break;
        case "icon-people":
          result = "mdi-account-multiple";
          break;
      }
      return result;
    },
  },
};
</script>
