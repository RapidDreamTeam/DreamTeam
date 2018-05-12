<template>
  <v-app>
      <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="toggleNavBar" fixed app>
        <v-list dense>

        </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  props: ["drawer"],
  methods: {
    toggleNavBar: () => {
      console.log("abc");
      this.$emit("input", null);
    }
  }
};
</script>
