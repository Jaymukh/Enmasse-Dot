import styles from './ProgressBar.module.css';

export const ProgressBar = () => {
    return (
        <div className={`progress ${styles.progress_container}`}>
            <div
                className={`progress-bar ${styles.progressbar}`}
                style={{ width: `50%` }}
            ></div>
        </div>
    )
}