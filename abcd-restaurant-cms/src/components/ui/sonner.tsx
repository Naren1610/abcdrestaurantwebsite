"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-outfit"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-white" />
        ),
        info: (
          <InfoIcon className="size-4 text-white" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4 text-white" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-white" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin text-white" />
        ),
      }}
      toastOptions={{
        style: {
          backgroundColor: "#4e121e",
          color: "#ffffff",
          borderColor: "rgba(255, 255, 255, 0.15)",
        },
        classNames: {
          toast: "!bg-[#4e121e] !text-white !border-white/15 font-outfit shadow-2xl rounded-xl",
          title: "!text-white font-medium text-sm",
          description: "!text-white/85 text-xs font-outfit",
          actionButton: "bg-white text-[#4e121e] font-outfit font-medium text-xs rounded-lg px-3 py-1.5 hover:bg-white/90",
          cancelButton: "bg-white/20 text-white font-outfit text-xs rounded-lg px-3 py-1.5 hover:bg-white/30",
          closeButton: "!bg-[#4e121e] !text-white !border-white/20 hover:!bg-[#3a0d16]",
          success: "!bg-[#4e121e] !text-white !border-white/15",
          error: "!bg-[#4e121e] !text-white !border-white/15",
          info: "!bg-[#4e121e] !text-white !border-white/15",
          warning: "!bg-[#4e121e] !text-white !border-white/15",
          icon: "!text-white",
        },
      }}
      style={
        {
          "--normal-bg": "#4e121e",
          "--normal-text": "#ffffff",
          "--normal-border": "rgba(255, 255, 255, 0.15)",
          "--success-bg": "#4e121e",
          "--success-text": "#ffffff",
          "--success-border": "rgba(255, 255, 255, 0.15)",
          "--error-bg": "#4e121e",
          "--error-text": "#ffffff",
          "--error-border": "rgba(255, 255, 255, 0.15)",
          "--warning-bg": "#4e121e",
          "--warning-text": "#ffffff",
          "--warning-border": "rgba(255, 255, 255, 0.15)",
          "--info-bg": "#4e121e",
          "--info-text": "#ffffff",
          "--info-border": "rgba(255, 255, 255, 0.15)",
          "--border-radius": "12px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
