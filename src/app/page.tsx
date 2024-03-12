"use client";

import Image from "next/image";
import VideoRenderingComponent from "./components/videoRenderingComponent";
import style from "./home.module.css";
import NoSSR from "./noSSR";
import LoginComponent from "./components/LoginComponent";
import HeaderComponent from "./components/HeaderComponent";

export default function Home() {
  return (
    <body>
      <HeaderComponent />
      <NoSSR><VideoRenderingComponent /></NoSSR>
    </body>
  );
}
