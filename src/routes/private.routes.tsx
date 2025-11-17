import { Home } from "@/pages/home";
import { RecoveryPassword } from "@/pages/recovery-password";
import { Route, Routes } from "react-router";

export function PrivateRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recovery-password" element={<RecoveryPassword />}/>
    </Routes>
  )
}