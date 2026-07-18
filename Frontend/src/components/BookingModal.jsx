import React from "react";
import { X, User, Mail, Calendar, MessageSquare, Check, ArrowRight } from "lucide-react";

const BookingModal = ({ isOpen, counsellor, onClose, bookingController }) => {
  if (!isOpen || !counsellor) return null;

  const {
    fullname,
    setFullname,
    email,
    setEmail,
    date,
    setDate,
    notes,
    setNotes,
    isSubmitted,
    validationError,
    submitBooking,
  } = bookingController;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-body">
          <h2 className="modal-title">Book Your Session</h2>
          <p className="modal-subtitle">
            Fill in the details below to schedule your appointment with <strong>{counsellor.name}</strong>.
          </p>

          <form onSubmit={submitBooking}>
            <div className="form-group">
              <label htmlFor="booking-name">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  id="booking-name"
                  placeholder="John Doe"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  disabled={isSubmitted}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="booking-email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="booking-email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitted}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="booking-date">Preferred Date</label>
              <div className="input-wrapper">
                <Calendar className="input-icon" />
                <input
                  type="date"
                  id="booking-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isSubmitted}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="booking-notes">Message/Notes (Optional)</label>
              <div className="input-wrapper">
                <MessageSquare className="input-icon" style={{ top: "12px", transform: "none" }} />
                <textarea
                  id="booking-notes"
                  placeholder="Briefly describe your situation..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={isSubmitted}
                />
              </div>
            </div>

            {validationError && (
              <div className="error-message">
                <span>{validationError}</span>
              </div>
            )}

            {!isSubmitted ? (
              <button type="submit" className="submit-btn">
                <span>Confirm Booking</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <div className="submit-success-alert">
                <Check size={18} />
                <span>Form submitted successfully! Appointment requested.</span>
              </div>
            )}
          </form>

          <p className="modal-footer-notice">
            By clicking confirm, you agree to our <a href="#terms">Terms of Service</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
