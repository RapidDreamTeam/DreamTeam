<template>
  <v-app>
    <div v-if="['/', '/signin', '/register'].includes($route.path)">
      <!-- <videoBG :sources="['/media/Office-Day/MP4/Office-Day.mp4']" img="/media/Office-Day/SnapShots/Office-Day.jpg"> -->
        <router-view />
      <!-- </videoBG> -->
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
import VideoBG from "vue-videobg";
export default {
  components: {
    Toolbar,
    VideoBG
  },
  data: () => ({}),
  methods: {}
};
</script>
