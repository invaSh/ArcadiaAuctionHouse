// app/api/test-user/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// A helper function to convert a Web Fetch request to a Node.js request
async function getNodeRequestResponse(fetchRequest) {
  const { Readable } = require("stream");
  const url = new URL(fetchRequest.url);
  const body = fetchRequest.body ? Readable.from(fetchRequest.body) : undefined;

  const nodeRequest = {
    ...fetchRequest,
    method: fetchRequest.method,
    headers: fetchRequest.headers,
    url: url.pathname + url.search,
    body,
  };

  // Mocking a basic response object
  const responseHeaders = new Map();
  const nodeResponse = {
    getHeader: (name) => responseHeaders.get(name),
    setHeader: (name, value) => responseHeaders.set(name, value),
    end: () => {},
    headers: responseHeaders,
  };

  return { nodeRequest, nodeResponse };
}

export async function GET(fetchRequest) {
  console.log("API route hit");

  try {
    const { nodeRequest, nodeResponse } = await getNodeRequestResponse(fetchRequest);

    const session = await getServerSession(nodeRequest, nodeResponse, authOptions);

    console.log("Session fetched in API:", session);

    if (session) {
      return NextResponse.json({ user: session.user }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error fetching session in API:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
