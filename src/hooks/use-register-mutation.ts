import { useMutation } from "@tanstack/react-query"
import { z } from "zod"

import { authServices } from "@/services/auth-services"
import {RegisterSchema} from "@/app/auth/register/components/register-form";

export type RegisterInput = z.infer<typeof RegisterSchema>

type RegisterResponse = Awaited<ReturnType<typeof authServices.register>>

export function useRegisterMutation() {
  return useMutation<RegisterResponse, unknown, RegisterInput>({
    mutationFn: async (payload) => {
      const parsedPayload = RegisterSchema.parse(payload)

      return authServices.register({
        firstName: parsedPayload.firstName,
        lastName: parsedPayload.lastName,
        email: parsedPayload.email,
        password: parsedPayload.password
      })
    },
  })
}
