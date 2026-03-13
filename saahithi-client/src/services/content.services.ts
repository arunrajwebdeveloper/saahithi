import { http } from "@/lib/api/http";

const contentApi = {
  create: (data: any) => http.post("/content", data),
  update: (id: any, data: any) => http.patch(`/content/${id}`, data),
  saveAsDraft: (id: any) => http.patch(`/content/${id}/draft`),
  publish: (id: any) => http.patch(`/content/${id}/publish`),
  trash: (id: any) => http.patch(`/content/${id}/trash`),
  restore: (id: any) => http.patch(`/content/${id}/restore`),
  delete: (id: any) => http.patch(`/content/${id}/permanent`),
  getMyContents: () => http.get("/content/content-list"),
  getContentById: (id: any) => http.get(`/content/${id}`),
  getContentByAuthor: (author: any) =>
    http.get(`/content/${author}/content-list`),
};

export default contentApi;
