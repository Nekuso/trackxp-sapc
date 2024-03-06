import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-darkComponentBg border border-lightBorder shadow-2xl text-white px-2 mr-6">
        <DropdownMenuLabel className="py-2 flex flex-col gap-1">
          <span>Nixxo Jamilla</span>
          <span className="text-xs text-gray-300">
            nixxojamilla555@gmail.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-lightBorder" />
        <DropdownMenuGroup className="py-2">
          <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-applicationPrimary">
            <User className="mr-2 h-7 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-applicationPrimary">
            <Settings className="mr-2 h-7 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-lightBorder" />
        <DropdownMenuGroup className="py-2">
          <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-applicationPrimary">
            <Github className="mr-2 h-7 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-applicationPrimary">
            <LifeBuoy className="mr-2 h-7 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-lightBorder" />
        <DropdownMenuGroup className="py-2">
          <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-applicationPrimary hover:text-red-500">
            <LogOut className="mr-2 h-7 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
