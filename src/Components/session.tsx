// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Doctor images (Replace with actual imports)
// import psychiatristImg from "../assets/images/Doc 1.webp";
// import psychologistImg from "../assets/images/Doc6.jpg";
// import therapistImg from "../assets/images/Doc 3.jpg";
// import counselorImg from "../assets/images/Doc 4.webp";
// import neuropsychiatristImg from "../assets/images/Doc5.avif";
// import socialWorkerImg from "../assets/images/Doc 2.webp";

// interface Doctor {
//   id: number;
//   image: string;
//   name: string;
//   specialty: string;
// }

// const doctors: Doctor[] = [
//   { id: 3, image: psychiatristImg, name: "Dr. Mark Okwena", specialty: "Psychiatrist" },
//   { id: 4, image: psychologistImg, name: "Dr. Celestina Kweyu", specialty: "Psychologist" },
//   { id: 5, image: therapistImg, name: "Dr. Faith Ndungwa", specialty: "Therapist" },
//   { id: 6, image: counselorImg, name: "Dr. Cyrus Kimutai", specialty: "Licensed Counsellor" },
//   { id: 7, image: neuropsychiatristImg, name: "Dr. Riyan Moraa", specialty: "Neuropsychiatrist" },
//   { id: 8, image: socialWorkerImg, name: "Dr. Christine Monyancha", specialty: "Clinical Social Worker" },
// ];

// const SessionBooking: React.FC = () => {
//   const navigate = useNavigate();
//   const [sessionCounts, setSessionCounts] = useState<{ [key: number]: number }>({});

//   useEffect(() => {
//     const today = new Date().toDateString();
//     const storedData = localStorage.getItem("sessionCounts");
//     const storedDate = localStorage.getItem("sessionDate");

//     if (storedData && storedDate === today) {
//       setSessionCounts(JSON.parse(storedData));
//     } else {
//       localStorage.removeItem("sessionCounts");
//       localStorage.setItem("sessionDate", today);
//     }
//   }, []);

//   const handleNavigateToBooking = (therapistId: number) => {
//     if ((sessionCounts[therapistId] || 0) < 3) {
//       const newCounts = { ...sessionCounts, [therapistId]: (sessionCounts[therapistId] || 0) + 1 };
//       setSessionCounts(newCounts);
//       localStorage.setItem("sessionCounts", JSON.stringify(newCounts));
//       navigate(`/book-session?therapistId=${therapistId}`);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-5">
//       <h2 className="text-2xl font-semibold text-center mb-6">Book a Therapy Session</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {doctors.map((doctor) => (
//           <div key={doctor.id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white text-center">
//             <img src={doctor.image} alt={doctor.name} className="w-32 h-32 object-cover mx-auto rounded-full mb-3" />
//             <h3 className="text-lg font-semibold">{doctor.name}</h3>
//             <p className="text-sm text-gray-600 mb-3">{doctor.specialty}</p>
//             <button
//               className={`w-full py-2 rounded transition ${sessionCounts[doctor.id] >= 3 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
//               onClick={() => handleNavigateToBooking(doctor.id)}
//               disabled={sessionCounts[doctor.id] >= 3}
//             >
//               {sessionCounts[doctor.id] >= 3 ? "Fully Booked Today" : "Book Session"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SessionBooking;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

// Doctor images
import psychiatristImg from "../assets/images/Doc 1.webp";
import psychologistImg from "../assets/images/Doc6.jpg";
import therapistImg from "../assets/images/Doc 3.jpg";
import counselorImg from "../assets/images/Doc 4.webp";
import neuropsychiatristImg from "../assets/images/Doc5.avif";
import socialWorkerImg from "../assets/images/Doc 2.webp";

interface Doctor {
  id: number;
  image: string;
  name: string;
  specialty: string;
  rate: number;
  description: string;
}

const doctors: Doctor[] = [
  { 
    id: 1, 
    image: psychiatristImg, 
    name: "Dr. Mark Okwena", 
    specialty: "Psychiatrist",
    rate: 5000,
    description: "Specializes in medication management and complex mental health conditions"
  },
  { 
    id: 2, 
    image: psychologistImg, 
    name: "Dr. Celestina Kweyu", 
    specialty: "Psychologist",
    rate: 4000,
    description: "Expert in cognitive behavioral therapy and psychological assessments"
  },
  { 
    id: 3, 
    image: therapistImg, 
    name: "Dr. Faith Ndungwa", 
    specialty: "Therapist",
    rate: 3500,
    description: "Specializes in trauma therapy and relationship counseling"
  },
  { 
    id: 4, 
    image: counselorImg, 
    name: "Dr. Cyrus Kimutai", 
    specialty: "Licensed Counselor",
    rate: 3000,
    description: "Provides guidance for anxiety, depression and life transitions"
  },
  { 
    id: 5, 
    image: neuropsychiatristImg, 
    name: "Dr. Riyan Moraa", 
    specialty: "Neuropsychiatrist",
    rate: 6000,
    description: "Treats conditions related to brain function and mental health"
  },
  { 
    id: 6, 
    image: socialWorkerImg, 
    name: "Dr. Christine Monyancha", 
    specialty: "Clinical Social Worker",
    rate: 2500,
    description: "Connects patients with community resources and provides therapy"
  },
];

const SessionBooking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookSession = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Book a Therapy Session</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-green-200"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                  <p className="text-green-600 font-medium">{doctor.specialty}</p>
                  <p className="text-gray-500 text-sm mt-1">KES {doctor.rate.toLocaleString()} / session</p>
                </div>
              </div>
              <p className="text-gray-600 mb-5 text-sm">{doctor.description}</p>
              <button
                onClick={() => handleBookSession(doctor)}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <FaCalendarAlt className="mr-2" /> Book Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Book with {selectedDoctor.name}
              </h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Select a date"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time Slot (2-hour sessions)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['09:00', '11:00', '14:00', '16:00'].map((time) => (
                  <button
                    key={time}
                    className="py-2 px-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-center"
                  >
                    {time} - {parseInt(time.split(':')[0]) + 2}:00
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                navigate('/book-payment', { 
                  state: { 
                    doctor: selectedDoctor,
                    sessionFee: selectedDoctor.rate
                  } 
                });
              }}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionBooking;