"use client";
import "animate.css/animate.min.css";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SearchProvider } from "@/context/SearchContext";
import Navbar from "../app/components/nav/Navbar";
import PageWrapper from "../app/components/PageWrapper";
import SearchModal from "@/pages/SearchModal";
import { useSearch } from "@/context/SearchContext";
import { SessionProvider } from "next-auth/react";
import ToasterProvider from "@/app/providers/ToasterProvider";
import Sidebar from "@/app/components/nav/admin/Sidebar";

function App({ children }) {
  return (
    <SessionProvider>
      <SearchProvider>
        <AppContent>{children}</AppContent>
      </SearchProvider>
    </SessionProvider>
  );
}

function AppContent({ children }) {
  const { isSearchOpen, searchResults } = useSearch();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <ToasterProvider />
      {!isAdminRoute && !isLoading && <Navbar />}
      {isSearchOpen && <SearchModal res={searchResults} open={isSearchOpen} />}
      {isAdminRoute && !isLoading && (
        <Sidebar className="fixed w-64 h-screen" />
      )}
      <div className={`flex-1 ${isAdminRoute ? 'ml-64' : ''} overflow-y-auto`}>
        <PageWrapper setLoadingState={setIsLoading}>
          <main className="mx-auto content-below">{children}</main>
        </PageWrapper>
      </div>
    </div>
  );
}

export default App;
