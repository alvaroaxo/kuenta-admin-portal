import * as React from "react"

import {Eye, EyeOff} from "lucide-react"

import {cn} from "@/lib/utils"
import {Label} from "@/components/ui/label"

const inputBaseClass = cn(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-[8px] border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
)

type LabelProps = React.ComponentPropsWithoutRef<typeof Label>

type FieldWrapperProps = {
  label?: React.ReactNode
  labelProps?: LabelProps
  labelAction?: React.ReactNode
  errorMessage?: string
  errorId?: string
  wrapperClassName?: string
  disabled?: boolean
  inputId: string
  children: React.ReactNode
  helperContent?: React.ReactNode
}

function FieldWrapper({
  label,
  labelProps,
  labelAction,
  errorMessage,
  errorId,
  wrapperClassName,
  disabled,
  inputId,
  children,
  helperContent,
}: FieldWrapperProps) {
  return (
    <div
      className={cn("grid w-full gap-1", wrapperClassName)}
      data-disabled={disabled ? "true" : undefined}
    >
      {(label || labelAction) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <Label htmlFor={inputId} {...labelProps}>
              {label}
            </Label>
          )}
          {labelAction}
        </div>
      )}
      {children}
      {helperContent}
      {errorMessage && (
        <p id={errorId} className="text-destructive text-xs">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: React.ReactNode
  labelProps?: LabelProps
  labelAction?: React.ReactNode
  errorMessage?: string
  wrapperClassName?: string
  helperContent?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      labelProps,
      labelAction,
      errorMessage,
      wrapperClassName,
      id,
      helperContent,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? `input-${generatedId}`
    const errorId = errorMessage ? `${inputId}-error` : undefined
    const {"aria-describedby": ariaDescribedBy, disabled, ...restProps} = props
    const isDisabled = disabled
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined

    return (
      <FieldWrapper
        label={label}
        labelProps={labelProps}
        labelAction={labelAction}
        errorMessage={errorMessage}
        errorId={errorId}
        wrapperClassName={wrapperClassName}
        disabled={isDisabled}
        inputId={inputId}
        helperContent={helperContent}
      >
        <input
          id={inputId}
          ref={ref}
          type={type}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={describedBy}
          data-slot="input"
          className={cn(inputBaseClass, className)}
          disabled={isDisabled}
          {...restProps}
        />
      </FieldWrapper>
    )
  }
)
Input.displayName = "Input"

type PasswordInputProps = Omit<InputProps, "type">

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      label,
      labelProps,
      labelAction,
      errorMessage,
      wrapperClassName,
      id,
      helperContent,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
    const generatedId = React.useId()
    const inputId = id ?? `password-${generatedId}`
    const errorId = errorMessage ? `${inputId}-error` : undefined
    const {"aria-describedby": ariaDescribedBy, disabled, ...restProps} = props
    const isDisabled = disabled
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined

    const toggleVisibility = () => {
      setIsPasswordVisible((prev) => !prev)
    }

    return (
      <FieldWrapper
        label={label}
        labelProps={labelProps}
        labelAction={labelAction}
        errorMessage={errorMessage}
        errorId={errorId}
        wrapperClassName={wrapperClassName}
        disabled={isDisabled}
        inputId={inputId}
        helperContent={helperContent}
      >
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={isPasswordVisible ? "text" : "password"}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={describedBy}
            data-slot="input"
            className={cn(inputBaseClass, "pr-10", className)}
            disabled={isDisabled}
            {...restProps}
          />
          <button
            type="button"
            aria-label={isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            onClick={toggleVisibility}
            onMouseDown={(event) => event.preventDefault()}
            disabled={isDisabled}
            className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background absolute inset-y-0 right-0 flex items-center px-3 disabled:pointer-events-none"
          >
            {isPasswordVisible ? (
              <EyeOff aria-hidden className="h-4 w-4" />
            ) : (
              <Eye aria-hidden className="h-4 w-4" />
            )}
          </button>
        </div>
      </FieldWrapper>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export {Input, PasswordInput}
