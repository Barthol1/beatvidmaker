"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useRef, useState } from "react";
import style from "../home.module.css";
import FileUploadComponent from "./fileUploadComponent";

export default function VideoRenderingComponent() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<any>(null);
  const messageRef = useRef<any>(null);
  const [filesAreLoaded, setFilesAreLoaded] = useState(false);
  const audio = useRef<any>(null);
  const video = useRef<any>(null);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (!messageRef.current) return;
      messageRef.current.innerHTML = message;
      console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
  };

  const transcode = async () => {
    await load();
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile(
      "input.gif",
      await fetchFile(new Blob([video.current], { type: "video/mp4" }))
    );
    await ffmpeg.writeFile(
      "song.mp3",
      await fetchFile(new Blob([audio.current], { type: "audio/mpeg" }))
    );
    //loop the gif for the duration of the mp3
    await ffmpeg.exec([
      "-stream_loop",
      "-1",
      "-i",
      "input.gif",
      "-i",
      "song.mp3",
      "-shortest",
      "output.mp4",
    ]);

    const data = await ffmpeg.readFile("output.mp4");
    if (!videoRef.current) return;
    videoRef.current.src = URL.createObjectURL(
      new Blob([data], { type: "video/mp4" })
    );
  };

  const onChangesInFileUploader = (files: any) => {
    //setFilesAreLoaded(true);
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        if (file.type.includes("audio")) {
          audio.current = binaryStr;
        }
        if (file.type.includes("image")) {
          video.current = binaryStr;
        }
        console.log(file);
      };
      reader.readAsArrayBuffer(file);
      console.log(audio.current, video.current);
      if (audio.current && video.current) {
        setFilesAreLoaded(true);
      }
    });
  };
  return (
    <div className={style.center}>
      <h1>VIDEOMAKER?!!!</h1>
      {filesAreLoaded ? (
        <div id="converter">
          <video ref={videoRef} controls></video>
          <br />
          <button onClick={transcode}>Make video</button>
          <p ref={messageRef}></p>
        </div>
      ) : (
        <div>
          <FileUploadComponent
            onChangesInFileUploader={onChangesInFileUploader}
          />
        </div>
      )}
    </div>
  );
}
