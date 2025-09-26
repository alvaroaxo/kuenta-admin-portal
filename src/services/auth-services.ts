import { publicApi } from "@/config/api"

type RegisterRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const authServices = {
  login: async (email: string, password: string) => {
    const request = {
      email,
      password,
    }
    const response = await publicApi.post("/auth/login", request)
    return response.data
  },
  register: async ({ firstName, lastName, email, password }: RegisterRequest) => {
    const request = {
      firstName,
      lastName,
      email,
      password,
    }

    const response = await publicApi.post("/auth/register", request)
    return response.data
  },
}
