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

export interface DrawingFile {
  name: string;
  content_type: string;
  last_updated: number;
  data: File | null;
}

// export interface DrawingUploadRequest {
//   require_type: string;
//   split_layer: boolean;
//   data: UintArray;
// }

export interface DrawingUploadResponse {
  ID: number;
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
