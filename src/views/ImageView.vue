<template>
  <v-container>
    <v-row class="ml-1">
      <v-col cols="8" class="list-btn" justify="center">
        <v-btn @click="listDrawings">List Drawings</v-btn>
      </v-col>
    </v-row>

    <div v-if="drawingFiles">
      <h3 class="ma-4 blue-grey--text">Drawings :</h3>
      <v-row
        class="ma-2 ml-6 mb-6"
        v-for="(df, index) in drawingFiles"
        :key="index"
      >
        <span class="subheading font-weight-light mr-2">ID: </span>
        <span
          class="subheading font-weight-light mr-4 blue--text"
          v-text="df.id"
        ></span>
        <span class="subheading font-weight-light mr-2">Name: </span>
        <span
          class="subheading font-weight-light mr-4 blue--text"
          v-text="df.name"
        ></span>
        <span class="subheading font-weight-light mr-2">Type: </span>
        <span
          class="subheading font-weight-light mr-4 blue--text"
          v-text="df.contentType"
        ></span>
        <span class="subheading font-weight-light mr-2">Last Updated: </span>
        <span
          class="subheading font-weight-light mr-4 blue--text"
          v-text="df.lastUpdated"
        ></span>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

import { DrawingFile, listUploadedDrawings } from '../service/drawing';

export default Vue.extend({
  name: 'Images',
  data(): {
    drawingFiles: DrawingFile[];
  } {
    return {
      drawingFiles: [],
    };
  },

  methods: {
    listDrawings() {
      this.drawingFiles = [];
      listUploadedDrawings()
        .then((response) => this.setDrawings(response))
        .catch((error) => {
          console.log(error);
        });
    },
    //server got the parameter
    setDrawings(files: DrawingFile[]) {
      this.drawingFiles = files;
    },
  },
});
</script>

<style lang="scss" scoped>
.list-btn {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
</style>
