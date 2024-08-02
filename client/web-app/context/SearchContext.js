import React, { createContext, useContext, useState, useEffect } from "react";

const defaultContextValue = {
  isSearchOpen: false,
  openSearch: () => {},
  closeSearch: () => {},
  searchResults: [],
  setSearchData: () => {},
};

const SearchContext = createContext(defaultContextValue);

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log("Updated isSearchOpen:", isSearchOpen);
  }, [isSearchOpen]);

  const openSearch = () => {
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const setSearchData = (data) => {
    setSearchResults(data);
    openSearch();
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        openSearch,
        closeSearch,
        searchResults,
        setSearchData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
