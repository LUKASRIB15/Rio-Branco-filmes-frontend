import { BrowserRouter } from "react-router";
import { RootRoutes } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <RootRoutes />
    </BrowserRouter>
  )
}

