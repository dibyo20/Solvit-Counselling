import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [counsellors, setCounsellors] = useState([]);
  const [loadingCounsellors, setLoadingCounsellors] = useState(false);
  const [counsellorsError, setCounsellorsError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);

  const value = {
    user,
    setUser,
    authLoading,
    setAuthLoading,

    counsellors,
    setCounsellors,
    loadingCounsellors,
    setLoadingCounsellors,
    counsellorsError,
    setCounsellorsError,

    searchQuery,
    setSearchQuery,
    selectedSpecialization,
    setSelectedSpecialization,
    sortBy,
    setSortBy,

    isBookingOpen,
    setIsBookingOpen,
    selectedCounsellor,
    setSelectedCounsellor,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
