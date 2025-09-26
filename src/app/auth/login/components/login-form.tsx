"use client"

import {useForm} from "react-hook-form"
import {z} from "zod"
import {ComponentProps, useState} from "react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input, PasswordInput} from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod"
import {useLoginMutation} from "@/hooks/use-login-mutation"
import {AxiosError} from "axios"
import {useRouter} from 'next/navigation'
import Link from "next/link"

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm({
                            className,
                            ...props
                          }: ComponentProps<"form">) {
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "alvaro4@mail.com",
      password: "12345678",
    },
  })

  const loginMutation = useLoginMutation()

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setFormError(null)
    form.clearErrors()

    try {
      const response = await loginMutation.mutateAsync(values)

      if (response) {
        router.push("/")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          const field = issue.path.at(0)

          if (typeof field === "string") {
            form.setError(field as keyof z.infer<typeof LoginSchema>, {
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
        "Invalid credentials. Please try again."

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
        <h1 className="text-2xl font-bold">Bienvenido!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Ingresa tu correo electrónico y contraseña para iniciar sesión
        </p>
      </div>
      <div className="grid gap-6">
        <Input
          {...form.register("email")}
          id="email"
          type="email"
          placeholder="m@example.com"
          disabled={loginMutation.isPending}
          label="Correo electrónico*"
          errorMessage={form.formState.errors.email?.message}
          wrapperClassName="grid gap-3"
        />
        <PasswordInput
          {...form.register("password")}
          id="password"
          disabled={loginMutation.isPending}
          label="Contraseña*"
          labelAction={
            <a
              href="#"
              className="text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          }
          errorMessage={form.formState.errors.password?.message}
          wrapperClassName="grid gap-3"
        />
        {formError && <p className="text-sm text-red-500">{formError}</p>}
        <Button
          type="submit"
          className="w-full"
          loading={loginMutation.isPending}
        >
          Ingresar
        </Button>
        <div
          className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            O
          </span>
        </div>
        <Button variant="outline" className="w-full" disabled={loginMutation.isPending}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 488 512" height="200px"
               width="200px" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Continuar con Google
        </Button>
      </div>
      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/auth/register" className="underline underline-offset-4">
          Registrarse
        </Link>
      </div>
    </form>
  )
}
