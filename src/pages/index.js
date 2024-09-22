import Card from "@/components/home/Card";
import CarouselComponent from "@/components/home/Carousel";
import { Inter } from "next/font/google";
// import cardData from "../store/cardData.json";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
// import data from "../store/cardData.json"
import { baseURL } from "@/utils/baseURL";
import Head from "next/head";

export default function Home({data}) {
  let categories = new Set();
  let categoryArray;
  const [typeFilter, setTypeFilter] = useState(false);
  const foodData = [];
  const handleData = () => {
    data?.map((data) => {
      return foodData.push(data), categories.add(data.category);
    });
  };

  handleData();

  categoryArray = [...categories];

  return (
    <>
    <Head>
      <title>PizzaPop</title>
    </Head>
      <CarouselComponent />
      <div className="container mx-auto dark:bg-black bg-[#F2F2F2]">
        <div className="mb-6 space-x-5 mx-5">
          <button
            className={` rounded-full dark:border-white border-[#0066A7] dark:text-white text-black mt-6 border-2 py-1 px-3 ${
              !typeFilter && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => setTypeFilter(false)}
          >
            All
          </button>
          <button
            className={` rounded-full dark:border-white border-[#0066A7] dark:text-white text-black mt-6 border-2 py-1 px-3 ${
              typeFilter === "Veg" && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => {
              setTypeFilter("Veg");
            }}
          >
            <span
              className={
                "lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500"
              }
            >
              ●
            </span>
            Veg
          </button>
          <button
            className={` rounded-full dark:border-white border-[#0066A7] dark:text-white text-black mt-6 border-2 py-1 px-3 ${
              typeFilter === "Non-Veg" && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => {
              setTypeFilter("Non-Veg");
            }}
          >
            <span
              className={
                "lowercase font-thin bg-white border-red-500 border mr-2 px-0.1 text-red-500"
              }
            >
              ●
            </span>
            Non Veg
          </button>
        </div>
        {categoryArray.map((category,index) => {
          return (
            <div className="mx-5" key={index}>
              <div
                key={category}
                className=" text-4xl mt-10 mb-3 uppercase font-bold dark:text-white text-[#0066A7]"
              >
                {category}
              </div>
              <hr className="dark:border-white border-[#0066A7]"/>
              <div className="flex flex-col items-center justify-center">
                <div className=" grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                  {foodData
                    ?.filter((foodData) => category === foodData.category)
                    ?.filter((foodData) =>
                      typeFilter ? typeFilter === foodData.foodType : foodData
                    )
                    ?.map((data) => {
                      return <Card key={data.name} foodData={data} />;
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps(){
  let data;
  try {
    const PizzaData = await fetch(baseURL+'api/foodData',{method:"GET"})
    .then((response)=>response.json()).catch((error)=>error.message);
    data = await JSON.parse(JSON.stringify(PizzaData));
  } catch (error) {
    console.log(error.message);
  }
  return {
    props:{
      data:data.data || null
    },
    revalidate:5,
  }
}
