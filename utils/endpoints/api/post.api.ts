import axiosInstance from "../../config/axios";
import { CreatePostData } from "../types/post.type";

export class Posts {
  static async create(data: CreatePostData) {
    return await axiosInstance.post("/posts", data);
  }

  static async delete(id: string | number) {
    return await axiosInstance.get(`/posts/${id}`);
  }
}
