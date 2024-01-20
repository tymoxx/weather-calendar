import styles from './WeatherFilter.module.scss';
import { multiselectOptions } from '../../data/data.ts';

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
    <div className={styles.optionsWrapper}>
      <h3 className={styles.weatherFilterHeader}>Filter by weather</h3>
      <div className={styles.optionsContainer}>
        {multiselectOptions.map((option) => (
          <div
            key={option.value}
            className={`${styles.option} ${selectedOptions.includes(option.value) ? styles.selected : ''}`}
            onClick={() => handleChange(option.value)}
          >
            <img src={option.imageSrc} alt={`${option.value} image`} />
          </div>
        ))}
      </div>

      {/*<p>Selected options: {selectedOptions.join(', ')}</p>*/}
    </div>
  );
};
