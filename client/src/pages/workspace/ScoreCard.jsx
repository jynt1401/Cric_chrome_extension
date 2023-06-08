import React from "react";
import Title from "../Title";
import Home from "../Home";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import MainWorkArea from "./MainWorkArea";
import { useLocation } from "react-router-dom";
import data from "../../Data/Score.json";

export default function ScoreCard() {
  const { state } = useLocation();
  const id = state;
  console.log(id);

  const url =
    "https://api.cricapi.com/v1/cricScore?apikey=e83f1f64-aeaf-45d0-9f1f-4b1913679326";

  const [Match, setMatch] = useState(undefined);

  useEffect(() => {
    axios
      .get(url, {
        AccessControlAllowMethods: "GET, DELETE, HEAD, OPTIONS",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        AccessControlAllowOrigin: "*",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setMatch(response.data.data);
        // setMatch([1,2,3,4,5,6]);
      });
  }, []);

  console.log(Match);
  console.log(data.data);
  var liveMatch;

  const getFilteredItem = (item) => {
    return item.filter((val) => {
      if (val.id === id) {
        return true;
      }
    });
  };
  console.log(typeof Match);
  console.log(Match);
  if (Match !== undefined) {
    //   filter to get live matches from all matches
    console.log("hi");
    liveMatch = getFilteredItem(Match).reverse();
  } else {
    console.log("hi*/*9846");
    liveMatch = getFilteredItem(data.data).reverse();
  }

  console.log(liveMatch[0]);

  const t1img = liveMatch[0].t1img;
  const t2img = liveMatch[0].t2img;
  var t1 = liveMatch[0].t1.slice(0, liveMatch[0].t1.indexOf("["));
  var t2 = liveMatch[0].t2.slice(0, liveMatch[0].t2.indexOf("["));

  var t11 = liveMatch[0].t1.slice(
    liveMatch[0].t1.indexOf("[") + 1,
    liveMatch[0].t1.indexOf("]")
  );
  var t22 = liveMatch[0].t2.slice(
    liveMatch[0].t2.indexOf("[") + 1,
    liveMatch[0].t2.indexOf("]")
  );
  console.log(t1);
  console.log(t2);
  console.log(liveMatch[0].t2s.length);

  return (
    <>
      <div className="bg-white p-3 mt-6 rounded-md m-3">
        <div className="font-bold mt-2">
          {t1} vs {t2}
        </div>

        <div className="text-[15px] font-semibold text-center">
          {liveMatch[0].matchType}
        </div>
        <div className="flex justify-between mx-2">
          <div className="w-[40%] ">
            <div className="flex ">
              <div className=" mt-5">
                <div
                  className="w-[40px] h-[30px] bg-cover bg-center mr-[2px]"
                  style={{ backgroundImage: `url(${t1img})` }}
                ></div>
                <div className="text-[12px] text-left ml-2 font-semibold">
                  {t11}
                </div>
              </div>
              <div className="text-[15px] w-[60px] mt-5 font-medium text-[#404040] ">
                {liveMatch[0].t1s}
              </div>
            </div>
          </div>
          <div className="w-[40%] ">
            <div className="flex justify-end ">
              <div className="text-[15px] mt-5 w-[60px] font-medium text-[#404040] ">
                {liveMatch[0].t2s.length === 0 ? (
                  <div>-</div>
                ) : (
                  <div>{liveMatch[0].t2s}</div>
                )}
              </div>
              <div className=" mt-5">
                <div
                  className="w-[40px] h-[30px] bg-cover bg-center mr-[2px]"
                  style={{ backgroundImage: `url(${t2img})` }}
                ></div>
                <div className="text-[12px] text-left ml-2 font-semibold">
                  {t22}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[15px] font-medium mt-8 text-[#4a4a4a] ">
          {liveMatch[0].status}
        </div>
      </div>
    </>
  );
}
