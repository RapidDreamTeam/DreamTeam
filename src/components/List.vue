<template>
  <v-app>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile v-else :key="item.title" avatar @click="">
              <!--<v-list-tile-avatar>-->
                <!--<img :src="item.avatar">-->
              <!--</v-list-tile-avatar>-->
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</v-app>
</template>

<script>
import { auth } from "@/firebase.js";
export default {
  data() {
    return {
      // items: [
      //   { header: "Today" },
      //   { avatar: "/assets/img/hackathon.jpg", title: "TOC Task 2" },
      //   { divider: true, inset: true },
      //   { avatar: "/assets/img/hackathon.jpg", title: 'Hackathon-2 <span class="grey--text text--lighten-1">4</span>' },
      //   { divider: true, inset: true },
      //   {
      //     avatar: "/assets/img/hackathon.jpg",
      //     title: "God of War",
      //     subtitle: "<span class='text--primary'>Playstation Overload</span> &mdash; You need to finish this, Boy."
      //   }
      // ],
    };
  },
  methods: {},
  computed: {
    items() {
      return this.$store.getters.getTasksAsList;
    }
  },
  beforeMount: function() {
    // console.log("mount");
    this.$store.dispatch("getTaskByEarliestDueDate", auth().currentUser.uid);
  }
};
</script>
