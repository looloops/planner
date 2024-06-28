import React, { useEffect } from "react";

const SideBar: React.FC = () => {
  useEffect(() => {
    const tabs = document.querySelectorAll<HTMLElement>(".tab");
    const indicator = document.querySelector<HTMLElement>(".indicator-div");

    tabs.forEach((tab) => {
      const radio = tab.querySelector<HTMLInputElement>("input[type='radio']");
      radio?.addEventListener("change", () => {
        const rect = tab.getBoundingClientRect();
        const sidebarContainer = document.querySelector(".sidebar_container");
        const containerRect = sidebarContainer?.getBoundingClientRect();
        if (indicator && containerRect) {
          indicator.style.top = `${rect.top - containerRect.top}px`;
        }
      });

      if (radio?.checked) {
        const rect = tab.getBoundingClientRect();
        const sidebarContainer = document.querySelector(".sidebar_container");
        const containerRect = sidebarContainer?.getBoundingClientRect();
        if (indicator && containerRect) {
          indicator.style.top = `${rect.top - containerRect.top}px`;
          indicator.style.right = `-1px`;
        }
      }
    });
  }, []);

  return (
    <div className="sidebar_container">
      <div>
        <div className="tab">
          <input type="radio" name="group" id="home" defaultChecked />
          <label htmlFor="home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-grid-1x2-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z" />
            </svg>
          </label>
        </div>
        <div className="tab">
          <input type="radio" name="group" id="schedule" />
          <label htmlFor="schedule">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-journal-bookmark-fill"
              viewBox="0 0 16 16"
            >
              <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
            </svg>
          </label>
        </div>
        <div className="tab">
          <input type="radio" name="group" id="weather" />
          <label htmlFor="weather">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-brightness-high-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
            </svg>
          </label>
        </div>
        <div className="tab">
          <input type="radio" name="group" id="media" />
          <label htmlFor="media">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-book-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.309 8.985.936 8 1.783" />
            </svg>
          </label>
        </div>
        <div className="indicator-div">
          {/* <div className="before"></div> */}
          <div className="indicator"></div>
          {/* <div className="after"></div> */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
