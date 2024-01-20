import styles from './WeatherFilter.module.scss';
import { weatherOptions } from '../../data/data.ts';

export const WeatherFilter = ({
  onOptionsChange,
  selectedOptions,
}: {
  onOptionsChange: (value: string[]) => void;
  selectedOptions: string[];
}) => {
  const handleChange = (currentValue: string) => {
    if (selectedOptions.includes(currentValue)) {
      onOptionsChange(
        selectedOptions.filter((value: string) => value !== currentValue)
      );
    } else {
      onOptionsChange([...selectedOptions, currentValue]);
    }
  };

  return (
    <fieldset className={styles.optionsWrapper}>
      <legend className={styles.weatherFilterHeader}>Filter by weather</legend>
      <div className={styles.optionsContainer}>
        {weatherOptions.map((option) => (
          <button
            key={option.value}
            className={`${styles.option} ${selectedOptions.includes(option.value) ? styles.selected : ''}`}
            onClick={() => handleChange(option.value)}
          >
            <img src={option.imageSrc} alt={`${option.value} image`} />
          </button>
        ))}
      </div>
    </fieldset>
  );
};
