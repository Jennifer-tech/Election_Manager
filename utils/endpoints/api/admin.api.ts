import axiosInstance from '../../config/axios'
import { CreateAdminData } from '../types/admin.type';

export class Admin {
  static create(data: CreateAdminData) {
    return axiosInstance.post("/admins", data);
  }

  static getAdmins() {
    return axiosInstance.get("/admins");
  }

  static deleteAdmin(id: number) {
    return axiosInstance.delete(`/admins/${id}`);
  }

}