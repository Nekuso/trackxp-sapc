/** @format */
"use client";
import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";

type Props = {};

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 60000) + 1000,
  },
];

export default function BarChart({}: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `₱ ${value}`}
          width={80}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#605ECD",
            border: "none",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
            borderRadius: "10px",
            padding: "15px",
          }}
        />
        <Bar dataKey={"total"} radius={[10, 10, 0, 0]} fill="#605ECD" />
      </BarGraph>
    </ResponsiveContainer>
  );
}
