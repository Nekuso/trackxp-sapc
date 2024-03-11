"use client";
"use strict";
exports.__esModule = true;
exports.columns = void 0;
var avatar_1 = require("@/components/ui/avatar");
exports.columns = [
    {
        id: "Name",
        header: "Name",
        cell: function (_a) {
            var row = _a.row;
            var item = row.original;
            return (React.createElement("div", { className: "flex place-items-center gap-2" },
                React.createElement(avatar_1.Avatar, { className: "w-10 h-10 cursor-pointer" },
                    React.createElement(avatar_1.AvatarImage, { src: item.img_url, alt: item.name }),
                    React.createElement(avatar_1.AvatarFallback, { className: "bg-darkBg" }, item.name[0])),
                React.createElement("div", { className: "flex flex-col" },
                    React.createElement("span", { className: "text-sm font-semibold" }, item.name),
                    React.createElement("span", { className: "text-xs" }, item.email))));
        }
    },
    {
        accessorKey: "contact_number",
        header: "Contact Number"
    },
    {
        accessorKey: "role",
        header: "Role"
    },
    {
        id: "status",
        header: "Status",
        cell: function (_a) {
            var row = _a.row;
            var item = row.original;
            if (item.status === "Available") {
                return (React.createElement("p", { className: "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-green-300 bg-green-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-green-600" }, item.status));
            }
            else if (item.status === "In Progress") {
                return (React.createElement("p", { className: "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-yellow-300 bg-yellow-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-yellow-600" }, item.status));
            }
            else {
                return (React.createElement("p", { className: "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-red-300 bg-red-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-red-600" }, item.status));
            }
        }
    },
];
