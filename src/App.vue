<template>
  <v-app>
    <div v-if="['/', '/signin', '/register'].includes($route.path)">
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
// import VideoBG from "vue-videobg";
export default {
  components: {
    Toolbar
  },
  data: () => ({}),
  methods: {}
};
</script>
