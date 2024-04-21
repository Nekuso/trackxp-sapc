"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-applicationPrimary group-[.toaster]:text-white group-[.toaster]:border-lightBorder group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-slate-200 font-montserrat",
          actionButton:
            "group-[.toast]:bg-white group-[.toast]:text-black group-[.toast]:rounded-md group-[.toast]:py-4 group-[.toast]:px-5 group-[.toast]:font-semibold ",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
