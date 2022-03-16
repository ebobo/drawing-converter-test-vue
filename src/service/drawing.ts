import Axios from 'axios';

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

export interface ImageFile {
  id: number;
  name: string;
  drawingId: string;
  contentType: string;
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

export async function fetchImages(
  drawingId: number,
  imageType: string,
  splitLayer: boolean
): Promise<ImageFile[]> {
  return http
    .get(`/drawings/${drawingId}/images/${imageType}/layer/${splitLayer}`)
    .then((response) => {
      return response.data.images;
    });
}
