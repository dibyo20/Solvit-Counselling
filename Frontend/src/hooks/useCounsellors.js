import { useContext, useEffect, useState } from "react";
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

  const [specializations, setSpecializations] = useState(["All"]);

  // Fetch unique specializations once on mount
  useEffect(() => {
    const fetchAllSpecializations = async () => {
      try {
        const response = await getCounsellors();
        if (response && response.data) {
          const unique = [...new Set(response.data.map((c) => c.specialization))].sort();
          setSpecializations(["All", ...unique]);
        }
      } catch (error) {
        console.error("Failed to fetch specializations:", error);
      }
    };
    fetchAllSpecializations();
  }, []);

  const fetchCounsellors = async (search = "", specialization = "", sort = "") => {
    setLoadingCounsellors(true);
    setCounsellorsError("");
    try {
      const response = await getCounsellors(search, specialization, sort);
      setCounsellors(response.data);
    } catch (error) {
      setCounsellorsError(error.message || "Failed to fetch counsellors");
    } finally {
      setLoadingCounsellors(false);
    }
  };

  useEffect(() => {
    fetchCounsellors(searchQuery, selectedSpecialization, sortBy);
  }, [searchQuery, selectedSpecialization, sortBy]);

  return {
    counsellors,
    loadingCounsellors,
    counsellorsError,
    searchQuery,
    setSearchQuery,
    specializations,
    selectedSpecialization,
    setSelectedSpecialization,
    sortBy,
    setSortBy,
  };
};
