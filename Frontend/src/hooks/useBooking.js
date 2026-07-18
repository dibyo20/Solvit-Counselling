import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context";

export const useBooking = () => {
  const context = useContext(AppContext);
  const {
    user,
    isBookingOpen,
    setIsBookingOpen,
    selectedCounsellor,
    setSelectedCounsellor,
  } = context;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isBookingOpen && user) {
      setFullname(user.fullname || "");
      setEmail(user.email || "");
    }
  }, [isBookingOpen, user]);

  const openBooking = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setIsBookingOpen(true);
    setIsSubmitted(false);
    setValidationError("");
    setDate("");
    setNotes("");
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedCounsellor(null);
    setIsSubmitted(false);
    setValidationError("");
  };

  const submitBooking = (e) => {
    if (e) e.preventDefault();
    setValidationError("");

    if (!fullname.trim()) {
      setValidationError("Full Name is required.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setValidationError("A valid Email Address is required.");
      return;
    }
    if (!date) {
      setValidationError("Preferred Date is required.");
      return;
    }

    setIsSubmitted(true);
    setNotes("");
  };

  return {
    isBookingOpen,
    selectedCounsellor,
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
    openBooking,
    closeBooking,
    submitBooking,
  };
};
