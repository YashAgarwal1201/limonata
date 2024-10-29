import { Suspense } from "react";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import Router from "./Routes/routes.tsx";
import { AppContextProvider } from "./Services/AppContext.tsx";
import { MsgAppContextProvider } from "./Services/MessagesContextAndInterfaces/MessagesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <MsgAppContextProvider>
      <Suspense
        fallback={
          <div className="w-screen h-screen bg-color1 text-color1">
            Loading...
          </div>
        }
      >
        <RouterProvider router={Router} />
      </Suspense>
    </MsgAppContextProvider>
  </AppContextProvider>
);
