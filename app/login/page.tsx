"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { UseUser } from "../context";

function Login() {
  const router = useRouter();
  const { setUser } = UseUser();
  const [formData, setFormdata] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.password) {
      return alert("Add all the parameters");
    }

    if (formData.password.length < 6) {
      return alert("Invalid password length");
    }

    try {
      const res = await fetch(`http://localhost:8000/account/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();
      if (responseData.status) {
        toast.success(responseData.message);
        setUser(responseData.user);
        setFormdata({
          name: "",
          password: "",
        });
        router.push("/");
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Internal error");
    }
  };
  return (
    <div className="flex h-[calc(100vh-3rem)] w-screen justify-center items-center ">
      <div className="flex min-w-[60%] flex-col justify-between gap-4 shadow-lg rounded-xl p-4 bg-slate-100">
        <h2 className="text-center font-semibold text-xl">Sign in</h2>
        <div className="flex flex-col gap-4 p-4 ">
          <div className="flex flex-col">
            <p className="text-lg py-2">Name</p>
            <input
              type="text"
              placeholder="Enter your Name"
              className="p-2 rounded-md border"
              onChange={(e) =>
                setFormdata({
                  ...formData,
                  name: e.target.value,
                })
              }
              value={formData.name}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg py-2">Password</p>
            <input
              type="text"
              className="p-2 rounded-md border"
              placeholder="Enter your Password"
              onChange={(e) =>
                setFormdata({
                  ...formData,
                  password: e.target.value,
                })
              }
              value={formData.password}
            />
          </div>
          <p className="text-sm text-center">
            Don't have account
            <a href="/register" className="text-blue-400 underline">
              {" "}
              sign up
            </a>
          </p>
          <button
            className="bg-blue-400 rounded-md w-fit mr-auto p-4"
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;