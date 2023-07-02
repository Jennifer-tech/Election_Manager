import axiosInstance from '../../config/axios'
import { CreateVotesData } from '../types/votes.type';

export class Votes {
  static create(data: CreateVotesData) {
    return axiosInstance.post("/votes", data);
  }
}