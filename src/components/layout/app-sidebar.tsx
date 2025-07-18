"use client"

import * as React from "react"
import {
  AudioWaveform,
  BotMessageSquare,
  Clock3,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  MessageCircleMore,
  PieChart,
  UserRound,
} from "lucide-react"

import { NavMain } from "@/components/layout/nav-main"
import { NavUser } from "@/components/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { motion } from "framer-motion";
import { usePathname } from "next/navigation"
import { Separator } from "../ui/separator"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar()
  const pathname = usePathname();
  const hiddenRoutes = ["/login"];
  const isHidden = hiddenRoutes.some(route => pathname.startsWith(route));
  const [isCanChat, setIsCanChat] = React.useState(false)
  const [isloginId, setIsLoginId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedChat = localStorage.getItem('status_chat') === 'true';
    const localLoginId = localStorage.getItem('loginId');

    setIsCanChat(storedChat);
    setIsLoginId(localLoginId);

  }, [pathname]);

  if (isHidden || !isloginId) return null;

  const data = {
    user: {
      name: isloginId,
      icon: UserRound
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
      ...(isCanChat ? [{
        title: "Chat bot",
        url: "/chatbot",
        icon: BotMessageSquare,
      }] : []),
      {
        title: "History",
        url: "/history",
        icon: Clock3,
      },
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
  };
  
  
  return (
    <>
      <Sidebar 
        collapsible="icon" 
        {...props}
        className="overflow-hidden shadow-lg sidebar border"
      >
        <SidebarHeader>
          <div>
            <div className="flex flex-row items-center gap-1 overflow-hidden">
              <Image
                src="/images/favicon.png"
                alt="icon"
                width={100}
                height={100}
                className="w-7 h-8 transition-all duration-300"
                priority
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
                AI-Desk
              </motion.span>
            </div>
          </div>
          <Separator className="my-1" />
            <NavUser user={data.user} />
          <Separator className="my-0" />

        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
    
    
  )
}
