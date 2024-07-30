"use client";
import React, { useState } from "react";

import Navbar from "../components/nav/Navbar";
import PageWrapper from "../components/PageWrapper";

function App({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {!isLoading && <Navbar />}
      <PageWrapper setLoadingState={setIsLoading}>
        <main className="mx-auto pt-10">{children}</main>
      </PageWrapper>
    </div>
  );
}

export default App;
