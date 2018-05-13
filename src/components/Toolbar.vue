<template>
  <div>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Advance Scheduler</span>
      </v-toolbar-title>
      <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down" />
      <v-spacer />
      <ToolbarButton icon="person"/>
      <ToolbarButton icon="notifications"/>
    </v-toolbar>
    
    <v-content>
      <v-container fluid fill-height>
        <slot />
      </v-container>
    </v-content>
    
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <v-list dense>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import ToolbarButton from "./ToolbarButton";
export default {
  data: () => ({
    drawer: true
  }),
  methods: {},
  watch: {},
  components: {
    ToolbarButton
  }
};
</script>
