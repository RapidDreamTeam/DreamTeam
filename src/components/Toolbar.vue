<template>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Advance Scheduler</span>
      </v-toolbar-title>
      <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down" />
      <v-spacer />
      <ToolbarButton icon="person"/>
      <ToolbarButton icon="notifications"/>
    </v-toolbar>
</template>

<script>
import ToolbarButton from "./ToolbarButton";
export default {
  props: ["drawer"],
  methods: {
    toggleDrawer() {
      this.$emit("toggle-drawer", null);
    }
  },
  watch: {},
  components: {
    ToolbarButton
  }
};
</script>
