import {GalleryVerticalEnd} from "lucide-react";
import {LoginForm} from "@/app/auth/login/components/login-form";

export default function AuthLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4"/>
            </div>
            Kuenta.
          </a>
        </div>
        {children}
        {/*<div className="flex flex-1 items-center justify-center">*/}
        {/*  <div className="w-full max-w-xs">*/}
        {/*    <RegisterForm />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/assets/images/banner.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"/>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 text-center text-white">
          <div className="flex items-center space-x-1">
            <GalleryVerticalEnd className="size-9"/>
            <span className="text-5xl font-semibold uppercase">
            Kuenta.
          </span>
          </div>
          <span className="text-lg font-light">
            Tu restaurante, en una sola cuenta.
          </span>
        </div>
      </div>
    </div>
    // <div>
    //   {children}
    // </div>
  );
}
