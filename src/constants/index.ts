import React from "react";

import { FiSun } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";
import { GoDeviceDesktop } from "react-icons/go";
import { TbMovie } from "react-icons/tb";

import { themeTypes, navLinkType } from "../types";

export const navLinks: navLinkType[] = [
  {
    title: "movies",
    path: "/",
    icon: TbMovie,
  },
];

export const themeOptions: themeTypes[] = [
  {
    title: "Dark",
    icon: BsMoonStarsFill,
  },
  {
    title: "Light",
    icon: FiSun,
  },
  {
    title: "System",
    icon: GoDeviceDesktop,
  },
];


export const footerLinks = [
];


export const sections = [
]