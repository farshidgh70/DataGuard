<template>
  <div class="tab_container">
    <h1 v-if="tab_details">{{ tab_details.title }} Plugins</h1>
    <v-row class="mt-5">
      <v-col
        class="item"
        cols="12"
        md="4"
        v-for="(plugin, i) in plugins"
        :key="i"
      >
        <v-card
          class="item_card"
          :disabled="$store.state.DisableAll || plugin.disabled"
        >
          <v-card-title class="pt-0">
            <h2>{{ plugin.title }}</h2>
            <div class="ml-auto">
              <v-switch
                v-model="plugin.value"
                inset
                color="success"
                hide-details
                :success="plugin.active"
                :error="plugin.inactive"
                @change="ChangeStatus(plugin)"
              ></v-switch>
              <span class="label">{{
                plugin.value ? "Allowed" : "Blocked"
              }}</span>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="pr-5" v-html="plugin.description"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    plugins: [],
  }),
  async fetch() {
    const res = await this.$axios.$get(
      `/api/plugins/${this.$route.params.tab}`
    );
    this.plugins = res.result;
  },
  computed: {
    tab_details() {
      return this.$store.state.tabs.find(
        (el) => el.route === this.$route.params.tab
      );
    },
  },
  methods: {
    async ChangeStatus(plugin) {
      const res = await this.$axios.$post(
        `/api/plugin/status/${this.$route.params.tab}`,
        {
          plugin: plugin.route,
          status: !plugin.active,
        }
      );
      if (res.success) {
        plugin.active = !plugin.active;
        plugin.inactive = !plugin.inactive;
      }
    },
  },
};
</script>
<style scoped>
.tab_container {
  padding: 20px;
}
h1 {
  font-size: 18px;
}
h2 {
  font-size: 16px;
  margin-top: -13px;
}
.label {
  font-size: 12px;
}
.item_card {
  height: 100%;
}
</style>
