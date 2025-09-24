import {AppSidebar} from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Separator} from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {Button} from "@/components/ui/button";
import {Home, Upload} from "lucide-react";
import {Input} from "@/components/ui/input";

export default function Page() {
  return (

    <div className="flex flex-1 flex-col gap-4 p-4 p-10">
      <h1>Productos</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl shadow-lg p-4 space-y-4 bg-white ">
          <Input placeholder="Usuario" />
          <Input placeholder="Password" />
          <Button fullWidth startIcon={<Upload />}>Guardar</Button>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl p-4 space-y-4 bg-white">
          <Input placeholder="Usuario" />
          <Input placeholder="Password" />
          <Button fullWidth startIcon={<Upload />}>Guardar</Button>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl"/>
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <p>Hola</p>
      </div>
    </div>
  )
}
