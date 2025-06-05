
import styles from './Header.module.css'
import football from "../../assets/football.svg";
export const Header = () => {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src={football} alt="Football logo" />
            <div>
                <h1 className={styles.appName}>A 2 Z Footballers </h1>
                <h2 className={styles.author}>by Jack Reid</h2>
            </div>
        </header>)
}