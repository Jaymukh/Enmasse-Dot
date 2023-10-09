import styles from './Legend.module.css';

export const Legend = () => {
    return (
        <div className={`row mx-0 ${styles.legend_font_style}`}>
            <p className='col-12 m-0 fs-10'>EH Population</p>
            <div className={`col-12 ${styles.legend}`} />
            <p className='m-0 p-0 col-4 text-start fs-10'>1M</p>
            <p className='m-0 p-0 col-4 text-middle fs-10'>1.5M</p>
            <p className='m-0 p-0 col-4 text-end fs-10'>2M</p>
        </div>
    );
};