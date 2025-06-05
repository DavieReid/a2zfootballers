
import styles from './Header.module.css'
import football from "../../assets/football.svg";
export const Header = () => {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src={football} alt="Vite logo" />
            <h1>A 2 Z Footballers </h1>
            <h2>by Jack Reid</h2>
        </header>)
}