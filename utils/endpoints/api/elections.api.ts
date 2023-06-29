import axiosInstance from '../../config/axios'
import { CreateElectionData, UpdateAnElectionData } from '../types/elections.type';

export class Elections {
  static async create(data: CreateElectionData) {
    return await axiosInstance.post("/elections", data);
  }

  static async getElections() {
    return await axiosInstance.get("/elections");
  }

  static async getElection(id: number) {
    return await axiosInstance.get(`/elections/${id}`);
  }

  static async updateElection(id: number, data: UpdateAnElectionData) {
    return await axiosInstance.put(`/elections/${id}`, data);
  }

  static async deleteElection(id: number) {
    return await axiosInstance.delete(`/elections/${id}`);
  }

  static async getElectionParticipants(id: number) {
    return await axiosInstance.get(`/elections/${id}/participants`);
  }

  static async getElectionResults(id: number) {
    return await axiosInstance.get(`/elections/${id}/results`);
  }
}