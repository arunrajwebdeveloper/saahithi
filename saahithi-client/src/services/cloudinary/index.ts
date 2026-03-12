import { http } from "@/lib/api/http";

const cloudinaryApi = {
  upload: (location: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return http.post(`/cloudinary/upload/${location}`, formData);
  },
  register: (data: any) => http.post("/auth/register", data),
  refresh: () => http.post("/auth/refresh"),
  logout: () => http.post("/auth/logout"),
};

export default cloudinaryApi;
