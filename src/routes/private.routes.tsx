import { Home } from "@/pages/home";
import { Route, Routes } from "react-router";

export function PrivateRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}