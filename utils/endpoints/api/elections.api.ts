import axiosInstance from '../../config/axios'
import { UpdateAnElectionData } from '../types/elections.type';
import { CreateUserData } from '../types/users.type';

export class Elections {
  static create(data: CreateUserData) {
    return axiosInstance.post("/elections", data);
  }

  static getElections() {
    return axiosInstance.get("/elections");
  }

  static getElection(id: number) {
    return axiosInstance.get(`/elections/${id}`);
  }

  static updateElection(id: number, data: UpdateAnElectionData) {
    return axiosInstance.put(`/elections/${id}`, data);
  }

  static deleteElection(id: number) {
    return axiosInstance.delete(`/elections/${id}`);
  }

  static getElectionParticipants(id: number) {
    return axiosInstance.get(`/elections/${id}/participants`);
  }

  static getElectionResults(id: number) {
    return axiosInstance.get(`/elections/${id}/results`);
  }
}