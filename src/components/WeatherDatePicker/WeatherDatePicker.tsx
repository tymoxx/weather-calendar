import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerDates } from '../../types.ts';
import styles from './WeatherDatePicker.module.scss';
import { useMediaQuery } from 'react-responsive';

type WeatherDatePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: DatePickerDates) => void;
};

export const WeatherDatePicker = ({
  startDate,
  endDate,
  onChange,
}: WeatherDatePickerProps) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 1053 }); // Adjust the max width as needed
  return (
    <div className={styles.dateInputWrapper}>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        monthsShown={isSmallScreen ? 2 : 3}
        className={styles.dateInput}
      />
    </div>
  );
};
