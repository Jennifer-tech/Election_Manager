import axiosInstance from '../../config/axios';
import { AddParticipantsData } from '../types/participants.type';

export class Participants {
  static create(data: AddParticipantsData) {
    return axiosInstance.post("/participants", data);
  }

  static deleteAdmin(id: number) {
    return axiosInstance.delete(`/participants/${id}`);
  }

  static getElectionParticipants(id: number) {
    return axiosInstance.get(`/elections/${id}/participants`);
  }
}
 