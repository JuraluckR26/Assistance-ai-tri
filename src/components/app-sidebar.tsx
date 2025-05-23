"use client"

import * as React from "react"
import {
  AudioWaveform,
  BotMessageSquare,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  MessageCircleMore,
  PieChart,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Separator } from "./ui/separator"
import { motion, AnimatePresence } from "framer-motion";

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
        <div className="flex justify-center">
          <div className="flex flex-row items-center gap-2 overflow-hidden">
            <Image
              src="/images/chatbot2-blue.png"
              alt="icon"
              width={30}
              height={20}
              className="transition-all duration-300"
            />
            <motion.span
              initial={false}
              animate={open ? "open" : "closed"}
              variants={{
                open: { opacity: 1, width: "auto", marginLeft: "0.5rem" },
                closed: { opacity: 0, width: 0, marginLeft: 0 },
              }}
              transition={{ duration: 0.25 }}
              className="text-xl font-bold text-[hsl(var(--sidebar-foreground))] whitespace-nowrap overflow-hidden"
            >
              Ai-HelpDesk
            </motion.span>
          </div>
        </div>
        {/* {!open ? (  
          <div className="flex justify-center">
            <Image className="" src="/images/chatbot2-blue.png" alt="icon" width={25} height={20} />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-row gap-2">
              <Image className="" src="/images/chatbot2-blue.png" alt="icon" width={25} height={20} />
              <span className="m-1 text-xl font-bold text-[hsl(var(--sidebar-foreground))]">Ai-HelpDesk</span>
            </div>
          </div>
        )} */}
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Separator className="my-1" />
        <NavUser user={data.user} />
        <Separator className="my-0" />

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
