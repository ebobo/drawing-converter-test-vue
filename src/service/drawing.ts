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

export async function listUploadedDrawings(): Promise<DrawingFile[]> {
  return http.get(`/drawings`).then((response) => {
    console.log(response.data.drawings);
    return response.data.drawings;
  });
}
