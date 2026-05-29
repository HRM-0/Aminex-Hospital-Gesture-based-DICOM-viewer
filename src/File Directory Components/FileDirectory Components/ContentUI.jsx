import React from "react";
import TableBodyRowFD from "./TableBodyRowFD";
import TableHeaderFD from "./TableHeaderFD";
import HeaderFD from "./HeaderFD";
import FileSystem from "./FileSystem.json";

export default function ContentUI() {
  var key = 0;
  const [url, setUrl] = React.useState([FileSystem[0]]);
  // initialize breadcrumb list from initial url to avoid setting state inside useEffect
  const [urlList, setUrlList] = React.useState([FileSystem[0].name]);
  function handleEnter(type, id) {
    if (type === "folder") {
      const index = url[url.length - 1].children.findIndex(
        (item) => item.id === id,
      );
      if (index > -1) {
        const newUrl = url[url.length - 1].children[index];
        setUrl((link) => [...link, newUrl]);
        setUrlList((prev) => [
          ...prev,
          url[url.length - 1].children[index].name,
        ]);
      }
    }
  }

  function handleReturn(x) {
    const index = urlList.findIndex((name) => name === x);

    if (index > -1) {
      // Slice the url array to go back to the clicked breadcrumb level
      const newUrl = url.slice(0, index + 1);
      const newUrlList = urlList.slice(0, index + 1);

      setUrl(newUrl);
      setUrlList(newUrlList);
    }
  }
  return (
    <main className="main-content">
      <HeaderFD breadcrumbsOnClick={handleReturn} breadcrumbs={urlList} />
      <div className="file-view-container" id="main-scroll">
        <TableHeaderFD folderTitle={url[url.length - 1].name} />

        <div id="content-area" className="fade-in">
          <table className="list-view-table">
            <thead className="list-header">
              <tr>
                <th style={{ width: 40 + "%" }}>Name</th>
                <th style={{ width: 20 + "%" }}>Date Modified</th>
                <th style={{ width: 15 + "%" }}>Size</th>
                <th style={{ width: 15 + "%" }}>Kind</th>
              </tr>
            </thead>
            <tbody>
              {url[url.length - 1].children.length > 0
                ? url[url.length - 1].children.map((x) => {
                    let key2 = key++;
                    return (
                      <TableBodyRowFD
                        handleEnter={handleEnter}
                        id={x.id}
                        name={x.name}
                        type={x.type}
                        size={x.size}
                        date={x.date}
                        key={key2}
                      />
                    );
                  })
                : null}
            </tbody>
          </table>
          {url[url.length - 1].children.length > 0 ? null : (
            <div
              style={{
                flexDirection: "column",
                alignItems: "center",
                display: "flex",
                padding: 80 + "px " + 0,
                color: "var(--text-muted)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                style={{ fontSize: 48 + "px", marginBottom: "16px" }}
                height="48"
                fill="#fff"
                viewBox="0 0 256 256"
              >
                <path d="M96,208a8,8,0,0,1-8,8H39.38A15.4,15.4,0,0,1,24,200.62V192a8,8,0,0,1,16,0v8H88A8,8,0,0,1,96,208Zm64-8H128a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm64-56a8,8,0,0,0-8,8v48H200a8,8,0,0,0,0,16h16.89A15.13,15.13,0,0,0,232,200.89V152A8,8,0,0,0,224,144Zm-8-72H168a8,8,0,0,0,0,16h48v24a8,8,0,0,0,16,0V88A16,16,0,0,0,216,72ZM24,80V56A16,16,0,0,1,40,40H92.69A15.86,15.86,0,0,1,104,44.69l29.66,29.65A8,8,0,0,1,128,88H32A8,8,0,0,1,24,80Zm16-8h68.69l-16-16H40Zm-8,88a8,8,0,0,0,8-8V120a8,8,0,0,0-16,0v32A8,8,0,0,0,32,160Z"></path>
              </svg>

              <p>This folder is empty</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
