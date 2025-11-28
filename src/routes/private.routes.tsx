import { Analytics } from "@/pages/analytics";
import { Catalog } from "@/pages/catalog";
import { Diary } from "@/pages/diary";
import { WatchList } from "@/pages/watch-list";
import { Navigate, Route, Routes } from "react-router";

export function PrivateRoutes(){
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/catalog" />} />
      <Route path="/catalog" element={<Catalog />}/>
      <Route path="/diary" element={<Diary />}/>
      <Route path="/watch-list" element={<WatchList />} />
      <Route path="/analytics" element={<Analytics/>} />
    </Routes>
  )
}