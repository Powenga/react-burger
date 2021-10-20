import styles from './Preloader.module.css';

export default function Preloader() {
  return(
    <div className={styles.preloader}>
      <div className={styles.preloaderIcon}></div>
    </div>
  );
}