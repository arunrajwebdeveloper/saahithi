import { http } from "@/lib/api/http";

const cloudinaryApi = {
  upload: (location: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return http.post(`/cloudinary/upload/${location}`, formData);
  },
  getSignature: () => http.get("/cloudinary/signature"),
  delete: (publicId: string) => http.delete(`/cloudinary/image/${publicId}`),
  cleanup: () => http.post("/cloudinary/manual-cleanup"),
};

export default cloudinaryApi;
