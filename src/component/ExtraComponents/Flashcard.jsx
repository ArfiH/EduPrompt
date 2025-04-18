import { useState } from 'react';


export default function FlashcardDeck({ flashcards = [] }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Handle when there are no flashcards
  if (flashcards.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 w-full bg-gray-100 rounded-lg shadow-md">
        <p className="text-gray-500 text-center">No flashcards available</p>
      </div>
    );
  }
  
  const currentCard = flashcards[currentCardIndex];
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleNext = () => {
    setIsFlipped(false); // Reset to question side
    setCurrentCardIndex((prevIndex) => 
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevious = () => {
    setIsFlipped(false); // Reset to question side
    setCurrentCardIndex((prevIndex) => 
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      {/* Card counter */}
      <div className="mb-4 text-gray-600">
        Card {currentCardIndex + 1} of {flashcards.length}
      </div>
      
      {/* Flashcard */}
      <div 
        className="w-full h-64 perspective-1000 cursor-pointer mb-6"
        onClick={handleFlip}
      >
        <div className={`relative w-full h-full transition-transform duration-500 ease-in transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Question Side */}
          <div className={`absolute w-full h-full bg-white rounded-xl shadow-lg p-6 backface-hidden ${isFlipped ? 'hidden' : 'flex'} flex-col justify-center items-center`}>
            <div className="text-sm text-blue-600 font-medium mb-2">Question</div>
            <div className="text-xl text-center font-medium">{currentCard.Question}</div>
            <div className="text-sm text-gray-400 mt-4">Click to reveal answer</div>
          </div>
          
          {/* Answer Side */}
          <div className={`absolute w-full h-full bg-blue-50 rounded-xl shadow-lg p-6 backface-hidden ${isFlipped ? 'flex' : 'hidden'} flex-col justify-center items-center`}>
            <div className="text-sm text-blue-600 font-medium mb-2">Answer</div>
            <div className="text-xl text-center">{currentCard.Answer}</div>
            <div className="text-sm text-gray-400 mt-4">Click to see question</div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between w-full">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Example usage:
// const flashcards = [
//   { id: 1, Question: 'What is the main topic of the YouTube video?', Answer: 'The main topic of the YouTube video is a React Tutorial for Beginners, focusing on building front-end apps with React 18 and TypeScript.' },
//   { id: 2, Question: 'What are the prerequisites for taking this React course?', Answer: 'To take this course, one should have a good understanding of HTML, CSS, and JavaScript, but no prior knowledge of React is required.' }
// ];

// Example component with the sample data:
const ExampleComponent = () => {
  const sampleFlashcards = [
    { id: 1, Question: 'What is the main topic of the YouTube video?', Answer: 'The main topic of the YouTube video is a React Tutorial for Beginners, focusing on building front-end apps with React 18 and TypeScript.' },
    { id: 2, Question: 'What are the prerequisites for taking this React course?', Answer: 'To take this course, one should have a good understanding of HTML, CSS, and JavaScript, but no prior knowledge of React is required.' }
  ];
  
  return <FlashcardDeck flashcards={sampleFlashcards} />;
};
