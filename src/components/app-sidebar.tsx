"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  BotMessageSquare,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  MessageCircleMore,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeadset } from "@fortawesome/free-solid-svg-icons"

const data = {
  user: {
    name: "Juraluck",
    email: "m@example.com",
    avatar: "/images/orangeCatBGWhite.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Ask Khun Jai Dee",
      url: "/search",
      // icon: <FontAwesomeIcon icon={faHeadset} className="w-4 h-4" />,
      icon: MessageCircleMore
    },
    {
      title: "Chat bot",
      url: "#",
      // icon: <BotMessageSquare/>,
      icon: BotMessageSquare,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar()
  return (
    <Sidebar 
      collapsible="icon" 
      {...props}
      className="m-2 rounded-t-2xl rounded-b-2xl overflow-hidden shadow-lg sidebar border"
    >
      <SidebarHeader>
        {!open ? (  
          <span className="m-2 text-xl font-bold text-[hsl(var(--sidebar-foreground))]">L</span>
        ) : (
          <span className="m-2 text-xl font-bold text-[hsl(var(--sidebar-foreground))]">LOGO</span>
        )}
        {/* <TeamSwitcher teams={data.teams} /> */}
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
