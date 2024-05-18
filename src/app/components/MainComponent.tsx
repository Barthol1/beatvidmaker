"use client";

import NoSSR from "../noSSR";
import HeaderComponent from "./HeaderComponent";
import VideoRenderingComponent from "./videoRenderingComponent";

export default function MainComponent() {
  return (
    <body>
      <HeaderComponent />
      <NoSSR>
        <VideoRenderingComponent />
      </NoSSR>
    </body>
  );
}
