import style from './App.module.scss';
import {WeatherCard} from "./components/WeatherCard/WeatherCard.tsx";
import {WeatherDatePicker} from "./components/WeatherDatePicker/WeatherDatePicker.tsx";
import {AppName} from "./components/AppName/AppName.tsx";
import { useState } from "react";
import {DatePickerDates} from "./types.ts";
import {data} from "./data/data.ts";

function App() {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const threeMonthAgoDate = new Date(currentDate.setMonth(currentMonth - 3));

    const [startDate, setStartDate] = useState<Date | null>(threeMonthAgoDate);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [filteredData, setFilteredData] = useState(data);

    function filterDates(start: Date | null, end: Date | null) {
        if (start && end) {
            const filteredData = data.filter((weather) => {
                const weatherDate = new Date(weather.date)
                return weatherDate >= start && weatherDate <= end;
            });
            setFilteredData(filteredData);
        }
    }

    const onChange = (dates: DatePickerDates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        filterDates(start, end);
    };

  return (
    <>
        <div className={style.topSection}>
            <AppName />
            <WeatherDatePicker
                startDate={startDate}
                endDate={endDate}
                onChange={onChange}
            />
        </div>
        {filteredData.map((weather) => {
            return <WeatherCard
                key={weather.date}
                date={weather.date}
                weather={weather.weather}
            />
        })}
    </>
  )
}

export default App
