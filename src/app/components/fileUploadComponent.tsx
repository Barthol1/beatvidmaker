"use client";

import React, { RefObject, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../home.module.css";

export default function FileUploadComponent(props: any) {
  const [audioLoaded, setAudioLoaded] = useState("❌");
  const [videoLoaded, setVideoLoaded] = useState("❌");
  const onDrop = useCallback(
    (files: File[]) => {
      props.onChangesInFileUploader(files);
      files.forEach((file) => {
        if (file.type.includes("image")) {
          setVideoLoaded("✅");
          console.log("video loaded");
        } else if (file.type === "audio/mpeg") {
          setAudioLoaded("✅");
        }
      });
    },
    [props]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 2,
  });

  return (
    <div>
      <div {...getRootProps()} className={styles.upload}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Upload file</p>}
      </div>
      <div className={styles.center}>
        <p>Audio: {audioLoaded}</p>
        <p>Video: {videoLoaded}</p>
      </div>
    </div>
  );
}
