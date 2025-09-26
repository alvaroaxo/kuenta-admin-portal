"use client"

import { ComponentProps, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function VerificationEmailForm({
  className,
  ...props
}: ComponentProps<"div">) {
  const [otpCode, setOtpCode] = useState("")
  const [resendTimer, setResendTimer] = useState(60)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsVerifying(true)

    // TODO: Implement your verification logic here
    console.log("Verifying code:", otpCode)

    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false)
    }, 1000)
  }

  const handleResendCode = () => {
    // TODO: Implement your resend code logic here
    setResendTimer(60)
    console.log("Resending code...")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verifica tu correo electrónico</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Introduce el código de 6 dígitos que te hemos enviado a tu correo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="otp-code" className="text-center">
            Código de verificación
          </Label>
          <InputOTP
            id="otp-code"
            maxLength={6}
            value={otpCode}
            onChange={(value) => setOtpCode(value)}
            disabled={isVerifying}
            containerClassName="w-full"
          >
            <InputOTPGroup className="w-full">
              <InputOTPSlot index={0} className="flex-1" />
              <InputOTPSlot index={1} className="flex-1" />
              <InputOTPSlot index={2} className="flex-1" />
              <InputOTPSlot index={3} className="flex-1" />
              <InputOTPSlot index={4} className="flex-1" />
              <InputOTPSlot index={5} className="flex-1" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={isVerifying}
          disabled={otpCode.length < 6 || isVerifying}
        >
          Verificar cuenta
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        {resendTimer > 0 ? (
          <p>
            ¿No recibiste el código? Reenviar en{" "}
            <span className="font-semibold text-primary">{resendTimer}s</span>
          </p>
        ) : (
          <p>
            ¿No recibiste el código?{" "}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={handleResendCode}
              disabled={isVerifying}
            >
              Reenviar código
            </Button>
          </p>
        )}
      </div>
    </div>
  )
}
