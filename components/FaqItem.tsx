import React, { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);


const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-0 border-[var(--color-dark)] py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-white hover:text-[var(--color-sky)] transition-colors duration-200 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDownIcon className={`w-5 h-5 text-[var(--color-sky)] shrink-0 transform transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`} />

      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
            <p className="text-[var(--color-beige)] pr-6">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
