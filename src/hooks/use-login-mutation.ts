import { useMutation } from "@tanstack/react-query"
import { z } from "zod"

import { authServices } from "@/services/auth-services"
import {LoginSchema} from "@/app/auth/login/components/login-form";

export type LoginInput = z.infer<typeof LoginSchema>

type LoginResponse = Awaited<ReturnType<typeof authServices.login>>

export function useLoginMutation() {
  return useMutation<LoginResponse, unknown, LoginInput>({
    mutationFn: async (payload) => {
      const parsedPayload = LoginSchema.parse(payload)
      return authServices.login(parsedPayload.email, parsedPayload.password)
    },
  })
}
