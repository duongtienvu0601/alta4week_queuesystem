import React, { useState } from "react";
import classes from "./Calendar.module.css";

interface Props {
    className?: string;
}

const Calendar: React.FC<Props> = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    const handlePrevMonthClick = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonthClick = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const days: Date[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    const previousMonthDays: Date[] = [];
    const previousMonthDaysCount = firstDayOfMonth - 1;
    const previousMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
    for (let i = previousMonthLastDay - previousMonthDaysCount + 1; i <= previousMonthLastDay; i++) {
        previousMonthDays.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, i));
    }

    const displayedDays = [...previousMonthDays, ...days].slice(0, 35);

    return (
        <div className={classes.calendar}>
            <div className={classes.calendarHeader}>
                <button onClick={handlePrevMonthClick}>{"<"}</button>
                <h2>
                    {selectedDate.getDate()} {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <button onClick={handleNextMonthClick}>{">"}</button>
            </div>
            <div className={classes.vector}></div>
            <div className={classes.calendarWeekdays}>
                {weekdays.map((weekday) => (
                    <div key={weekday}>{weekday}</div>
                ))}

            </div>
            <div className={classes.calendarDays}>
                {displayedDays.map((day) => (
                    <div
                        key={day.toISOString()}
                        className={`calendarDays ${day.getMonth() !== currentMonth.getMonth() ? classes.otherMonthDay : ""} ${day.toDateString() === selectedDate.toDateString() ? "selected" : ""} ${day.toDateString() === new Date().toDateString() ? classes.currentDay : ""} ${day < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) ? classes.disabled : ""}`}

                        onMouseOver={() => setSelectedDate(day)}
                    >
                        {day.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;

