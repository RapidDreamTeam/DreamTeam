<template>
  <v-app>
    <Toolbar>
      <Main />
    </Toolbar>
  </v-app>
</template>

<script>
// Need to vue router
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import Main from "@/views/Main.vue";

export default {
  components: {
    Toolbar,
    Main
  },
  data: () => ({}),
  methods: {}
};
</script>
