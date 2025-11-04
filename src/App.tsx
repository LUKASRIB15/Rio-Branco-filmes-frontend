import { BrowserRouter } from "react-router";
import { RootRoutes } from "./routes";
import { SessionsProvider } from "./contexts/sessions";

export function App() {
  return (
    <BrowserRouter>
      <SessionsProvider>
        <RootRoutes />
      </SessionsProvider>
    </BrowserRouter>
  )
}

