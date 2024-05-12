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
import { toast as sonner } from "sonner";
import { useTransition } from "react";
import { signOut } from "@/lib/actions/index";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/slices/userSessionSlice";
import { useRouter } from "next/navigation";

export default function ProfileButton({ data }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(setCurrentUser(data));

  const [isPending, startTransition] = useTransition();

  const onSignOut = async () => {
    sonner("Loggin out...", {});
    startTransition(async () => {
      await signOut();
    });
  };

  const viewProfile = () => {
    router.push(`/application/profile/${data.id}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 cursor-pointer rounded-lg shadow-2xl primary-glow transition-all duration-300 border border-transparent hover:border-applicationPrimary">
          <AvatarImage
            src={data.image_url}
            className=" shadow-2xl primary-glow rounded-md transition-all duration-300 border border-transparent hover:border-applicationPrimary"
          />
          <AvatarFallback className="text-black shadow-2xl primary-glow rounded-md transition-all duration-300 border border-transparent hover:border-applicationPrimary">{`${data.first_name[0]}${data.last_name[0]}`}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-darkComponentBg border border-lightBorder shadow-2xl text-white px-2 mr-6">
        <DropdownMenuLabel className="py-1 flex flex-col gap-1">
          <span>{`${data.first_name} ${data.last_name}`}</span>
          <span className="text-xs text-gray-300">{data.roles.role}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-lightBorder" />
        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem
            className="rounded-lg cursor-pointer hover:bg-applicationPrimary"
            onClick={() => {
              viewProfile();
            }}
          >
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
        <DropdownMenuGroup className="py-1">
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
        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem
            className="rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
            onClick={() => {
              onSignOut();
            }}
          >
            <LogOut className="mr-2 h-7 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
