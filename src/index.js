import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
import { MediaQueryProvider } from "./context/MediaQueryContext";
import { NotificationProvider } from "./context/NotificationContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FeedbackProvider } from "./context/FeedbackContext";
import { DashboardProvider } from "./context/DashboardContext";
import { FollowerProvider } from "./context/FollowerContext";
import { HelpProvider } from "./context/HelpContext";
import { SocketProvider } from "./context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
      <MediaQueryProvider>
        <UserProvider>
          <DashboardProvider>
            <ProfileProvider>
              <SocketProvider>
                <HelpProvider>
                  <FollowerProvider>
                    <NotificationProvider>
                      <FeedbackProvider>
                        <App />
                      </FeedbackProvider>
                    </NotificationProvider>
                  </FollowerProvider>
                </HelpProvider>
              </SocketProvider>
            </ProfileProvider>
          </DashboardProvider>
        </UserProvider>
      </MediaQueryProvider>
    </BrowserRouter>
  </LocalizationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
