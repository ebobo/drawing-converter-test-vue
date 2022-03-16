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
        <v-col cols="1">
          <span class="subheading font-weight-light mr-2 mt-1">ID: </span>
          <span
            class="subheading font-weight-light mr-4 mt-1 blue--text"
            v-text="df.id"
          ></span>
        </v-col>
        <v-col cols="3">
          <span class="subheading font-weight-light mr-2 mt-1">Name: </span>
          <span
            class="subheading font-weight-light mr-4 mt-1 blue--text"
            v-text="df.name"
          ></span>
        </v-col>
        <v-col cols="2">
          <span class="subheading font-weight-light mr-2 mt-1">Type: </span>
          <span
            class="subheading font-weight-light mr-4 mt-1 blue--text"
            v-text="df.contentType"
          ></span>
        </v-col>
        <v-col cols="4">
          <span class="subheading font-weight-light mr-2 mt-1"
            >Last Updated:
          </span>
          <span
            class="subheading font-weight-light mr-4 mt-1 blue--text"
            v-text="df.lastUpdated"
          ></span>
        </v-col>
        <v-col cols="2">
          <v-btn color="primary" small top @click="getImages(df.id)">
            <v-icon>mdi-file-image</v-icon>
          </v-btn>
          <v-btn class="ml-1" color="success" small top @click="getData(df.id)">
            <v-icon>mdi-book-information-variant</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="ml-1">
        <tree-view class="ma-2" :data="currentDrawingData"></tree-view>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

import {
  DrawingFile,
  ImageFile,
  listUploadedDrawings,
  fetchImages,
  fetchDrawingsData,
  // fetchMetaData,
} from '../service/drawing';
import TreeView from 'vue-json-tree-view';

Vue.use(TreeView);

export default Vue.extend({
  name: 'Images',
  data(): {
    drawingFiles: DrawingFile[];
    imageFiles: ImageFile[];
    currentDrawingData: any;
  } {
    return {
      drawingFiles: [],
      imageFiles: [],
      currentDrawingData: null,
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
    getImages(id: number) {
      this.imageFiles = [];
      fetchImages(id, 'svg', false)
        .then((response) => this.setImages(response))
        .catch((error) => {
          console.log(error);
        });
    },
    getData(id: number) {
      this.currentDrawingData = null;
      fetchDrawingsData(id)
        .then((response) => {
          this.currentDrawingData = JSON.parse(
            // converte string data to json object.
            atob(response.drawingData) //base64 decode typescript
          ).layers;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //server got the parameter
    setDrawings(files: DrawingFile[]) {
      this.drawingFiles = files;
    },
    //server got the parameter
    setImages(files: ImageFile[]) {
      files.forEach((file) => {
        console.log(file.id, file.name);
      });
      //   this.imageFiles = files;
    },

    clearSelection() {
      this.drawingFiles = [];
      this.imageFiles = [];
      this.currentDrawingData = null;
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
.image-btn {
  display: flex;
  width: 50px;
  margin-top: 0px;
  align-items: center;
}
</style>
