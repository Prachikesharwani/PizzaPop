import { baseURL } from "@/utils/baseURL";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Item({ data }) {
  console.log(data);
  return (
    <div className="min-h-screen px-10 dark:bg-black bg-[#F2F2F2] py-5">
      <Link href={"/"}>
        <div className="container max-w-md  flex mb-6 cursor-pointer hover:scale-125  justify-center items-center mx-auto dark:text-white text-[#0066A7]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </Link>

      <div className="container border-gradient max-w-md p-6 md:p-8 mb-16 mx-auto  flex space-y-4 flex-col items-center justify-center">
        <div className="relative w-full h-96 rounded-lg lg:w-96">
          <Image
            src={data.img}
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
            alt="item image"
          />
        </div>

        <div className="font-extrabold mb-2 text-base md:text-2xl uppercase dark:text-white text-black">
          {data.name}
        </div>
        <div className=" max-w-sm text-base md:text-lg text-gray-700 dark:text-gray-400">
          {data.description}
        </div>
      </div>
    </div>
  );
}

export default Item;

export async function getServerSideProps(context) {
  const { item } = context.query;
  // Fetch data from external API
  const res = await fetch(baseURL + "api/getDataById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item: item }),
  });
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data.data } };
}
