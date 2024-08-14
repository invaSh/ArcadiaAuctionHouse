"use client";
import "animate.css/animate.min.css";
import React, { useState } from "react";
import { SearchProvider } from "@/context/SearchContext";
import Navbar from "../app/components/nav/Navbar";
import PageWrapper from "../app/components/PageWrapper";
import SearchModal from "@/pages/SearchModal";
import { useSearch } from "@/context/SearchContext";
import { SessionProvider } from "next-auth/react";
import ToasterProvider from "@/app/providers/ToasterProvider";

function App({ children }) {
  return (
    <SessionProvider>
      <SearchProvider>
        <AppContent children={children} />
      </SearchProvider>
    </SessionProvider>
  );
}

function AppContent({ children }) {
  const { isSearchOpen, searchResults } = useSearch();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <ToasterProvider />
      {!isLoading && <Navbar />}
      {isSearchOpen && <SearchModal res={searchResults} open={isSearchOpen} />}
      <PageWrapper setLoadingState={setIsLoading}>
        <main className="mx-auto content-below">{children}</main>
      </PageWrapper>
    </div>
  );
}

export default App;
