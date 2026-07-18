import React from "react";
import { Star, Calendar, Clock } from "lucide-react";

const CounsellorCard = ({ counsellor, onBookSession }) => {
  const reviewsCount = ((counsellor.name.charCodeAt(0) * 13) % 150) + 40;

  const getCertification = (specialization) => {
    switch (specialization.toLowerCase()) {
      case "anxiety":
        return "CBT Certified";
      case "career":
        return "NLP Master";
      case "relationship":
        return "Family Therapist";
      case "stress":
        return "Mindfulness Practitioner";
      default:
        return "Certified Counsellor";
    }
  };

  const isAvailableToday = (availabilityStr) => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const currentDay = days[new Date().getDay()];
    
    const lowercaseAv = availabilityStr.toLowerCase();
    if (lowercaseAv.includes("everyday")) return true;
    if (lowercaseAv.includes(currentDay)) return true;
    
    if (currentDay === "sat" || currentDay === "sun") {
      return lowercaseAv.includes("weekend") || lowercaseAv.includes("sat") || lowercaseAv.includes("sun");
    }
    return false;
  };

  const available = isAvailableToday(counsellor.availability);

  return (
    <div className="counsellor-card">
      <div>
        <div className="card-header">
          <div className="avatar-wrapper">
            <img src={counsellor.image} alt={counsellor.name} />
            <span className="online-dot"></span>
          </div>
          <div className="rating-box">
            <div className="stars">
              <Star className="star-icon" />
              <span>{counsellor.rating}</span>
            </div>
            <span className="reviews-count">({reviewsCount} reviews)</span>
          </div>
        </div>

        <div className="counsellor-info">
          <h3>{counsellor.name}</h3>
          <p className="specialization-text">{counsellor.specialization} Expert</p>
          
          <div className="tags-container">
            <span className="tag-badge">{counsellor.experience} yrs exp</span>
            <span className="tag-badge">{getCertification(counsellor.specialization)}</span>
          </div>

          <div
            className={`availability-indicator ${
              available ? "available-today" : "available-later"
            }`}
          >
            <Calendar className="status-icon" />
            <span>
              {available
                ? "Available Today"
                : `Schedule: ${counsellor.availability.split("(")[0]}`}
            </span>
          </div>

          <p className="bio-snippet">
            Compassionate care specializing in helping individuals navigate life's transitions, manage {counsellor.specialization.toLowerCase()} and stress, and find clarity through tailored psychological therapy sessions.
          </p>
        </div>
      </div>

      <div className="card-footer">
        <div className="price-info">
          <span className="label">Fee starting at</span>
          <span className="price">₹{counsellor.sessionFee}/hr</span>
        </div>
        <button className="book-btn" onClick={() => onBookSession(counsellor)}>
          Book Session
        </button>
      </div>
    </div>
  );
};

export default CounsellorCard;
