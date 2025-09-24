import { publicApi } from "@/config/api";

export const authServices = {
  login: async (email: string, password: string) => {
    const request = {
      email,
      password
    }
    const response = await publicApi.post('/auth/login', request);
    return response.data;
  }
}