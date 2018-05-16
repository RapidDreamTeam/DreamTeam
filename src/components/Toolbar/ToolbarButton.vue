<template>
    <v-btn icon>
        <v-icon :click="$emit('click', null)">{{ icon }}</v-icon>
    </v-btn>
</template>


<script>
export default {
  props: ["icon"]
};
</script>
