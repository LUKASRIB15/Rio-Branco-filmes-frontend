import { BrowserRouter } from "react-router";
import { RootRoutes } from "./routes";
import { SessionsProvider } from "./contexts/sessions";
import { ThemeProvider } from "./components/theme/theme-provider";

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SessionsProvider>
          <RootRoutes />
        </SessionsProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

