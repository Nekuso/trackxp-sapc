"use strict";
exports.__esModule = true;
exports.DataTablePagination = void 0;
var react_icons_1 = require("@radix-ui/react-icons");
var button_1 = require("@/components/ui/button");
function DataTablePagination(_a) {
    var table = _a.table;
    return (React.createElement("div", { className: "flex items-center justify-end px-2" },
        React.createElement("div", { className: "flex items-center space-x-6 lg:space-x-8" },
            React.createElement("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium" },
                "Page ",
                table.getState().pagination.pageIndex + 1,
                " of",
                " ",
                table.getPageCount()),
            React.createElement("div", { className: "flex items-center space-x-2" },
                React.createElement(button_1.Button, { className: "hidden h-8 w-8 p-0 lg:flex bg-darkComponentBg", onClick: function () { return table.setPageIndex(0); }, disabled: !table.getCanPreviousPage() },
                    React.createElement("span", { className: "sr-only" }, "Go to first page"),
                    React.createElement(react_icons_1.DoubleArrowLeftIcon, { className: "h-4 w-4" })),
                React.createElement(button_1.Button, { className: "h-8 w-8 p-0 bg-darkComponentBg", onClick: function () { return table.previousPage(); }, disabled: !table.getCanPreviousPage() },
                    React.createElement("span", { className: "sr-only" }, "Go to previous page"),
                    React.createElement(react_icons_1.ChevronLeftIcon, { className: "h-4 w-4" })),
                React.createElement(button_1.Button, { className: "h-8 w-8 p-0 bg-darkComponentBg", onClick: function () { return table.nextPage(); }, disabled: !table.getCanNextPage() },
                    React.createElement("span", { className: "sr-only" }, "Go to next page"),
                    React.createElement(react_icons_1.ChevronRightIcon, { className: "h-4 w-4" })),
                React.createElement(button_1.Button, { className: "hidden h-8 w-8 p-0 lg:flex bg-darkComponentBg", onClick: function () { return table.setPageIndex(table.getPageCount() - 1); }, disabled: !table.getCanNextPage() },
                    React.createElement("span", { className: "sr-only" }, "Go to last page"),
                    React.createElement(react_icons_1.DoubleArrowRightIcon, { className: "h-4 w-4" }))))));
}
exports.DataTablePagination = DataTablePagination;
