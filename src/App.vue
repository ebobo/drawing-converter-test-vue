<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h3 class="ml-2">Drawing converter - Tester</h3>
      </div>
      <v-spacer></v-spacer>
      <v-btn :to="{ path: '/' }" text>
        <span class="mr-1">Upload</span>
        <v-icon>mdi-file-upload-outline</v-icon>
      </v-btn>
      <v-btn :to="{ path: '/images' }" text>
        <span class="mr-1">Images</span>
        <v-icon>mdi-floor-plan</v-icon>
      </v-btn>
      <v-btn :to="{ path: '/about' }" text>
        <span class="mr-1">About</span>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
