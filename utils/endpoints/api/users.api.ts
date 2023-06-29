import axiosInstance from '../../config/axios'
import { CreateUserData } from '../types/users.type';

export class Users {
  static create(data: CreateUserData) {
    return axiosInstance.post("/users", data);
  }
}