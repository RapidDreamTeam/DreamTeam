<template>
    <v-app id="main">
        <Toolbar :drawer="drawer" v-on:toggle-drawer="setDrawer"/>
        <NavigationDrawer :drawer="drawer" v-model="setDrawer" />
    </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";

export default {
  components: {
    NavigationDrawer,
    Toolbar
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    setDrawer: () => {
      this.drawer = !this.drawer;
    }
  }
};
</script>
