import axiosInstance from '../../config/axios';

export class Participants {
  static create(data: FormData) {
    return axiosInstance.postForm("/participants", data);
  }

  static deleteAdmin(id: number) {
    return axiosInstance.delete(`/participants/${id}`);
  }

  static getElectionParticipants(id: number) {
    return axiosInstance.get(`/elections/${id}/participants`);
  }
}
 