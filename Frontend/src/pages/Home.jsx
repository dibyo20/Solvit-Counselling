import { useState, useEffect } from "react";
import { LogOut, Search, ChevronDown, Filter, Info } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useCounsellors } from "../hooks/useCounsellors";
import { useBooking } from "../hooks/useBooking";
import CounsellorCard from "../components/CounsellorCard";
import BookingModal from "../components/BookingModal";

const Home = () => {
  const { logoutUser } = useAuth();
  const {
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
  } = useCounsellors();

  const [localSearch, setLocalSearch] = useState(searchQuery);

  const bookingController = useBooking();

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSearchQuery(localSearch);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [localSearch]);

  return (
    <div className="dashboard-layout">
      <header className="main-header">
        <div className="header-container">
          <div className="logo-area">
            <img src="/logo.svg" alt="Solvit Logo" />
            <span>Solvit Counselling</span>
          </div>
          <button className="logout-btn" onClick={logoutUser}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="titles-container">
          <h1 className="page-title d-desktop-only">Find your perfect match.</h1>
          <div className="d-mobile-only" style={{ marginBottom: "1.5rem" }}>
            <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
              Expert counselling tailored for your mental wellness journey.
            </p>
          </div>
        </div>

        <section className="filter-section">
          <div className="filter-bar-desktop">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or keyword..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="select-wrapper">
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <option value="All">All Concerns</option>
                {specializations
                  .filter((s) => s !== "All")
                  .map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
              </select>
              <ChevronDown className="select-arrow" />
            </div>

            <div className="select-wrapper">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Recommended">Recommended</option>
                <option value="Highest Rating">Highest Rating</option>
                <option value="Experience">Years of Experience</option>
              </select>
              <ChevronDown className="select-arrow" />
            </div>

            <button className="filter-action-btn" onClick={handleSearchSubmit}>
              Search
            </button>
          </div>

          <div className="filter-bar-mobile">
            <div className="mobile-search">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>

            <div className="mobile-field">
              <span>Specialty</span>
              <div className="mobile-select-wrapper">
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {specializations
                    .filter((s) => s !== "All")
                    .map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                </select>
                <ChevronDown className="select-arrow" />
              </div>
            </div>

            <div className="mobile-field">
              <span>Sort By</span>
              <div className="mobile-select-wrapper">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="Recommended">Recommended</option>
                  <option value="Highest Rating">Highest Rating</option>
                  <option value="Experience">Experience</option>
                </select>
                <ChevronDown className="select-arrow" />
              </div>
            </div>
          </div>
        </section>

        {loadingCounsellors ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading counsellors...</p>
          </div>
        ) : counsellorsError ? (
          <div className="no-results">
            <Info size={32} style={{ color: "#ef4444", marginBottom: "1rem" }} />
            <h3>An error occurred</h3>
            <p>{counsellorsError}</p>
          </div>
        ) : counsellors.length === 0 ? (
          <div className="no-results">
            <Search size={32} style={{ color: "#64748b", marginBottom: "1rem" }} />
            <h3>No matches found</h3>
            <p>Try refining your search keyword or selecting a different category.</p>
          </div>
        ) : (
          <div className="counsellors-grid">
            {counsellors.map((counsellor) => (
              <CounsellorCard
                key={counsellor._id || counsellor.id}
                counsellor={counsellor}
                onBookSession={bookingController.openBooking}
              />
            ))}
          </div>
        )}
      </main>

      <BookingModal
        isOpen={bookingController.isBookingOpen}
        counsellor={bookingController.selectedCounsellor}
        onClose={bookingController.closeBooking}
        bookingController={bookingController}
      />

      <footer style={{ textAlign: "center", padding: "2rem", color: "#64748b", fontSize: "0.85rem" }}>
        &copy; 2026 Solvit Counselling. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
