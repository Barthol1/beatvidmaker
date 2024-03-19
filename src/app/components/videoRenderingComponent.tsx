"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { RefObject, useRef, useState } from "react";
import style from "../home.module.css";
import FileUploadComponent from "./fileUploadComponent";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ConvertionSelectorComponent from "./ConvertionSelectorComponent";
import YoutubeFormComponent from "./YoutubeFormComponent";
import { start } from "repl";

export default function VideoRenderingComponent() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<any>(null);
  const videoProgressRef = useRef<any>(null);
  const [messageRef, setMessageRef] = useState("Creating video...");
  const [startConverting, setStartConverting] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [useYoutube, setUseYoutube] = useState(false);
  const audio = useRef<any>(null);
  const video = useRef<any>(null);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("progress", ({ progress, time }) => {
      videoProgressRef.current.innerHTML = `${
        progress * 100
      } % (transcoded time: ${time / 1000000} s)`;
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
    setVideoFinished(true);
    setMessageRef("Video created successfully");
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
        console.log(audio.current, video.current);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const onConvertionSelectorChange = (value: string) => {
    if (value === "youtube") {
      setUseYoutube(true);
    } else {
      setUseYoutube(false);
    }
  };

  const onSubmit = () => {
    if (audio.current && video.current) {
      transcode();
      setStartConverting(true);
    }
  };
  return (
    <div>
      <div className={useYoutube && !startConverting ? "grid grid-cols-4" : ""}>
        <div></div>
        {startConverting ? (
          <div id="converter" className={style.centerfull}>
            <div className="text-center mb-5">
              <h1 className="text-center text-2xl">{messageRef}</h1>
              <h3 className={videoFinished ? "invisible" : "visible"}>
                Do not close this page until complete
              </h3>
            </div>
            <p ref={videoProgressRef}></p>
            <video
              ref={videoRef}
              className={videoFinished ? "visible" : "invisible"}
              controls
            ></video>
            <br />
          </div>
        ) : (
          <div className={style.centerfull}>
            <FileUploadComponent
              onChangesInFileUploader={onChangesInFileUploader}
            />

            <ConvertionSelectorComponent
              onConvertionSelectorChange={onConvertionSelectorChange}
            ></ConvertionSelectorComponent>

            <div className={style.center}>
              <button
                onClick={onSubmit}
                className="p-2 mt-6 border rounded border-black bg-white transition hover:bg-green-500"
              >
                Make video
              </button>
            </div>
          </div>
        )}
        <div
          className={
            useYoutube ? "visible " + style.centerfull : "invisible max-h-0"
          }
        >
          <YoutubeFormComponent></YoutubeFormComponent>
        </div>
      </div>
    </div>
  );
}
