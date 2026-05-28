import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TableBodyRowFD(props) {
  const handleKeyDown = (event) => {
    // Allows keyboard users to trigger the link using Enter or Space
    if (event.key === "Enter" || event.key === " ") {
      props.handleEnter(props.type, props.id);
    }
  };
 const navigate = useNavigate();
  return (
    <>
      {props.type === "folder" ? (
        <tr
          className={"list-row "}
          id={props.id}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onDoubleClick={() => props.handleEnter(props.type, props.id)}
        >
          <td className="list-cell list-name-cell">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z"></path>
            </svg>
            <span>{props.name}</span>
          </td>
          <td className="list-cell muted">{props.date ? props.date : "--"}</td>
          <td className="list-cell muted">{props.size ? props.size : "--"}</td>
          <td
            className="list-cell muted"
            style={{ textTransform: "capitalize", color: "var(--text-main)" }}
          >
            {props.type}
          </td>
        </tr>
      ) : (
          <tr
            className={"list-row "}
            id={props.id}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onDoubleClick={() => navigate("/Gesture_based_DICOM_viewer")}
          >
            <td className="list-cell list-name-cell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#fff"
                viewBox="0 0 256 256"
              >
                <path d="M240,128a8,8,0,0,1-8,8H204.94l-37.78,75.58A8,8,0,0,1,160,216h-.4a8,8,0,0,1-7.08-5.14L95.35,60.76,63.28,131.31A8,8,0,0,1,56,136H24a8,8,0,0,1,0-16H50.85L88.72,36.69a8,8,0,0,1,14.76.46l57.51,151,31.85-63.71A8,8,0,0,1,200,120h32A8,8,0,0,1,240,128Z"></path>
              </svg>
              <span>{props.name}</span>
            </td>
            <td className="list-cell muted">
              {props.date ? props.date : "--"}
            </td>
            <td className="list-cell muted">
              {props.size ? props.size : "--"}
            </td>
            <td
              className="list-cell muted"
              style={{ textTransform: "capitalize", color: "var(--text-main)" }}
            >
              {props.type}
            </td>
          </tr>
      )}
    </>
  );
}
