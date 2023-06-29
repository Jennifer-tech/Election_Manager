import axiosInstance from '../../config/axios'
import { CreateVotes } from '../types/votes.type';

export class Votes {
  static create(data:CreateVotes) {
    return axiosInstance.post("/votes", data);
  }
}