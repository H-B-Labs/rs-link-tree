import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewPage: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  const handleNext = () => {
    if (rating >= 4) {
      // Redirect to Google Review page
      window.location.href = 'https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review';
    } else if (rating > 0) {
      // Redirect to feedback form
      window.location.href = '/feedback';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          How was your experience?
        </h1>
        
        <div className="flex justify-center space-x-2 md:space-x-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <FaStar
              key={index}
              className={`w-8 h-8 md:w-12 md:h-12 cursor-pointer transition-colors duration-200 ${
                (hover !== null ? hover >= index : rating >= index)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </div>

        {rating > 0 && (
          <button
            onClick={handleNext}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
