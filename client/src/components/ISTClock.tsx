"use client";

import { useEffect, useState } from "react";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ISTClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const parts = useIndianTime(now);

  return (
    <div
      className="flex items-center gap-1.5 text-xs font-mono text-brand-slate select-none shrink-0"
      suppressHydrationWarning
    >
      <span className="material-symbols-outlined text-[14px] text-brand-saffron">
        schedule
      </span>
      <span className="font-semibold tracking-tight">
        {parts.day}.{monthNames[parts.month]}.{parts.year}
      </span>
      <span className="text-slate-300 mx-0.5">|</span>
      <span className="font-semibold tracking-tight tabular-nums">
        {parts.hour}:{parts.minute}:{parts.second}
      </span>
      <span className="font-bold text-brand-navy ml-0.5">{parts.period}</span>
    </div>
  );
}

function useIndianTime(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(now);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const day = parseInt(get("day"), 10).toString().padStart(2, "0");
  const month = parseInt(get("month"), 10) - 1;
  const year = get("year");
  const hour = get("hour");
  const minute = get("minute");
  const second = get("second");
  const period = get("dayPeriod").toUpperCase();

  return { day, month, year, hour, minute, second, period };
}