import style from './App.module.scss';
import { WeatherCard } from './components/WeatherCard/WeatherCard.tsx';
import { WeatherDatePicker } from './components/WeatherDatePicker/WeatherDatePicker.tsx';
import { WeatherFilter } from './components/AppName/WeatherFilter.tsx';
import { useEffect, useState } from 'react';
import { DatePickerDates } from './types.ts';
import { data, multiselectOptions } from './data/data.ts';

function App() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const sixMonthAgoDate = new Date(currentDate.setMonth(currentMonth - 6));

  const [startDate, setStartDate] = useState<Date | null>(sixMonthAgoDate);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    multiselectOptions.map((option) => option.value)
  );
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    filterData(startDate, endDate, selectedOptions);
  }, []);

  const filterData = (
    start: Date | null,
    end: Date | null,
    options: string[]
  ) => {
    if (start && end) {
      const filteredData = data.filter((obj) => {
        const weatherDate = new Date(obj.date);
        const datesCondition = weatherDate >= start && weatherDate <= end;
        const optionsCondition = options.includes(obj.weather);
        return datesCondition && optionsCondition;
      });
      setFilteredData(filteredData);
    }
  };

  const handleOptionsChange = (newOptions: string[]) => {
    setSelectedOptions(newOptions);
    filterData(startDate, endDate, newOptions);
  };

  const onDateChange = (dates: DatePickerDates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    filterData(start, end, selectedOptions);
  };

  return (
    <>
      <div className={style.topSection}>
        <WeatherFilter
          onOptionsChange={handleOptionsChange}
          selectedOptions={selectedOptions}
        />
        <WeatherDatePicker
          startDate={startDate}
          endDate={endDate}
          onChange={onDateChange}
        />
      </div>
      {filteredData.map((weather) => (
        <WeatherCard
          key={weather.date}
          date={weather.date}
          weather={weather.weather}
        />
      ))}
    </>
  );
}

export default App;
