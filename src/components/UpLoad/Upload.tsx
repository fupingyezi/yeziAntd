import React, { ChangeEvent, CSSProperties, useRef, useState } from "react";
import "./Upload.scss";
import Icon from "../Icon/Icon";
import classNames from "classnames";
import Button from "../Button";
import axios from "axios";
import UploadList from "./UploadList";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  className?: string;
  style?: CSSProperties;
}

const Upload: React.FC<UploadProps> = ({
  action,
  beforeUpload,
  onProgress,
  onSuccess,
  onError,
  onChange,
  className,
  style,
}) => {
  const classes = classNames("upload", className);
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleOnclick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    const headers = {
      "Content-Type": "mutipary/form-data",
    };
    axios
      .post(action, formData, {
        headers: headers,
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        if (onSuccess) {
          onSuccess(res.data, file);
          updateFileList(_file, { status: "success", response: res.data });
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((error) => {
        console.log('error:'+error);
        if (onError) {
          onError(error, file);
          updateFileList(_file, { status: "error", response: error });
        }
        if (onChange) {
          onChange(file);
        }
      });
  };

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processFile) => {
            post(processFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  return (
    <div className={classes} style={style}>
      <Button
        btnType="default"
        className="upload-btn"
        onClick={() => handleOnclick()}
      >
        <Icon
          icon="arrow-up-from-bracket"
          theme="dark"
          style={{ marginRight: 10 }}
        ></Icon>
        Click to Upload
        <input
          className="upload-input"
          style={{ display: "none" }}
          type="file"
          ref={fileInput}
          onChange={(e) => handleFileChange(e)}
        ></input>
      </Button>
      <UploadList fileList={fileList} setFileList={setFileList}></UploadList>
    </div>
  );
};

export default Upload;
