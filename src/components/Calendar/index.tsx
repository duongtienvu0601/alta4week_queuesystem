import { useState } from 'react'
import { DateType } from '../../types';
import styles from './calendar.module.css'




const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
};

const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let index = 1; index <= daysInMonth; index++) {
        const day = new Date(year, month, index);
        days.push({ day: day.getDate(), month: month + 1, year } as DateType)
    }

    const firstDayOfMonth = getFirstDayOfMonth(month, year);

    const previousMonthDays = [];
    const previousMonthDaysCount = firstDayOfMonth - 1;
    const previousMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = previousMonthLastDay - previousMonthDaysCount + 1; i <= previousMonthLastDay; i++) {
        const day = new Date(year, month, i);
        previousMonthDays.push({ day: day.getDate(), month: month, year } as DateType);
    }
    const displayedDays = [...previousMonthDays, ...days].slice(0, 35);
    displayedDays.forEach(item => {
        if(item.month === month && item.day === 1){
            item.day = 31;
        }
    })
    return displayedDays;
}

export const Calendar = () => {

    const [currentDate, setCurrentDate] = useState<Date>(new Date);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

    const handlePrevMonthClick = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonthClick = () => {
        if (currentDate.getMonth() > 12) {
            return setCurrentDate(new Date(1, currentDate.getFullYear() + 1, 1));
        }
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className={styles.calendar} >
            <div>
                <p
                    onClick={() => handlePrevMonthClick()}
                >{`<`}</p>
                <div>
                    {currentDate.getDate()}-{currentDate.getUTCMonth()} {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <p
                    onClick={() => handleNextMonthClick()}
                >{`>`}</p>
            </div>

            <div className={styles.calendarTable} >
                <div>
                    {days.map(i => (
                        <div key={i} >{i}</div>
                    ))}
                </div>
                <div className={styles.calendarDate}>
                    {daysInMonth.map((item, index) => {
                        const date = new Date(item.year, item.month - 1, item.day);
                        const isCurrentDate = date.toDateString() === new Date().toDateString();
                        const isSelectedDate = selectedDate && date.toDateString() === selectedDate.toDateString();
                        const className = isCurrentDate ? styles.currentDate : isSelectedDate ? styles.selectedDate : styles.date;
                        return (
                            <div 
                                key={index}
                                className={styles.date} 
                                onClick={() => setSelectedDate(date)}
                            >
                                <p>{item.day}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}