import { ForgetPassword } from "@/pages/forget-password";
import { RecoveryPassword } from "@/pages/recovery-password";
import { SignIn } from "@/pages/sign-in";
import { SignUp } from "@/pages/sign-up";
import { Navigate, Route, Routes } from "react-router";

export function PublicRoutes(){
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/"/>}/>
      <Route path="/" element={<SignIn />} index/>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forget-password" element={<ForgetPassword />}/>
      <Route path="/recovery-password" element={<RecoveryPassword />}/>
    </Routes>
  )
}