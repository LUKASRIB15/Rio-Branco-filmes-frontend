"use server";

import { CinephileDTO } from "./dto/cinephile";
import { cookies } from "next/headers";

type CreateCinephileAccountRequest = {
  name: string;
  email: string;
  password: string;
};

type CreateCinephileAccountResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      cinephile: CinephileDTO;
    };

export async function createCinephileAccountAction({
  name,
  email,
  password,
}: CreateCinephileAccountRequest): Promise<CreateCinephileAccountResponse> {
  const response = await fetch("http://localhost:3333/cinephiles/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (response.status === 409) {
    const error409 = await response.json();

    return {
      ok: false,
      error: {
        statusCode: error409.statusCode,
      },
    };
  }

  const data = await response.json();

  const appCookies = await cookies();

  appCookies.set("access_token", data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  appCookies.set("user", JSON.stringify(data.cinephile), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return {
    ok: true,
    cinephile: data.cinephile,
  };
}
