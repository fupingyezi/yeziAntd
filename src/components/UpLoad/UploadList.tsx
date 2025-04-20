import React, { memo, useState } from "react";
import classNames from "classnames";
import { UploadFile } from "./Upload";
import Icon from "../Icon/Icon";
import "./Upload.scss";

export interface UploadListProps {
  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
}

const UploadList: React.FC<UploadListProps> = memo(
  ({ fileList, setFileList }) => {
    
    const [hoverUid, setHoverUid] = useState<string | null>(null);

    const handleDelete = (file: UploadFile) => {
      setFileList(fileList.filter((item) => item.uid !== file.uid));
    };

    return (
      <ul className="upload-list">
        {fileList.map((item) => {
          const classesItem = classNames("upload-list-item", {
            "is-uploading": item.status === "uploading",
            "is-success": item.status === "success",
            "is-error": item.status === "error",
          });

          return (
            <li
              key={`${item.name}`}
              className={classesItem}
              onMouseEnter={() => setHoverUid(item.uid)}
              onMouseLeave={() => setHoverUid(null)}
            >
              <Icon icon="link" style={{ marginRight: 10 }}></Icon>
              <p>{item.name}</p>

              <Icon
                icon="trash"
                className="delete"
                style={{ opacity: hoverUid === item.uid ? 1 : 0 }}
                onClick={() => handleDelete(item)}
              ></Icon>
              {item.status === "uploading" && (
                <div className="line">
                  <div
                    className="line-percent"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
);

export default UploadList;
