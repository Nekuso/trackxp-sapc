import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import notificationIcon from "@/icons/notification-icon.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notificationsData = [
  {
    id: 1,
    title: "Payout Update",
    type: "Announcement",
    timestamp: "1h",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    title: "New Feature Released",
    type: "Update",
    timestamp: "2h",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    title: "Maintenance",
    type: "Reminder",
    timestamp: "3h",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    title: "Announcement",
    type: "Announcement",
    timestamp: "4h",
    img: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    title: "Weekly Report",
    type: "Reminder",
    timestamp: "5h",
    img: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    title: "Bug Fix Deployed",
    type: "Update",
    timestamp: "6h",
    img: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 7,
    title: "Registration",
    type: "Notification",
    timestamp: "7h",
    img: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

export default function NotificationButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-auto h-auto bg-darkComponentBg rounded-full p-2 hover:bg-applicationPrimary transition duration-300 cursor-pointer">
          <Image
            src={notificationIcon}
            alt="notification icon"
            className="w-full h-full"
          ></Image>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px] bg-darkComponentBg border border-lightBorder shadow-2xl text-white px-2 mr-14">
        <DropdownMenuLabel className="py-2">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-lightBorder" />
        <DropdownMenuGroup className="py-2 gap-4 flex flex-col">
          {notificationsData.map((notification) => (
            <DropdownMenuItem
              className="rounded-lg cursor-pointer hover:bg-applicationPrimary hover:shadow-2xl hover:scale-105 transition-all duration-100 gap-2"
              key={notification.id}
            >
              <Avatar className="w-10 h-10 cursor-pointer">
                <AvatarImage src={notification.img} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="w-full h-full flex justify-between place-items-start">
                <div className="w-full flex flex-col">
                  <span className="font-Regular text-sm w-full">
                    {notification.title}
                  </span>
                  <span className="text-xs text-gray-300">
                    {notification.type}
                  </span>
                </div>
                <span className="w-2/3 text-end text-xs font-semibold">
                  {notification.timestamp}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
