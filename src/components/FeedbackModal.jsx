import React, { useState } from "react";
import { X, Star } from "lucide-react";

const tags = [
  "Service Quality",
  "Products",
  "Customer Care",
  "Hygiene",
  "Punctual",
  "Beautician",
];

const FeedbackModal = ({ isOpen, onClose }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [feedback, setFeedback] = useState("");

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white w-full max-w-xl rounded-xl p-4 shadow-lg relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Feedback</h2>

        {/* Rating Section */}
        <div className="bg-[#f8f8ff] p-4 rounded-lg text-center">
          <div className="flex justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-gray-700 text-sm">You are rating this service 5 star</p>
          <p className="text-lg font-bold text-gray-800 mt-1">Excellent</p>

          <p className="mt-4 font-medium text-sm text-gray-800">
            WOW , Thank you what did you like the most?
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`py-2 rounded-lg border text-sm font-medium transition ${
                  selectedTags.includes(tag)
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="bg-[#f8f8ff] mt-4 p-4 rounded-lg">
          <p className="text-center font-semibold text-gray-800 text-sm border-b pb-2 mb-2">
            Write Your Feedback
          </p>
          <textarea
            rows={4}
            className="w-full p-2 border rounded-md text-sm placeholder:text-gray-400 focus:outline-none"
            placeholder="Type here"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button className="w-full bg-[#FF4D29] hover:bg-[#e94320] text-white font-semibold py-2.5 rounded-lg mt-4">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
