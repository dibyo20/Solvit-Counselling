import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { getCounsellors } from "../services/counsellor.service";

export const useCounsellors = () => {
  const context = useContext(AppContext);
  const {
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
  } = context;

  const fetchCounsellors = async (keyword = "") => {
    setLoadingCounsellors(true);
    setCounsellorsError("");
    try {
      const response = await getCounsellors(keyword);
      setCounsellors(response.data);
    } catch (error) {
      setCounsellorsError(error.message || "Failed to fetch counsellors");
    } finally {
      setLoadingCounsellors(false);
    }
  };

  useEffect(() => {
    fetchCounsellors(searchQuery);
  }, [searchQuery]);

  return {
    counsellors,
    loadingCounsellors,
    counsellorsError,
    searchQuery,
    setSearchQuery,
    selectedSpecialization,
    setSelectedSpecialization,
    sortBy,
    setSortBy,
  };
};
