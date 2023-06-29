import axiosInstance from '../../config/axios'
import { AuthData } from '../types/auth.type';

export class Auth {
  static login(data: AuthData) {
    return axiosInstance.post("/login", data);
  }
  // static signup(data: AuthData) {
  //   return axiosInstance.post("/login", data);
  // }
}