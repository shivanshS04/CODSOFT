"use client";
import SearchJob from "@/components/SearchJob";
import { Button } from "@/components/ui/button";
export default function page() {
  return <div className="w-full h-full">
    <div className="w-full h-96 bg-gradient-to-r from-blue-300 to-blue-900 dark:bg-gradient-to-r dark:from-amber-700 dark:to-zinc-950">
    </div>
    <SearchJob />
  </div>;
}
