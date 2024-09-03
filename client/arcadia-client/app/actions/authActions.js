"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { headers, cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

export async function getSession() {
    const session = await getServerSession(authOptions);
    return session;
}


export async function getAccessToken() {
    const req = {
        headers: Object.fromEntries(headers()),
        cookies: Object.fromEntries(
            cookies()
                .getAll()
                .map(c => [c.name, c.value])
        )
    }

    return await getToken({req});
}