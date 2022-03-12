<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <div class="blue--text mb-2">File ( .dwg )</div>
        <v-file-input
          accept=".dwg"
          label="Click here to select a file"
          v-model="chosenFile"
          @click:clear="clearSelection"
        ></v-file-input>
      </v-col>
      <v-col cols="1" class="upload-btn" justify="center">
        <v-btn @click="uploadFile">upload</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-select
          :items="imageTypes"
          label="Require Type"
          v-model="requireType"
        ></v-select>
      </v-col>
      <v-col cols="4">
        <v-checkbox v-model="splitLayer" label="Split Layer"></v-checkbox>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <span class="subheading font-weight-light mr-2">Drawing ID: </span>
        <span
          class="text-h4 red--text font-weight-light mr-1"
          v-text="drawingID"
        ></span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { DrawingUploadResponse, uploadDrawing } from '../service/drawing';

export default Vue.extend({
  name: 'Home',
  data(): {
    chosenFile: File | null;
    drawingID: number;
    splitLayer: boolean;
    imageTypes: string[];
    requireType: string;
  } {
    return {
      chosenFile: null,
      drawingID: 0,
      splitLayer: false,
      imageTypes: ['svg', 'png', 'jpeg'],
      requireType: 'svg',
    };
  },

  methods: {
    uploadFile() {
      this.clearSelection();
      if (this.chosenFile === null) {
        return;
      }
      let formData = new FormData();
      formData.append('file', this.chosenFile);
      formData.append('type', this.requireType);
      formData.append('layer', this.splitLayer ? 'split' : 'single');

      uploadDrawing(formData)
        .then((response) => this.setResult(response))
        .catch((error) => {
          console.log(error);
        });
    },
    //server got the parameter
    setResult(data: DrawingUploadResponse) {
      this.drawingID = data.ID;
    },

    clearSelection() {
      this.drawingID = 0;
    },
  },
});
</script>

<style lang="scss" scoped>
.upload-btn {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
</style>
