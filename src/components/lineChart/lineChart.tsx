"use client";
import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

type Props = {};

const data = [
  {
    name: "Monday",
    total: Math.floor(Math.random() * 60000) + 1000,
    diff: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Tuesday",
    total: Math.floor(Math.random() * 60000) + 1000,
    diff: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Wednesday",
    total: Math.floor(Math.random() * 60000) + 1000,
    diff: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Thursday",
    total: Math.floor(Math.random() * 60000) + 1000,
    diff: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Friday",
    total: Math.floor(Math.random() * 60000) + 1000,
    diff: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Saturday",
    total: Math.floor(Math.random() * 60000) + 1000,
    diff: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Sunday",
    total: Math.floor(Math.random() * 60000) + 1000,
    diff: Math.floor(Math.random() * 60000) + 1000,
  },
];

export default function BarChart({}: Props) {
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#605ECD" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#605ECD" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="diff" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7F7D87" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7F7D87" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="gray" />
        <YAxis stroke="gray" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "none",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
            borderRadius: "10px",
            padding: "15px",
            color: "black",
          }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#605ECD"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#total)"
        />
        <Area
          type="monotone"
          dataKey="diff"
          stroke="#7F7D87"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#diff)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
