import axiosInstance from '../../config/axios'
import { CreateAdminData } from '../types/admin.type';

export class Admin {
  static create(data: CreateAdminData) {
    return axiosInstance.post("/admins", data);
  }

  static get() {
    return axiosInstance.get("/admins");
  }

  static delete(id: number) {
    return axiosInstance.delete(`/admins/${id}`);
  }
}