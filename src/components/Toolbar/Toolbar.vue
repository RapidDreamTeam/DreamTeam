<template>
  <div>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Advance Scheduler</span>
      </v-toolbar-title>
      <v-spacer />
      <ToolbarButton icon="person"/>
      <v-btn class="blue darken-3" dark large @click.stop="signout">
        Sign out
      </v-btn>
      <ToolbarButton icon="notifications"/>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <slot />
      </v-container>
    </v-content>

    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import ToolbarButton from "./ToolbarButton.vue";
import AddTaskModal from "../AddTaskModal";
export default {
  data: () => ({
    drawer: true,
    dialog: false,
    items: [
      { heading: "Scheduler" },
      { icon: "calendar_today", text: "Dashboard", link: "/dashboard" },
      { icon: "calendar_today", text: "Class Management", link: "/something" },
      { icon: "calendar_today", text: "Task Management", link: "/abc" },
      { icon: "calendar_today", text: "Time Management", link: "/def" },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Labels",
        model: true,
        children: [{ icon: "add", text: "Create label" }]
      }
    ]
  }),
  methods: {
    signout() {
      this.$store.dispatch("signout");
    }
  },
  watch: {},
  components: {
    ToolbarButton
  }
};
</script>
