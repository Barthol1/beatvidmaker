"use client";

import Image from "next/image";
import VideoRenderingComponent from "./components/videoRenderingComponent";
import style from "./home.module.css";
import NoSSR from "./noSSR";

export default function Home() {
  return (
    <div>
      <NoSSR><VideoRenderingComponent /></NoSSR>
    </div>
  );
}
