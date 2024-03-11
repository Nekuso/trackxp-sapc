"use client";
"use strict";
exports.__esModule = true;
exports.DataTable = void 0;
var react_table_1 = require("@tanstack/react-table");
var table_1 = require("@/components/ui/table");
var input_1 = require("@/components/ui/input");
var data_table_pagination_1 = require("./data-table-pagination");
function DataTable(_a) {
    var _b;
    var columns = _a.columns, data = _a.data;
    var table = react_table_1.useReactTable({
        data: data,
        columns: columns,
        initialState: {
            pagination: {
                pageSize: 8
            }
        },
        getCoreRowModel: react_table_1.getCoreRowModel(),
        getPaginationRowModel: react_table_1.getPaginationRowModel()
    });
    return (React.createElement("div", { className: "w-full h-full flex flex-col justify-between gap-6" },
        React.createElement("div", { className: "w-full flex justify-between " },
            React.createElement(input_1.Input, { className: "w-[300px] h-10 border-darkBg bg-darkComponentBg rounded-xl", placeholder: "Find Employee" })),
        React.createElement("div", { className: "w-full h-full bg-darkComponentBg rounded-xl border-lightBorder overflow-clip" },
            React.createElement(table_1.Table, { className: "relative border-none z-10 border" },
                React.createElement(table_1.TableHeader, { className: "sticky top-0 bg-darkComponentBg border-none" }, table.getHeaderGroups().map(function (headerGroup) { return (React.createElement(table_1.TableRow, { key: headerGroup.id, className: "border-b-darkBg shadow-sm" }, headerGroup.headers.map(function (header) {
                    return (React.createElement(table_1.TableHead, { key: header.id }, header.isPlaceholder
                        ? null
                        : react_table_1.flexRender(header.column.columnDef.header, header.getContext())));
                }))); })),
                React.createElement(table_1.TableBody, { className: "border-none overflow-y-scroll justify-between" }, ((_b = table.getRowModel().rows) === null || _b === void 0 ? void 0 : _b.length) ? (table.getRowModel().rows.map(function (row) { return (React.createElement(table_1.TableRow, { key: row.id, "data-state": row.getIsSelected() && "selected", className: "border-none hover:bg-applicationPrimary transition-all duration-300" }, row.getVisibleCells().map(function (cell) { return (React.createElement(table_1.TableCell, { key: cell.id }, react_table_1.flexRender(cell.column.columnDef.cell, cell.getContext()))); }))); })) : (React.createElement(table_1.TableRow, null,
                    React.createElement(table_1.TableCell, { colSpan: columns.length, className: "h-24 text-center" }, "No results.")))))),
        React.createElement(data_table_pagination_1.DataTablePagination, { table: table })));
}
exports.DataTable = DataTable;
