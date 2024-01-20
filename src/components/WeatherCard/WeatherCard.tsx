import styles from './WeatherCard.module.scss';

type WeatherCardProps = {
    date: string,
    weather: string,
}

export const WeatherCard = ({date, weather}: WeatherCardProps) => {
    return (
        <div className={styles.weatherCard}>
            <img
                className={styles.icon}
                src={`./assets/${weather}.png`}
                alt={`${weather} icon`}
            />
            <span className={styles.date}>{date}</span>
            <br/>
        </div>
    )
}
