<template>
  <v-app>
    {{ $route }}
    <div v-if="['/', '/signin', '/signup'].includes($route.path)">
      <router-view />
    </div>
    <div v-else>
      <Toolbar>
        <router-view />
      </Toolbar>
    </div>
  </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar/Toolbar.vue";
export default {
  components: {
    Toolbar
  },
  data: () => ({}),
  methods: {}
};
</script>
