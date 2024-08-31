"use server"
import { getToken } from "next-auth/jwt";
import { headers, cookies } from "next/headers";
import { getSession } from "next-auth/react";

export async function getAccessToken() {
  try {
    const req = {
      headers: Object.fromEntries(headers()),
      cookies: Object.fromEntries(cookies().getAll().map((c) => [c.name, c.value])),
    };

    return await getToken({ req });
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
}
