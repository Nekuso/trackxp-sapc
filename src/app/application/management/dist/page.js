"use strict";
exports.__esModule = true;
var data_table_1 = require("./data-table");
var column_1 = require("./column");
var data_json_1 = require("./data/data.json");
function Management() {
    return (React.createElement("div", { className: "w-full h-full flex justify-center place-items-center" },
        React.createElement("div", { className: "w-full h-full max-w-[1840px] max-h-[900px] flex flex-col justify-between gap-6 " },
            React.createElement("div", { className: "w-full h-full flex gap-6 " },
                React.createElement(data_table_1.DataTable, { columns: column_1.columns, data: data_json_1["default"] }),
                React.createElement("div", { className: "w-[40%] h-full bg-darkComponentBg rounded-xl" })))));
}
exports["default"] = Management;
