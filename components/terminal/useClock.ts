import { useEffect, useRef, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
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
  "Dec"
];

export interface Clock {
  time: string; // HH:MM:SS wall clock
  date: string; // e.g. "Mon 16 Jun"
  uptime: string; // session uptime since mount, MM:SS (or HH:MM:SS)
}

// Live wall clock + session uptime. Starts empty so server and first client
// render match (no hydration mismatch), then ticks once mounted.
export function useClock(): Clock {
  const [clock, setClock] = useState<Clock>({ time: "", date: "", uptime: "" });
  const start = useRef(0);

  useEffect(() => {
    start.current = Date.now();
    const tick = () => {
      const now = new Date();
      const secs = Math.floor((Date.now() - start.current) / 1000);
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      const s = secs % 60;
      setClock({
        time: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
        date: `${DAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]}`,
        uptime: h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return clock;
}
