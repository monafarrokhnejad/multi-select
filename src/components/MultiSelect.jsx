import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({
  defaultOptions = [],
  placeholder = "انتخاب کنید...",
  position = "bottom", // "top"
}) => {
  const [options, setOptions] = useState(defaultOptions);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // بستن لیست انتخاب با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setInputValue("");
    setIsOpen(false);
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleAddOption = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !options.includes(trimmedValue)) {
      setOptions([...options, trimmedValue]);
      setSelectedOptions([...selectedOptions, trimmedValue]);
    }
    setInputValue("");
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddOption();
    }
  };

  return (
    <div className="multi-select-wrapper" ref={wrapperRef}>
      <div
        className={`multi-select-input ${isOpen ? "active" : ""}`}
        onClick={toggleSelect}
      >
        {selectedOptions.map((option) => (
          <div key={option} className="selected-option">
            {option}
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveOption(option);
              }}
            >
              ×
            </span>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        />
        <button type="button" onClick={handleAddOption}>
          <span>+</span>
        </button>
      </div>
      {isOpen && (
        <ul className={`options-list ${position}`}>
          {options
            .filter(
              (option) =>
                option.toLowerCase().includes(inputValue.toLowerCase()) &&
                !selectedOptions.includes(option)
            )
            .map((option) => (
              <li key={option} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
