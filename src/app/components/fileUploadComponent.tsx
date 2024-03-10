"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../home.module.css";

export default function FileUploadComponent(props: any) {
  const onDrop = useCallback((files: any) => {
    props.onChangesInFileUploader(files);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 2,
  });

  return (
    <div {...getRootProps()} className={styles.upload}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Upload file</p>}
    </div>
  );
}
