"use client";

import { FolderKanban, Gauge, Heart, List, Box, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const sidebarItems = [
    {
      label: "Dashboard",
      icon: Gauge,
      path: "/admin/dashboard",
    },
    {
      label: "Product",
      icon: FolderKanban,
      path: "/admin/products",
    },
    {
      label: "Favorites",
      icon: Heart,
      path: "/admin/favorites",
    },
    {
      label: "Order Lists",
      icon: List,
      path: "/admin/orders",
    },
    {
      label: "Product Stock",
      icon: Box,
      path: "/admin/product-stock",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];


  const pathname = usePathname();

  return (
    <div className="p-2 text-white sticky top-[60px]">
      {sidebarItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;

        return (
          <Link href={item.path} key={idx} className={`flex gap-x-2 items-center rounded-md py-2 px-4 mb-2
            ${isActive ? "bg-[#4881FF]" : "text-primary"}
          `}>
            <Icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
