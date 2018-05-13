<template>
    <v-app>
      <Toolbar>
        <v-content>
          <v-container fluid fill-height>
            <v-layout justify-center align-center>
              Hi There
            </v-layout>
          </v-container>
        </v-content>
      </Toolbar>
    </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";

export default {
  components: {
    Toolbar
  },
  data: () => ({}),
  methods: {}
};
</script>
