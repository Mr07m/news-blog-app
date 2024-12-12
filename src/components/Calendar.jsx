import React, { useState } from "react";
import "./Calendar.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Calendar = () => {
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const dayInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDayMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  return (
    <div className="calendar">
      <div className="navigate-date">
        <h2 className="month">{monthsOfYear[currentMonth]},</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          <span onClick={prevMonth}>
            <FaAngleLeft />
          </span>
          <span onClick={nextMonth}>
            <FaAngleRight />
          </span>
        </div>
      </div>
      <div className="weekdays">
        {dayOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="days">
        {[...Array(firstDayMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`}></span>
        ))}
        {[...Array(dayInMonth).keys()].map((day) => (
          <span
            key={day + 1}
            className={
              day + 1 === currentDate.getDate() &&
              currentMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear()
                ? "current-day"
                : ""
            }
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;