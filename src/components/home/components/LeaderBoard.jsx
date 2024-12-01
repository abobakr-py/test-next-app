"use client";
import { useState } from "react";
import { styled } from "@mui/material/styles";

import profile from "@/assets/HomePage/leaderboard/profile.png";
import Image from "next/image";
import { FormControlLabel, Switch } from "@mui/material";
import Charts from "./Charts";
const LeaderBoard = () => {
  const MaterialUISwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& .MuiSwitch-thumb": {
          backgroundColor: theme.palette.mode === "dark" ? "#E9C237" : "#fff",
          "&:before": {
            content: "'✔'",
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%",
            fontSize: "12px",
            textAlign: "center",
            lineHeight: "22px",
            color: "#E9C237",
          },
        },
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#E9C237" : "#E9C237",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#E9C237",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
      position: "relative", // Necessary for the checkmark positioning
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <div className="flex items-center h-[27.25rem] gap-12 mb-12">
      <div className="w-1/3 p-8 bg-white">
        <p>Leaderboard</p>
        <Image src={profile} alt="profile" className="mx-auto mt-8 mb-6" />
        <div className="flex items-center bg-[#FBF3D7] rounded-xl p-3 gap-2 mb-6">
          <p className="px-[0.719rem] py-[0.375rem] text-[#E9C237] text-sm bg-[#F6E7AF] rounded-md">
            6
          </p>
          <p className="text-sm text-[#4c4c4c]">Your Current Rank</p>
          <p className="text-[#E9C237] text-sm ml-auto">+1.2%</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#666666] mb-2">Sharing Your Info</p>
            <p className="text-xs text-[#999999]">
              Make your information visible to other users on the leaderboard.
            </p>
          </div>
          <FormControlLabel
            className="ml-2"
            control={<MaterialUISwitch defaultChecked />}
          />
        </div>
      </div>
      <div className="   w-2/3 h-full rounded-xl p-2">
        <Charts className={'h-[27.25rem] rounded-3xl'}/>
      </div>
    </div>
  );
};

export default LeaderBoard;
