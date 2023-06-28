import axiosInstance from '../../config/axios'
import { LoginData } from '../types/auth.type';

export class Auth {
  static login(data: LoginData) {
    return axiosInstance.post("/login", data);
  }
}