import Axios from 'axios';
import qs from 'qs';

const http = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_PATH,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      console.log('Logging the error', error);
    }

    throw error;
  }
);

// export interface DrawingFiles {
//   drawings: DrawingFile[];
// }
export interface DrawingFile {
  id: number;
  name: string;
  contentType: string;
  lastUpdated: number;
}

export interface ImageInfo {
  id: number;
  name: string;
  drawingId: string;
  contentType: string;
  subLayer: boolean;
}

export interface DrawingUploadResponse {
  ID: number;
}

export interface GetImagesRequest {
  drawingId: number;
  imageType: string;
  splitLayer: boolean;
}

// REST
export async function uploadDrawing(
  data: FormData
): Promise<DrawingUploadResponse> {
  return http
    .post<DrawingUploadResponse>(`/drawing/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.data;
    });
}

export async function listUploadedDrawings(): Promise<DrawingFile[]> {
  return http.get(`/drawings`).then((response) => {
    return response.data.drawings;
  });
}

export async function fetchDrawingsData(drawingId: number): Promise<any> {
  return http
    .get(`/drawings/data`, { params: { drawingId } })
    .then((response) => {
      return response.data;
    });
}

export async function fetchImagesInfo(
  drawingId: number,
  imageType: string,
  splitLayer: boolean
): Promise<ImageInfo[]> {
  return http
    .get(`/drawings/images/info`, {
      params: { drawingId, imageType, splitLayer },
    })
    .then((response) => {
      return response.data.images;
    });
}

export async function fetchImage(imageId: number): Promise<string> {
  return http
    .get(`/drawings/image`, {
      params: { imageId },
    })
    .then((response) => {
      return response.data;
    });
}

export async function fetchCombineImage(ids: number[]): Promise<string> {
  return http
    .get(`/drawings/image/combine`, {
      params: { imageIds: ids },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
}
