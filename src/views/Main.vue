<template>
    <v-app>
        <SideNav :drawer="drawer" v-model="setDrawer" />
        <Toolbar :drawer="drawer" v-on:toggle-drawer="setDrawer"/>
        <!-- <v-content> <Calendar> </Calendar> </v-content> -->

          <v-container fluid>
            <Calendar />
          </v-container>

    </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
import SideNav from "@/components/SideNav.vue";
import Calendar from "@/components/Calendar.vue";

export default {
  components: {
    SideNav,
    Toolbar,
    Calendar
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
