// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import psychiatristImg from "../assets/images/Doc 1.webp";
// import psychologistImg from "../assets/images/Doc6.jpg";
// import therapistImg from "../assets/images/Doc 3.jpg";
// import counselorImg from "../assets/images/Doc 4.webp";
// import neuropsychiatristImg from "../assets/images/Doc5.avif";
// import socialWorkerImg from "../assets/images/Doc 2.webp";

// const doctors = [
//   {
//     id: 1,
//     image: psychiatristImg,
//     name: "Dr. Mark Okwena",
//     specialty: "Psychiatrist",
//     description:
//       "A psychiatrist is a medical doctor specializing in diagnosing, treating, and preventing mental illnesses. They can prescribe medication and provide therapy.",
//   },
//   {
//     id: 2,
//     image: psychologistImg,
//     name: "Dr. Celestina Kweyu",
//     specialty: "Psychologist",
//     description:
//       "A psychologist helps patients understand and manage mental health conditions using talk therapy, behavioral therapy, and psychological assessments.",
//   },
//   {
//     id: 3,
//     image: therapistImg,
//     name: "Dr. Faith Ndungwa",
//     specialty: "Therapist",
//     description:
//       "Therapists provide support and coping strategies for various mental health challenges, including stress, trauma, and relationship issues.",
//   },
//   {
//     id: 4,
//     image: counselorImg,
//     name: "Dr. Cyrus Kimutai",
//     specialty: "Licensed Counselor",
//     description:
//       "A licensed counselor offers therapy and guidance for individuals dealing with anxiety, depression, and emotional struggles.",
//   },
//   {
//     id: 5,
//     image: neuropsychiatristImg,
//     name: "Dr. Riyan Moraa",
//     specialty: "Neuropsychiatrist",
//     description:
//       "Neuropsychiatrists specialize in the link between mental health and brain disorders, treating conditions like schizophrenia and dementia.",
//   },
//   {
//     id: 6,
//     image: socialWorkerImg,
//     name: "Dr. Christine Monyancha",
//     specialty: "Clinical Social Worker",
//     description:
//       "A clinical social worker provides therapy and connects patients with community resources to improve mental well-being.",
//   },
// ];

// // Store booked time slots in localStorage
// const getBookedSlots = () => {
//   const today = new Date().toDateString();
//   const savedSlots = JSON.parse(localStorage.getItem("bookedSlots") || "{}");

//   // Reset booked slots every new day
//   if (savedSlots.date !== today) {
//     localStorage.setItem(
//       "bookedSlots",
//       JSON.stringify({ date: today, slots: [] })
//     );
//     return [];
//   }

//   return savedSlots.slots || [];
// };

// interface BookedSlots {
//   date: string;
//   slots: string[];
// }

// const updateBookedSlots = (newSlot: string): void => {
//   const today = new Date().toDateString();
//   const savedSlots: BookedSlots = JSON.parse(localStorage.getItem("bookedSlots") || "{}");

//   const updatedSlots: BookedSlots = {
//     date: today,
//     slots: [...(savedSlots.slots || []), newSlot],
//   };

//   localStorage.setItem("bookedSlots", JSON.stringify(updatedSlots));
// };

// const getNextDayValidTimeSlots = () => {
//   const timeSlots = [];
//   for (let hour = 8; hour < 17; hour++) {
//     if (hour < 12 || hour >= 14) {
//       timeSlots.push(`${hour}:00`);
//     }
//   }
//   return timeSlots;
// };

// const BookPayment: React.FC = () => {
//   const navigate = useNavigate();
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
//   const [amount] = useState(50);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
//   const [timeSlots, setTimeSlots] = useState<string[]>([]);

//   useEffect(() => {
//     const allSlots = getNextDayValidTimeSlots();
//     const bookedSlots = getBookedSlots();
//     const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));
//     setTimeSlots(availableSlots);
//   }, []);

//   const handlePayment = async () => {
//     if (!phoneNumber.trim() || !selectedTimeSlot) {
//       alert("Please enter a valid phone number and select a time slot.");
//       return;
//     }

//     const paymentData = {
//       phoneNumber,
//       amount,
//       referenceCode: selectedDoctor.name,
//       description: selectedDoctor.specialty,
//       appointmentDate: new Date().toISOString().split("T")[0],
//       appointmentTime: selectedTimeSlot,
//     };

//     try {
//       const response = await fetch("http://localhost:8000/api/mpesa/initiate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) {
//         throw new Error("Payment failed. Please try again.");
//       }

//       alert("Payment successful!");

//       // Mark the time slot as booked
//       updateBookedSlots(selectedTimeSlot);

//       navigate("/confirmation", {
//         state: {
//           doctor: selectedDoctor,
//           date: paymentData.appointmentDate,
//           time: selectedTimeSlot,
//         },
//       });
//     } catch (error) {
//       alert(error instanceof Error ? error.message : "Network error. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 mt-10 border rounded-lg shadow-lg bg-white">
//       <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Confirm Payment</h2>

//       <label className="block font-medium text-gray-700 mb-2">Select a Doctor</label>
//       <select
//         title="Select a Doctor"
//         value={selectedDoctor.id}
//         onChange={(e) =>
//           setSelectedDoctor(doctors.find((doc) => doc.id === Number(e.target.value)) || doctors[0])
//         }
//         className="w-full p-3 border rounded-md mb-5"
//       >
//         {doctors.map((doctor) => (
//           <option key={doctor.id} value={doctor.id}>
//             {doctor.name} - {doctor.specialty}
//           </option>
//         ))}
//       </select>

//       <label className="block font-medium text-gray-700 mb-2">Select Time Slot</label>
//       <select
//         title="Select Time Slot"
//         value={selectedTimeSlot}
//         onChange={(e) => setSelectedTimeSlot(e.target.value)}
//         className="w-full p-3 border rounded-md mb-5"
//       >
//         <option value="" disabled>Select a time</option>
//         {timeSlots.map((slot, index) => (
//           <option key={index} value={slot}>{slot}</option>
//         ))}
//       </select>

//       <label className="block font-medium text-gray-700 mb-2">Enter Phone Number</label>
//       <input
//         type="text"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//         placeholder="Enter phone number"
//         className="w-full p-3 border rounded-md mb-5"
//       />

//       <button
//         onClick={handlePayment}
//         className="w-full py-3 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700"
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// };

// export default BookPayment;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMobileAlt, FaLock, FaCalendarAlt, FaClock, FaUserMd } from "react-icons/fa";

// Removed unused Doctor interface

const BookPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure location.state is destructured safely
  const { doctor, sessionFee } = location.state || { doctor: null, sessionFee: 0 };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  if (!doctor) {
    navigate('/'); // Redirect to home or an appropriate page if doctor data is missing
    return null;
  }

  // Generate time slots (9AM-5PM with 2-hour slots)
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour += 2) {
    timeSlots.push(`${hour}:00 - ${hour + 2}:00`);
  }

  const handlePayment = async () => {
    if (!phoneNumber.trim() || !selectedDate || !selectedTime) {
      setPaymentError("Please fill all fields");
      return;
    }

    if (!phoneNumber.match(/^07[0-9]{8}$/)) {
      setPaymentError("Please enter a valid M-Pesa number (07XXXXXXXX)");
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    try {
      // Simulate API call to M-Pesa
      const paymentData = {
        phoneNumber: `254${phoneNumber.substring(1)}`,
        amount: sessionFee,
        reference: `THERAPY-${doctor.name.split(' ')[1]}`,
        date: selectedDate,
        time: selectedTime,
        doctorId: doctor.id
      };

      // In a real app, you would call your backend API here
      console.log("Initiating payment:", paymentData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // On successful payment
      navigate('/booking-confirmation', {
        state: {
          doctor,
          amount: sessionFee,
          date: selectedDate,
          time: selectedTime,
          transactionId: `MPESA-${Date.now()}`
        }
      });
    } catch (error) {
      setPaymentError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 my-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Complete Your Booking</h2>
      
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center mb-3">
          <FaUserMd className="text-green-600 mr-3" size={20} />
          <div>
            <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2" />
            <span>KES {sessionFee.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaClock className="mr-2" />
            <span>2-hour session</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Session Date</label>
          <div className="relative">
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
              title="Select a session date"
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
          <select
            title="Select a time slot"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">+254</span>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="7XXXXXXXX"
              className="w-full pl-16 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              maxLength={9}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <FaMobileAlt className="text-gray-400" />
            </div>
          </div>
        </div>

        {paymentError && (
          <div className="text-red-500 text-sm mt-2">{paymentError}</div>
        )}

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-3 text-white rounded-lg shadow-md mt-4 flex items-center justify-center ${
            isProcessing ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <FaLock className="mr-2" /> Pay KES {sessionFee.toLocaleString()} via M-Pesa
            </>
          )}
        </button>

        <div className="text-xs text-gray-500 mt-4 flex items-center">
          <FaLock className="mr-2 text-green-500" />
          Your payment is secure and encrypted
        </div>
      </div>
    </div>
  );
};

export default BookPayment;