import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerDates } from '../../types.ts';
import styles from './WeatherDatePicker.module.scss';
import { useMediaQuery } from 'react-responsive';

type WeatherDatePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: DatePickerDates) => void;
  highlightedDates: Date[];
};

export const WeatherDatePicker = ({
  startDate,
  endDate,
  onChange,
  highlightedDates,
}: WeatherDatePickerProps) => {
  const isMediumScreen = useMediaQuery({ maxWidth: 1053 });
  const isSmallScreen = useMediaQuery({ maxWidth: 500 });
  return (
    <div className={styles.dateInputWrapper}>
      <DatePicker
        // selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        monthsShown={isSmallScreen ? 1 : isMediumScreen ? 2 : 3}
        className={styles.dateInput}
        dayClassName={(date) => {
          return highlightedDates
            .map((d) => d.toDateString())
            .includes(date.toDateString())
            ? styles.highlightedDay
            : '';
        }}
        calendarStartDay={1}
      />
    </div>
  );
};
