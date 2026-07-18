import { useContext, useEffect, useMemo } from "react";
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

  // Derive unique specializations from the fetched list
  const specializations = useMemo(() => {
    const unique = [...new Set(counsellors.map((c) => c.specialization))].sort();
    return ["All", ...unique];
  }, [counsellors]);

  // Apply specialization filter + sort client-side
  const displayedCounsellors = useMemo(() => {
    let list = [...counsellors];

    // Filter by specialization
    if (selectedSpecialization && selectedSpecialization !== "All") {
      list = list.filter(
        (c) =>
          c.specialization.toLowerCase() === selectedSpecialization.toLowerCase()
      );
    }

    switch (sortBy) {
      case "Highest Rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "Experience":
        list.sort((a, b) => b.experience - a.experience);
        break;
      default:
        break;
    }

    return list;
  }, [counsellors, selectedSpecialization, sortBy]);

  return {
    counsellors: displayedCounsellors,
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
