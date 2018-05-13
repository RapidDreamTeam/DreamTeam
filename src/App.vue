<template>
  <v-app>
    <Toolbar>
      <router-view></router-view>
    </Toolbar>
  </v-app>
</template>

<script>
// Need to vue router
import Toolbar from "@/components/Toolbar/Toolbar.vue";

export default {
  components: {
    Toolbar
  },
  data: () => ({}),
  methods: {}
};
</script>
