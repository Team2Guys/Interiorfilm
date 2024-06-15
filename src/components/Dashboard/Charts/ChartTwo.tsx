'use client'

import { ApexOptions } from "apexcharts";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Cookies from 'js-cookie';
import { useAppSelector } from "components/Others/HelperRedux";
let colorArray =  ["#80CAEE", "#3C50E0",]

const options: ApexOptions = {
  colors:colorArray ,
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ["S", "M", "T", "W", "T", "F", "S",],
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface DataType {
  day: string;
  totalProductCount: number;
}

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartTwo: React.FC = () => {
  const { loggedInUser }: any = useAppSelector(state => state.usersSlice);

  const [state, setState] = useState<ChartTwoState | undefined>();
  let AdminType= loggedInUser && loggedInUser.role =="super-Admin"

  if(AdminType){
    colorArray.unshift("#336699")
  }

  const getWeeklySales = async () => {
    try {
      const token = Cookies.get('2guysAdminToken');
      const superAdmintoken = Cookies.get('superAdminToken');
      let finaltoken = token ? token : superAdmintoken;
  
      let response: any = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/getWeeklySales`, {
        headers: {
          "token": finaltoken
        }
      });
  
      let reports = response.data.WeeklyRecord;
      const keys = ["Revenue", "Sales"];
  
      if (AdminType) {
        keys.unshift("Profit");
      }
  
      let defaultArray = reports.map((item: any) => {
        let nameFlag = item.name === 'Sales' ? "totalProductCount" : item.name === 'Profit' ? "totalProfit" : "totalRevenue";
  
        // Only include "Profit" if AdminType is true
        if (item.name === 'Profit' && !AdminType) {
          return null; // Skip this item
        } else {
          return {
            name: item.name,
            data: item.data.map((count: any) => count[nameFlag])
          };
        }
      });
  
      // Filter out null entries if AdminType is false (to exclude "Profit")
      defaultArray = defaultArray.filter((item:any) => item !== null);
  
      setState({ series: defaultArray });
    } catch (err: any) {
      console.log(err, "err");
    }
  }
  
  useLayoutEffect(()=>{
  getWeeklySales()
},[])


  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
         
            {AdminType ? "Sales, Revenue and Profit " : "Sales And Revenue "}
               </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">

            <p className="inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none text-black dark:text-white"> Previous Week</p>

          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          {state ?
            <ReactApexChart
              options={options}
              series={state.series}
              type="bar"
              height={350}
              width={"100%"}
            />
            : null}
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
