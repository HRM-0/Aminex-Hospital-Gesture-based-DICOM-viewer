import React from "react";

export default function HeaderFD(props) {
  return (
    <>
      <header className="top-bar">
        <div className="brand">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ fontSize: 24 + "px" }}
            width="24"
            height="24"
            fill="#fff"
            viewBox="0 0 256 256"
          >
            <path d="M136,128v72h11.62A12.25,12.25,0,0,0,160,188.53a12,12,0,0,0-5.93-10.87,4.08,4.08,0,0,1-2.06-3.49v-8.79a4,4,0,0,1,5.25-3.81A28.06,28.06,0,0,1,176,187.71c.16,15.56-13,28.29-28.59,28.29H136v16a8,8,0,0,1-16,0V216H96a8,8,0,0,1-8-8.53A8.17,8.17,0,0,1,96.27,200H120V128H104.46c-8.6,0-16,6.6-16.44,15.19a16,16,0,0,0,12.87,16.51,3.94,3.94,0,0,1,3.11,3.89V172a4,4,0,0,1-4,4,36,36,0,0,1-36-36.87C64.47,119.48,81,104,100.68,104H120V24a8,8,0,0,1,16,0v80h32a16,16,0,0,0,16-16.81C183.56,78.6,176.14,72,167.54,72H156a4,4,0,0,1-4-4V44a4,4,0,0,1,4-4h15.22c24.62,0,45.2,20.15,44.77,44.76A44,44,0,0,1,172,128ZM92.66,72H100a4,4,0,0,0,4-4V44a4,4,0,0,0-4-4H64A40,40,0,0,0,24,80v8a8,8,0,0,0,8,8H56A40,40,0,0,0,92.66,72Z"></path>
          </svg>
          <span style={{ textWrap: "nowrap" }}>Aminex Hospital</span>
        </div>

        <div className="actions">
          {" "}
          <div className="breadcrumbs" id="breadcrumbs">
            {props.breadcrumbs.map((x) => {
              if (x === props.breadcrumbs[props.breadcrumbs.length - 1]) {
                return (
                  <span
                    style={{ textWrap: "nowrap" }}
                    className={"breadcrumb-item current"}
                  >
                    {x}
                  </span>
                );
              } else {
                return (
                  <>
                    <span
                      onClick={() => props.breadcrumbsOnClick(x)}
                      style={{ textWrap: "nowrap" }}
                      className={"breadcrumb-item "}
                    >
                      {x}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      style={{
                        fontSize: 12 + "px",
                      }}
                      fill="#fff"
                      viewBox="0 0 256 256"
                    >
                      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                    </svg>
                  </>
                );
              }
            })}
          </div>
          <div className="search-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#fff"
              viewBox="0 0 256 256" className="search-icon"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search files..."
            />
          </div>
        </div>
      </header>
    </>
  );
}
