import style from './App.module.scss';
import { WeatherCard } from './components/WeatherCard/WeatherCard.tsx';
import { WeatherDatePicker } from './components/WeatherDatePicker/WeatherDatePicker.tsx';
import { WeatherFilter } from './components/WeatherFilter/WeatherFilter.tsx';
import { useEffect, useMemo, useState } from 'react';
import { DatePickerDates } from './types.ts';
import { data, weatherOptions } from './data/data.ts';

function App() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const sixMonthAgoDate = new Date(currentDate.setMonth(currentMonth - 6));

  const [startDate, setStartDate] = useState<Date | null>(sixMonthAgoDate);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const allWeatherOptions = useMemo(
    () => weatherOptions.map((option) => option.value),
    []
  );
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(allWeatherOptions);
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

  const handleDateChange = (dates: DatePickerDates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    filterData(start, end, selectedOptions);
  };

  return (
    <main>
      <section className={style.topSection}>
        <WeatherFilter
          onOptionsChange={handleOptionsChange}
          selectedOptions={selectedOptions}
        />
        <WeatherDatePicker
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          highlightedDates={data.map((obj) => new Date(obj.date))}
        />
      </section>
      {filteredData.length === 0 ? (
        <p className={style.noItems}>No items...</p>
      ) : (
        filteredData.map((weather) => (
          <WeatherCard
            key={weather.date}
            date={weather.date}
            weather={weather.weather}
          />
        ))
      )}
    </main>
  );
}

export default App;
