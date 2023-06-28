import axiosInstance from '../../config/axios'

export class Voters {

  static registerVoters() {
    return axiosInstance.post("/voters");
  }
}