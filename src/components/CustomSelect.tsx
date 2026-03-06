import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const CustomSelect = ({
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  error
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-5 py-4 text-left bg-white border-2 rounded-xl
          flex items-center justify-between
          transition-all duration-200 ease-out
          ${error 
            ? 'border-red-400 bg-red-50' 
            : isOpen 
              ? 'border-indigo-500 ring-4 ring-indigo-500/10' 
              : 'border-gray-200 hover:border-gray-300'
          }
          ${selectedOption ? 'text-gray-900' : 'text-gray-400'}
        `}
      >
        <span className={selectedOption ? 'font-medium' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}

      {/* Dropdown Dialog */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Options Dialog */}
          <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-dropdown">
            {/* Header */}
            <div className="px-5 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-700">Select an option</p>
              <p className="text-xs text-gray-500 mt-0.5">Choose one from the list below</p>
            </div>
            
            {/* Options List */}
            <div className="max-h-64 overflow-y-auto py-2">
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full px-5 py-3 text-left flex items-center justify-between
                    transition-all duration-150 ease-out
                    ${value === option.value 
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700' 
                      : 'hover:bg-gray-50 text-gray-700'
                    }
                    ${index !== options.length - 1 ? 'border-b border-gray-50' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Option Number */}
                    <span className={`
                      w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold
                      ${value === option.value 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white' 
                        : 'bg-gray-100 text-gray-500'
                      }
                    `}>
                      {index + 1}
                    </span>
                    <span className={`font-medium ${value === option.value ? 'text-indigo-700' : ''}`}>
                      {option.label}
                    </span>
                  </div>
                  
                  {/* Check Mark */}
                  {value === option.value && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">Click to select • Press Esc to close</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomSelect;
