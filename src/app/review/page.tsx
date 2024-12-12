'use client';

import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

type FormData = {
  name: string;
  email: string;
  feedback: string;
};

export default function ReviewPage() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    feedback: '',
  });
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (rating >= 4) {
      // Redirect to Google Review page
      window.location.href = 'https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review';
    } else if (rating > 0) {
      setShowFeedback(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.feedback.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setResult("Sending....");
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("feedback", formData.feedback);
    submitData.append("rating", rating.toString());
    submitData.append("access_key", "5b5a713f-aa16-4eee-87fe-3481fd4e47a6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Feedback Submitted Successfully");
        console.log("Success", data);
        // Reset the form
        setShowFeedback(false);
        setRating(0);
        setFormData({ name: '', email: '', feedback: '' });
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting feedback", error);
      setResult("An error occurred while submitting the feedback.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">We Value Your Feedback</h2>
            {result && (
              <p className={`text-sm ${result.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                {result}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowFeedback(false)}
              className="w-1/2 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-1/2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

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
              onClick={() => {
                setRating(index);
                setIsLoading(true);
                setTimeout(() => {
                  if (index >= 4) {
                    window.location.href = 'https://g.page/r/CV2Y_YoLd5AFEBM/review';
                  } else {
                    setShowFeedback(true);
                  }
                }, 2000);
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </div>

        {isLoading && (
          <div className="text-center text-gray-600">
            Processing your rating...
          </div>
        )}
      </div>
    </div>
  );
}