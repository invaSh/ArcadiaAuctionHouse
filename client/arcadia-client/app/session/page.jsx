import React from "react";
import { getSession } from "../actions/authActions";

export default async function Session() {
  const session = await getSession();

  return (
    <div>
      <div className="bg-blue-200 border-2 border-blue-500" style={{ marginTop: "100px"}}>
        <h3 className="text-lg">Session data</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <div className="bg-blue-200 border-2 border-blue-500" style={{ marginTop: "100px"}}>
        <h3 className="text-lg">Access token</h3>
        <pre>Access token: {session.access_token} </pre>
      </div>
    </div>
  );
}
