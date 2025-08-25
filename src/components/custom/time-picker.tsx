import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  className?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value = "",
  onChange,
  placeholder = "Select time",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Generate 12-hour time options with 30-minute intervals
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const generateTimeOptions = () => {
    const options = [];

    // AM times first
    for (let hour = 1; hour <= 12; hour++) {
      for (const minute of [0, 30]) {
        const timeString = `${hour}:${minute.toString().padStart(2, "0")}`;
        options.push(`${timeString} AM`);
      }
    }

    // PM times after
    for (let hour = 1; hour <= 12; hour++) {
      for (const minute of [0, 30]) {
        const timeString = `${hour}:${minute.toString().padStart(2, "0")}`;
        options.push(`${timeString} PM`);
      }
    }

    return options;
  };

  function generateTimeOptionsTwo() {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      if (hour < 9) continue;
      for (const minute of [0, 30]) {
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        const timeString = `${displayHour}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(`${timeString} ${period}`);
      }
    }
    return options;
  }

  const timeOptions = generateTimeOptionsTwo();

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setIsOpen(false);
    onChange?.(time);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedTime(value);
  }, [value]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={className}
      >
        <span
          className={
            selectedTime ? "text-gray-900 text-sm" : "text-gray-500 text-sm"
          }
        >
          {selectedTime || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {timeOptions.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => handleTimeSelect(time)}
              className={`w-full  px-4 py-2 text-left hover:bg-gray-200 focus:bg-gray-50 focus:outline-none ${
                selectedTime === time
                  ? "bg-gray-400 text-black-700 text-sm"
                  : "text-gray-700 text-sm"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimePicker;
