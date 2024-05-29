"use client";
import Container from "components/Layout/Container/Container";
import SelectList from "components/ui/Select/Select";
import Overlay from "components/widgets/Overlay/Overlay";
import React, { useState } from "react";
import img2 from "../../../public/images/img-1.png";
import img3 from "../../../public/images/img-10.png";
import img4 from "../../../public/images/img-11.png";
import img5 from "../../../public/images/img-12.png";
import img6 from "../../../public/images/img-13.png";
import img7 from "../../../public/images/img-14.png";
import img8 from "../../../public/images/img-15.png";
import img9 from "../../../public/images/img-16.png";
import Card from "components/ui/Card/Card";
import Link from "next/link";
import Collapse from "components/ui/Collapse/Collapse";
import { Pagination, Slider } from "antd";
import DrawerMenu from "components/ui/DrawerMenu/DrawerMenu";
import { IoFunnelOutline } from "react-icons/io5";

const items = [
  {
    image: img3,
    title: "JBL Micoro Headphone",
    price: 23,
    oldprice: 38,
    star: 2,
  },
  {
    image: img4,
    title: "Bose Color Speaker",
    price: 21,
    oldprice: 38,
    star: 2,
  },
  {
    image: img5,
    title: "Bose Color Speaker",
    price: 30,
    oldprice: 38,
    star: 2,
  },
  {
    image: img6,
    title: "Asus Watch Speaker",
    price: 28,
    oldprice: 38,
    star: 2,
  },
  {
    image: img7,
    title: "Asus Watch Speaker",
    price: 12,
    oldprice: 38,
    star: 2,
  },
  {
    image: img8,
    title: "Sony Wireless Bohm",
    price: 19,
    oldprice: 38,
    star: 2,
  },
  {
    image: img9,
    title: "Bose Color Speaker",
    price: 30,
    oldprice: 38,
    star: 2,
  },
  {
    image: img6,
    title: "Asus Watch Speaker",
    price: 28,
    oldprice: 38,
    star: 2,
  },
];

const Product = () => {
  const [colorName, setColorName] = useState<string>();
  console.log(colorName);

  let colorsARray = [
    { colorName: "000" },
    { colorName: "153" },
    { colorName: "343" },
    { colorName: "e22" },
    { colorName: "ht3" },
    { colorName: "7f3" },
  ];

  return (
    <>
      <Overlay title="Product" />
      <Container className="mt-20">
        <div className="flex justify-end gap-3">
          <div className="flex gap-2 items-center w-3/6 md:w-auto">
            <h1 className="">Sort By: </h1>
            <SelectList
              className=" w-40 h-12 border-primary "
              defaultValue="Default"
              options={[
                { value: "Best Match", label: "Best Match" },
                { value: "Low to High", label: "Low to High" },
                { value: "High to Low", label: "High to Low" },
              ]}
            />
          </div>
          <input
            className="px-2 border-2 rounded-md border-primary outline-none w-3/6 md:w-auto"
            type="search"
            placeholder="Search"
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-10">
          <div className="w-full md:w-3/12 space-y-3 hidden md:block relative">
          <div className="sticky top-20">
          <div className="p-2 bg-secondary">
              <Collapse title="All Categories">
                <ul className="px-1 pt-2 space-y-1">
                  <li>
                    <Link href={"/"}>Dresses</Link>
                  </li>
                  <li>
                    <Link href={"/"}>Sweatshirts</Link>
                  </li>
                  <li>
                    <Link href={"/"}>Jackets</Link>
                  </li>
                  <li>
                    <Link href={"/"}>Denim Jeans</Link>
                  </li>
                  <li>
                    <Link href={"/"}>Shorts</Link>
                  </li>
                </ul>
              </Collapse>
            </div>

            <div className="p-2 bg-secondary">
              <Collapse title="All Filters">
                <div className="flex gap-2">
                  {colorsARray.map((color, index) => {
                    return (
                      <div
                        className={`rounded-full p-1 ${
                          color.colorName === colorName
                            ? " border-2 border-primary"
                            : ""
                        }`}
                        key={index}
                      >
                        <div
                          className={` space-x-2 h-4 w-4 cursor-pointer rounded-full `}
                          style={{ backgroundColor: `#${color.colorName}` }}
                          onClick={() => {
                            setColorName(color.colorName);
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </Collapse>
            </div>
            <div className="p-2 bg-secondary">
              <Collapse title="Filter Price">
                <Slider
                  range={{ draggableTrack: true }}
                  defaultValue={[0, 10]}
                />
              </Collapse>
            </div>
          </div>
          </div>
          <DrawerMenu
            className="float-end"
            width={250}
            title={
              <>
                <div className="flex md:hidden mt-5  underline gap-2 items-center">
                  <IoFunnelOutline size={20} />
                  Filters{" "}
                </div>
              </>
            }
            content={
              <div className="space-y-2">
                <div className="p-2 bg-secondary">
                  <Collapse title="All Categories">
                    <ul className="px-1 pt-2 space-y-1">
                      <li>
                        <Link href={"/"}>Dresses</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Sweatshirts</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Jackets</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Denim Jeans</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Shorts</Link>
                      </li>
                    </ul>
                  </Collapse>
                </div>

                <div className="p-2 bg-secondary">
                  <Collapse title="All Filters">
                    <div className="flex flex-wrap gap-2">
                      {colorsARray.map((color, index) => {
                        return (
                          <div
                            className={`rounded-full p-1 ${
                              color.colorName === colorName
                                ? " border-2 border-primary"
                                : ""
                            }`}
                            key={index}
                          >
                            <div
                              className={` space-x-2 h-4 w-4 cursor-pointer rounded-full `}
                              style={{ backgroundColor: `#${color.colorName}` }}
                              onClick={() => {
                                setColorName(color.colorName);
                              }}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </Collapse>
                </div>
                <div className="p-2 bg-secondary">
                  <Collapse title="Filter Price">
                    <Slider
                      range={{ draggableTrack: true }}
                      defaultValue={[0, 10]}
                    />
                  </Collapse>
                </div>
              </div>
            }
          />
          <div className="w-full md:w-9/12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <Card ProductCard={items} />
            </div>
            <Pagination
              className="text-center rounded-full mt-10"
              defaultCurrent={1}
              total={40}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Product;
