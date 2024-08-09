"use client";
import { useSession } from "next-auth/react";

function Session() {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="bg-blue-200" style={{ marginTop: "200px" }}>
        <h3 className="text-3xl">Session data</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <div className="bg-blue-200">
        <h3 className="text-3xl mt-5">Token data</h3>{" "}
        <pre>{JSON.stringify(session.accessToken, null, 2)}</pre>
      </div>
    </>
  );
}

export default Session;
