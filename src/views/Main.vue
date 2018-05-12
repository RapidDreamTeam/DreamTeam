<template>
    <v-app id="main">
        <Toolbar :drawer="drawer" v-on:toggle-drawer="setDrawer"/>
        <SideNav :drawer="drawer" v-model="setDrawer" />
    </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
import SideNav from "@/components/SideNav.vue";

export default {
  components: {
    SideNav,
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
