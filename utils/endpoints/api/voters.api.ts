import axiosInstance from '../../config/axios'

export class Voters {
  static upload(data: FormData) {
    return axiosInstance.postForm("/voters", data);
  }
}