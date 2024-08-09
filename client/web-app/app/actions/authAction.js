import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
  console.log("--->get session method called");
  try {
    const session = await getServerSession(authOptions);
    console.log("Session fetched:", session);  
    return session;
  } catch (e) {
    console.error("Error fetching session:", e);
    return null;
  }
}

export async function getCurrentUser() {
  console.log("---->getCurrentUser method called");
  try {
    const session = await getSession();
    if (!session) {
      console.log("No session found");
      return null;
    }
    console.log("---->we got the session");
    return session.user;
  } catch (e) {
    console.error("Error in getCurrentUser:", e);
    return null;
  }
}