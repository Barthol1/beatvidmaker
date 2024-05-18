"use client";

import NoSSR from "./noSSR";
import HeaderComponent from "./components/HeaderComponent";
import MainComponent from "./components/MainComponent";

export default function Home() {
  return (
    <body>
      <HeaderComponent />
      <NoSSR>
        <MainComponent />
      </NoSSR>
    </body>
  );
}
