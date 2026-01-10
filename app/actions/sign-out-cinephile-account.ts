"use server";
import { cookies } from "next/headers";

export async function signOutCinephileAccountAction() {
  const appCookies = await cookies();

  appCookies.delete("access_token");
}
