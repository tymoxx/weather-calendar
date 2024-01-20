import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DatePickerDates} from "../../types.ts";
import styles from "./WeatherDatePicker.module.scss";

type WeatherDatePickerProps = {
    startDate: Date | null,
    endDate: Date | null,
    onChange: (dates: DatePickerDates) => void,
}

export const WeatherDatePicker = ({startDate, endDate, onChange} : WeatherDatePickerProps) => {

    return (
        <div className={styles.dateInputWrapper}>
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                className={styles.dateInput}
            />
        </div>
    );
};
