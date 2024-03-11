"use client";

import Image from "next/image";
import VideoRenderingComponent from "./components/videoRenderingComponent";
import style from "./home.module.css";
import NoSSR from "./noSSR";

export default function Home() {
  return (
    <body>
      <h1 className="text-2xl m-2">TunesToTube Clone</h1>
      <NoSSR><VideoRenderingComponent /></NoSSR>
    </body>
  );
}
