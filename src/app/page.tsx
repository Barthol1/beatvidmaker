"use client";

import Image from "next/image";
import VideoRenderingComponent from "./components/videoRenderingComponent";
import style from "./home.module.css";

export default function Home() {
  return (
    <div>
      <VideoRenderingComponent />
    </div>
  );
}
