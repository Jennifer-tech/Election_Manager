import axiosInstance from '../../config/axios'
import { UpdateParticipants } from '../types/participants.type';

export class Participants {
//   static create(data: CreateUserData) {
//     return axiosInstance.post("/elections", data);
//   }

  static addParticipants() {
    return axiosInstance.post("/participants");
  }

  static uploadPhoto(id: number) {
    return axiosInstance.put(`/participants/${id}/photo`);
  }

  static updateParticipant(id: number, data: UpdateParticipants) {
    return axiosInstance.put(`/participants/${id}`, data);
  }

  static deleteAdmin(id: number) {
    return axiosInstance.delete(`/participants/${id}`);
  }

  static getElectionParticipants(id: number) {
    return axiosInstance.get(`/elections/${id}/participants`);
  }
}
 