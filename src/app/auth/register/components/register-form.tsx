"use client"

import { ComponentProps, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { Check, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, PasswordInput } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useRegisterMutation } from "@/hooks/use-register-mutation"

import Link from "next/link"

const PASSWORD_REQUIREMENTS = [
  {
    id: "length",
    label: "Mínimo 8 caracteres",
    validate: (value: string) => value.length >= 8,
  },
  {
    id: "uppercase",
    label: "Al menos una mayúscula",
    validate: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "lowercase",
    label: "Al menos una minúscula",
    validate: (value: string) => /[a-z]/.test(value),
  },
  {
    id: "number",
    label: "Al menos un número",
    validate: (value: string) => /\d/.test(value),
  },
]

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(100, { message: "Máximo 100 caracteres" }),
  lastName: z
    .string()
    .min(1, { message: "El apellido es obligatorio" })
    .max(100, { message: "Máximo 100 caracteres" }),
  email: z.string().email({ message: "Ingresa un correo válido" }),
  password: z
    .string()
    .min(8, { message: "Mínimo 8 caracteres" })
    .regex(/[A-Z]/, { message: "Debe incluir al menos una mayúscula" })
    .regex(/[a-z]/, { message: "Debe incluir al menos una minúscula" })
    .regex(/\d/, { message: "Debe incluir al menos un número" }),
})

export function RegisterForm({
                            className,
                            ...props
                          }: ComponentProps<"form">) {
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const registerMutation = useRegisterMutation()
  const passwordValue = form.watch("password") ?? ""
  const passwordRequirementStates = useMemo(
    () =>
      PASSWORD_REQUIREMENTS.map((rule) => ({
        id: rule.id,
        label: rule.label,
        met: rule.validate(passwordValue),
      })),
    [passwordValue]
  )

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setFormError(null)
    form.clearErrors()

    try {
      const response = await registerMutation.mutateAsync(values)

      if (response) {
        router.push("/auth/login")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          const field = issue.path.at(0)

          if (typeof field === "string") {
            form.setError(field as keyof z.infer<typeof RegisterSchema>, {
              type: "manual",
              message: issue.message,
            })
          }
        })

        return
      }

      const axiosError = error as AxiosError<{ message?: string }>
      const message =
        axiosError.response?.data?.message ??
        axiosError.message ??
        "No se pudo completar el registro. Inténtalo nuevamente."

      setFormError(message)
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Completa la información para registrarte en Kuenta
        </p>
      </div>
      <div className="grid gap-6">
        <Input
          {...form.register("firstName")}
          id="firstName"
          type="text"
          placeholder="Ej. María"
          disabled={registerMutation.isPending}
          label="Nombre*"
          errorMessage={form.formState.errors.firstName?.message}
          wrapperClassName="grid gap-3"
        />
        <Input
          {...form.register("lastName")}
          id="lastName"
          type="text"
          placeholder="Ej. González"
          disabled={registerMutation.isPending}
          label="Apellido*"
          errorMessage={form.formState.errors.lastName?.message}
          wrapperClassName="grid gap-3"
        />
        <Input
          {...form.register("email")}
          id="email"
          type="email"
          placeholder="m@example.com"
          disabled={registerMutation.isPending}
          label="Correo electrónico*"
          errorMessage={form.formState.errors.email?.message}
          wrapperClassName="grid gap-3"
        />
        <PasswordInput
          {...form.register("password")}
          id="password"
          disabled={registerMutation.isPending}
          label="Contraseña*"
          errorMessage={form.formState.errors.password?.message}
          wrapperClassName="grid gap-3"
          helperContent={
            <PasswordRequirementList requirements={passwordRequirementStates} />
          }
        />
        <Button
          type="submit"
          className="w-full"
          loading={registerMutation.isPending}
        >
          Crear cuenta
        </Button>
        <div
          className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            O
          </span>
        </div>
        <Button variant="outline" className="w-full" disabled={registerMutation.isPending}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 488 512" height="200px"
               width="200px" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Registrarse con Google
        </Button>
      </div>
      <div className="text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Iniciar sesión
        </Link>
      </div>
    </form>
  )
}

type PasswordRequirementState = {
  id: string
  label: string
  met: boolean
}

function PasswordRequirementList({
  requirements,
}: {
  requirements: PasswordRequirementState[]
}) {
  return (
    <ul className="mt-1 grid gap-1 text-xs text-muted-foreground" aria-live="polite">
      {requirements.map((requirement) => (
        <li
          key={requirement.id}
          className={cn(
            "flex items-center gap-2",
            requirement.met ? "text-emerald-600" : "text-muted-foreground"
          )}
        >
          <span className="flex h-4 w-4 items-center justify-center">
            {requirement.met ? (
              <Check className="h-3 w-3" aria-hidden />
            ) : (
              <Circle className="h-3 w-3" aria-hidden />
            )}
          </span>
          <span className="leading-tight">{requirement.label}</span>
        </li>
      ))}
    </ul>
  )
}
