import React from "react";

export default function SidebarHeader() {
  return (
    <header className="flex gap-2 items-center h-[50px]">
      <div>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="50" height="50" fill="#DDDDDD" />
        </svg>
      </div>
      <h1 className="text-xl font-bold text-black">Dashboard</h1>
    </header>
  );
}
