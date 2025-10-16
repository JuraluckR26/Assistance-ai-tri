// components/ReadAloudButton.tsx
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type Props = {
  onClick?: () => void;
  label?: string;
  size?: number; // ขนาดไอคอน (px)
  iconSrc?: string;
  className?: string;
};

export default function ReadAloudButton({
  onClick,
  label = "อ่านเอกสารให้ฟัง",
  size = 100,
  iconSrc = "/images/microphone.gif",
  className = "",
}: Props) {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                    
                <button
                    type="button"
                    onClick={onClick}
                    className={`speak-btn inline-flex items-center gap-3 rounded-2xl py-2 text-white cursor-pointer ${className}`}
                    aria-label={label}
                >
                {/* ไอคอน PNG + overlay คลื่นเสียง */}
                <span className="icon-wrap">
                    <Image
                    src={iconSrc}
                    alt=""
                    width={size}
                    height={size}
                    priority
                    className="w-10 h-10 transition-all duration-300"
                    style={{ display: "block" }}
                    />
                    {/* คลื่นเสียงวาดด้วย SVG ทับบน PNG */}
                    <svg className="waves" viewBox="0 0 100 100" aria-hidden>
                    {/* วงโค้งซ้าย/ขวา */}
                    <path className="w1" d="M18,50 a22,22 0 0 1 0,-0.1" />
                    <path className="w2" d="M10,50 a30,30 0 0 1 0,-0.1" />
                    <path className="w3" d="M82,50 a22,22 0 0 0 0,-0.1" />
                    <path className="w4" d="M90,50 a30,30 0 0 0 0,-0.1" />
                    </svg>
                </span>

                {/* <span className="text-sm font-medium">{label}</span> */}

                {/* CSS เฉพาะ component นี้ */}
                <style jsx>{`
                    .icon-wrap {
                    position: relative;
                    display: inline-block;
                    }

                    /* เด้งเบา ๆ ตอน hover ให้เหมือนไมค์กำลังพูด */
                    .speak-btn:hover .icon-wrap {
                    animation: bob 900ms ease-in-out infinite;
                    }
                    @keyframes bob {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-1.5px); }
                    }

                    /* คลื่นเสียง */
                    .waves {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    opacity: 0;
                    }
                    .waves path {
                    stroke: currentColor;
                    stroke-width: 6;
                    stroke-linecap: round;
                    fill: none;
                    transform-origin: 50% 50%;
                    }

                    /* แสดง/สั่นเมื่อ hover */
                    .speak-btn:hover .waves { opacity: 1; }
                    .speak-btn:hover .waves .w1 { animation: wave 900ms ease-in-out infinite; }
                    .speak-btn:hover .waves .w2 { animation: wave 900ms ease-in-out infinite 120ms; }
                    .speak-btn:hover .waves .w3 { animation: wave 900ms ease-in-out infinite 240ms; }
                    .speak-btn:hover .waves .w4 { animation: wave 900ms ease-in-out infinite 360ms; }

                    @keyframes wave {
                    0%, 100% { transform: scale(0.9); opacity: 0.7; }
                    50%      { transform: scale(1.05); opacity: 1; }
                    }
                `}</style>
                </button>
            </TooltipTrigger>
            <TooltipContent side="top">
                <p>ฟัง</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  );
}
