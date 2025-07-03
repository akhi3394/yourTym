import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useAddFeedbackMutation } from '../store/api/staticApi';
import { toast } from 'sonner';

const tags = [
  'ServiceQuality',
  'Products',
  'Customer Care',
  'Hygiene',
  'Punctual',
  'Beautician',
];

const FeedbackModal = ({ isOpen, onClose }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5); // Default to 5 stars
  const [addFeedback, { isLoading, error }] = useAddFeedbackMutation();

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (selectedTags.length === 0) {
      toast.error('Please select at least one tag.');
      return;
    }
    if (!feedback.trim()) {
      toast.error('Please provide feedback.');
      return;
    }

    try {
      // For simplicity, assume only one tag is sent as "type" (first selected tag)
      const feedbackData = {
        type: selectedTags[0], // Use the exact tag value as per the enum
        Feedback: feedback,
        rating: rating.toString(),
      };
      await addFeedback(feedbackData).unwrap();
      toast.success('Feedback submitted successfully!');
      setSelectedTags([]);
      setFeedback('');
      setRating(5);
      onClose();
    } catch (err) {
      toast.error('Error submitting feedback. Please try again.');
      console.error('Feedback submission error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white w-full max-w-xl rounded-xl p-4 shadow-lg relative border border-gray-200">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Feedback</h2>

        {/* Rating Section */}
        <div className="bg-[#f8f8ff] p-4 rounded-lg text-center">
          <div className="flex justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={22}
                className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
          <p className="text-gray-700 text-sm">You are rating this service {rating} star{rating !== 1 ? 's' : ''}</p>
          <p className="text-lg font-bold text-gray-800 mt-1">
            {rating === 5 ? 'Excellent' : rating === 4 ? 'Best' : rating === 3 ? 'Good' : rating === 2 ? 'Average' : 'Poor'}
          </p>

          <p className="mt-4 font-medium text-sm text-gray-800 text-center">
            {rating === 5 ? 'WOW, Thank you what did you like the most?' : 'Tell us about your experience'}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`py-2 px-4 rounded-full border text-sm font-medium transition ${
                  selectedTags.includes(tag)
                    ? 'bg-black text-white border-black'
                    : 'bg-gray-200 text-gray-700 border-gray-300'
                }`}
              >
                {tag.replace(/([A-Z])/g, ' $1').trim()} {/* Convert camelCase to spaced words for display */}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="bg-[#f8f8ff] mt-4 p-4 rounded-lg">
          <p className="text-center font-semibold text-gray-800 text-sm border-b pb-2 mb-2">Write Your Feedback</p>
          <textarea
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none"
            placeholder="Type here"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full bg-[#FF4F29] hover:bg-[#e94320] text-white font-semibold py-2 rounded-full mt-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2 text-center">Error submitting feedback. Please try again.</p>}
      </div>
    </div>
  );
};

export default FeedbackModal;