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
        class="ma-1 ml-6 mb-6"
        v-for="(df, index) in drawingFiles"
        :key="index"
      >
        <v-col cols="1">
          <span class="subheading font-weight-light mr-2">ID: </span>
          <span
            class="subheading font-weight-light mr-4 mt-1 blue--text"
            v-text="df.id"
          ></span>
        </v-col>
        <v-col cols="3">
          <span class="subheading font-weight-light mr-2">Name: </span>
          <span
            class="subheading font-weight-light mr-4 mt-1 blue--text"
            v-text="df.name"
          ></span>
        </v-col>
        <v-col cols="1">
          <span class="subheading font-weight-light mr-2">Type: </span>
          <span
            class="subheading font-weight-light mr-4 mt-1 blue--text"
            v-text="df.contentType"
          ></span>
        </v-col>
        <v-col cols="4">
          <span class="subheading font-weight-light mr-2">Last Updated: </span>
          <span
            class="subheading font-weight-light mr-4 blue--text"
            v-text="df.lastUpdated"
          ></span>
        </v-col>
        <v-col cols="3">
          <v-btn color="primary" small top @click="getImagesInfo(df.id, false)">
            <v-icon>mdi-file-image</v-icon>
          </v-btn>
          <v-btn
            class="ml-1"
            color="cyan"
            small
            @click="getImagesInfo(df.id, true)"
          >
            <v-icon>mdi-image-multiple-outline</v-icon>
          </v-btn>
          <v-btn class="ml-1" color="success" small top @click="getData(df.id)">
            <v-icon>mdi-book-information-variant</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- <v-row
        class="ma-2 ml-6 mb-6"
        v-for="(da, index) in imageDatas"
        :key="index"
      >
        <div v-html="da"></div>
      </v-row> -->
      <!-- <div>{{ imageData }}</div> -->
      <v-row align="center" justify="center" class="ml-1">
        <v-zoomer style="width: 500px; height: 500px; border: solid 1px silver">
          <div class="image-viewer" v-html="imageData"></div>
        </v-zoomer>
      </v-row>
    </div>
    <div v-if="imageInfos.length > 0">
      <v-row>
        <h3 class="ma-4 blue-grey--text">Drawing-Images Info :</h3>
        <v-btn class="ml-2 mt-4" color="#FF5722" small @click="combineImage()">
          <v-icon>mdi-layers-plus</v-icon>
        </v-btn>
      </v-row>
      <v-row
        align="center"
        class="ma-1 ml-6 mb-6"
        v-for="(info, index) in imageInfos"
        :key="index"
      >
        <v-col cols="1">
          <span class="subheading font-weight-light mr-2">ID: </span>
          <span
            class="subheading font-weight-light mr-4 blue--text"
            v-text="info.id"
          ></span>
        </v-col>
        <v-col cols="3">
          <span class="subheading font-weight-light mr-2">Name: </span>
          <span
            class="subheading font-weight-light mr-4 blue--text"
            v-text="info.name"
          ></span>
        </v-col>
        <v-col cols="2">
          <span class="subheading font-weight-light mr-2">Type: </span>
          <span
            class="subheading font-weight-light mr-4 blue--text"
            v-text="info.contentType"
          ></span>
        </v-col>
        <v-col cols="2">
          <span class="subheading font-weight-light mr-2">Drawing ID: </span>
          <span
            class="subheading font-weight-light mr-4 blue--text"
            v-text="info.drawingId"
          ></span>
        </v-col>
        <v-col cols="2">
          <span class="subheading font-weight-light mr-2">Layer: </span>
          <span
            class="subheading font-weight-light mr-4blue--text"
            v-text="info.subLayer"
          ></span>
        </v-col>
        <v-col cols="1">
          <v-btn color="#FFAB00" small @click="getImage(info.id)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-checkbox
            class="mt-0"
            color="secondary"
            hide-details
            :value="checkIncludes(info.id)"
            @change="setSelectedSubImages(info.id, $event)"
          ></v-checkbox>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row class="ml-1" v-if="currentDrawingData">
        <tree-view class="ma-2" :data="currentDrawingData"></tree-view>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

import {
  DrawingFile,
  ImageInfo,
  listUploadedDrawings,
  fetchImagesInfo,
  fetchDrawingsData,
  fetchImage,
  fetchCombineImage,
} from '../service/drawing';
import TreeView from 'vue-json-tree-view';

Vue.use(TreeView);

export default Vue.extend({
  name: 'Images',
  data(): {
    drawingFiles: DrawingFile[];
    imageInfos: ImageInfo[];
    imageDatas: string[];
    imageData: string;
    currentDrawingData: any;
    selectedImageIDs: number[];
  } {
    return {
      drawingFiles: [],
      imageInfos: [],
      imageDatas: [],
      imageData: '',
      currentDrawingData: null,
      selectedImageIDs: [],
    };
  },

  methods: {
    listDrawings() {
      this.drawingFiles = [];
      this.imageData = '';
      this.currentDrawingData = null;
      this.selectedImageIDs = [];
      listUploadedDrawings()
        .then((response) => this.setDrawings(response))
        .catch((error) => {
          console.log(error);
        });
    },
    getImagesInfo(id: number, layer: boolean) {
      this.imageDatas = [];
      this.imageData = '';
      this.currentDrawingData = null;
      this.selectedImageIDs = [];
      fetchImagesInfo(id, 'svg', layer)
        .then((response) => this.setImages(response))
        .catch((error) => {
          console.log(error);
        });
    },
    getImage(id: number) {
      this.imageDatas = [];
      this.imageData = '';
      this.currentDrawingData = null;
      fetchImage(id)
        .then((response) => this.setImage(response))
        .catch((error) => {
          console.log(error);
        });
    },
    getData(id: number) {
      this.imageInfos = [];
      this.currentDrawingData = null;
      fetchDrawingsData(id)
        .then((response) => {
          this.currentDrawingData = JSON.parse(
            // converte string data to json object.
            // atob(response.drawingData) //base64 decode typescript
            response.metaData
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
    setImages(images: ImageInfo[]) {
      this.imageInfos = images;
    },

    setImage(data: string) {
      this.imageData = data;
    },

    setSelectedSubImages(id: number, selected: boolean) {
      let index = this.selectedImageIDs.indexOf(id);
      if (index === -1) {
        if (selected) {
          this.selectedImageIDs.push(id);
        }
      } else {
        if (!selected) {
          this.selectedImageIDs.splice(index, 1);
        }
      }
    },

    checkIncludes(id: number): boolean {
      return this.selectedImageIDs.includes(id);
    },

    combineImage() {
      fetchCombineImage(this.selectedImageIDs)
        .then((response) => {
          this.setImage(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clearSelection() {
      this.imageData = '';
      this.imageInfos = [];
      this.drawingFiles = [];
      this.imageDatas = [];
      this.currentDrawingData = null;
      this.selectedImageIDs = [];
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

.image-viewer {
  /* display: flex;
  border: 3px dotted rgb(147, 197, 243);
  display: flex;
  width: 500px;
  height: 500px; */
  align-items: center;
}
</style>
