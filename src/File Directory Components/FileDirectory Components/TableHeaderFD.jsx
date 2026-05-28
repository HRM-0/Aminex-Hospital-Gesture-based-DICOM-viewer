import React from "react";

export default function TableHeaderFD(props) {
  return (
    <div className="view-header">
        <h2 className="view-title" id="current-folder-title">
          {props.folderTitle}
        </h2>
        <span className="view-meta" id="item-count">
          {props.itemCount ? props.itemCount : 0} items
        </span>
      </div>
  );
}
