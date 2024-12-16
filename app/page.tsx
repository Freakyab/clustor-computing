"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [dummyData, setDummyData] = useState<DummyDataType[]>();
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState<DummyDataType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("running");
        const res = await fetch("https://fakestoreapi.com/products?limit=5", {
          method: "GET",
        });
        const data = await res.json();
        if (data) {
          setDummyData(data);
        } else {
          return false;
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!dummyData) return;

    if (category == "") {
      setFilterCategory(dummyData as DummyDataType[]);
    } else {
      dummyData.filter((item) => item.category === category);
    }
  }, [category]);

  return (
    <main className="flex h-screen flex-col items-center justify-between overflow-auto">
      {/* <div className="">
        {dummyData?.map((item) => (
          <div className="capitalize">{item.category}</div>
        ))}
      </div> */}
      <div className="grid grid-cols-3 gap-4 p-8 mt-10">
        {dummyData?.map((item) => (
          <div
            key={item.id}
            className="border border-gray-400 w-full h-full flex flex-col p-4 group rounded-md">
            <Image
              src={item.image}
              alt={`image-${item.id}`}
              width={300}
              height={500}
              className=" object-contain h-52 w-full group-hover:scale-110 transition-all ease-out duration-300"
            />
            <div className="p-2 w-full">
              <div className="flex justify-between py-2 text-lg">
                <p className="line-clamp-1 tracking-wide ">{item.title}</p>
                <Heart />
                {/* <p className="text-red-600 px-2">{item.rating.count}</p> */}
              </div>
              <p className="text-sm p-4 line-clamp-3">{item.description}</p>
              <div className="flex justify-between">
                <p className="font-bold text-2xl text-green-500 p-2">
                  ${item.price}
                </p>
                <span className="font-bold text-lg p-2 flex items-center text-red-500 gap-1">
                  <Heart size={20} />
                  {item.rating.count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
