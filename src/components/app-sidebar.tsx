import * as React from "react"
import LogoSvg from "@/assets/logo.svg"
import {
  IconChartBar,
  IconDashboard,
  IconListDetails,
  IconSearch,
  IconMovie,
  IconNotebook,
  IconDeviceTv
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Catálogo",
      url: "/catalog",
      icon: IconMovie,
    },
    {
      title: "Meu Diário",
      url: "/diary",
      icon: IconNotebook,
    },
    {
      title: "Filmes Para Assistir",
      url: "/watch-list",
      icon: IconDeviceTv,
    },
    {
      title: "Minhas Estatísticas",
      url: "/analytics",
      icon: IconChartBar,
    },
  ],
  navSecondary: [
    {
      title: "Procurar",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="flex items-center gap-2 font-medium">
                <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                  <img src={LogoSvg} alt="Logo" className="size-6" />
                </div>
                Rio Branco Filmes
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
