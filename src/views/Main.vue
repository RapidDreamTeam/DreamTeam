<template>
    <v-app id="main">
        <Toolbar drawer="drawer" v-on:toggle-drawer="setDrawer"/>
    </v-app>
</template>

<script>
import Frame from "@/components/Frame.vue";
import Toolbar from "@/components/Toolbar.vue";

export default {
  components: {
    Frame,
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
