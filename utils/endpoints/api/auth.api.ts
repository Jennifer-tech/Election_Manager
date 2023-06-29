import { URLSearchParams } from 'url';
import axiosInstance from '../../config/axios';

export class Auth {
  static async login(data: URLSearchParams) {
    return await axiosInstance.post("/login", data);
  }
  // static async login(data: AuthData) {
  //   return await axiosInstance.post("/login", data);
  // }
  // static async signup(data: AuthData) {
  //   return await axiosInstance.post("/login", data);
  // }
}