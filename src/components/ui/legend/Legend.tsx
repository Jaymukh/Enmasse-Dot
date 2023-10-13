import { geoJsonState } from '../../../states';
import styles from './Legend.module.css';
import { useRecoilValue } from 'recoil';

export const Legend = () => {
    const { legendProperties } = useRecoilValue(geoJsonState);
    return (
        <>
            {legendProperties &&
                <div className={`row mx-0 mb-1 ${styles.legend_font_style}`}>
                    <p className='col-12 m-0 fs-10'>EH Population</p>
                    <div className={`col-12 ${styles.legend}`} style={{ background: `linear-gradient(90deg, ${legendProperties?.legend_start_color} 0%, ${legendProperties?.legend_end_color} 100%)` }} />
                    <p className='m-0 p-0 col-4 text-start fs-10'>{legendProperties?.legend_start}</p>
                    <p className='m-0 p-0 col-4 text-middle fs-10'>{legendProperties?.legend_mid}</p>
                    <p className='m-0 p-0 col-4 text-end fs-10'>{legendProperties?.legend_end}</p>
                </div>}
        </>
    );
};