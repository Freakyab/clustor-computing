"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { UseUser } from "../context";

function Navbar() {
  const router = useRouter();
  const { user } = UseUser();
console.log(user)
  return (
    <div className="text-white justify-between flex items-center h-12 bg-slate-500 fixed w-full p-2 z-10">
      <h1 className="text-2xl">ShowHere</h1>
      <div className="px-2 flex gap-4">
        <p className="cursor-pointer" onClick={() => router.push("/")}>
          Home
        </p>
        {user?.name ? (
          <p>{user?.name}</p>
        ) : (
          <p className="cursor-pointer" onClick={() => router.push("/login")}>
            Login
          </p>
        )}
      </div>
    </div>
  );
}

export default Navbar;
