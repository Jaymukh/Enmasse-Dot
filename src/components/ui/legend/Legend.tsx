import { useEffect, useState } from 'react';
import { geoJsonState } from '../../../states';
import styles from './Legend.module.css';
import { useRecoilValue } from 'recoil';
interface LegendProps {
    classname?: string;
    hasLegendValue?: boolean;
}

export const Legend: React.FC<LegendProps> = ({ classname, hasLegendValue }) => {
    const { legendProperties } = useRecoilValue(geoJsonState);
    const [legendData, setLegendData] = useState(legendProperties);

    useEffect(() => {
        if (legendProperties) {
            setLegendData(legendProperties);
        }
    }, [legendProperties]);

    return (
        <>
            {legendData && legendData?.show  &&
                <div className={`row mx-0 mb-1 w-100 ${styles.legend_font_style} ${classname}`}>
                    <p className='col-12 m-0 fs-10'>EH Population</p>
                    <div className={`col-12 ${styles.legend}`} style={{ background: `linear-gradient(90deg, ${legendData?.legend_start_color} 0%, ${legendData?.legend_end_color} 100%)` }} />
                    {hasLegendValue ?
                        <>
                            <p className='m-0 p-0 col-4 text-start fs-10'>{legendData?.legend_start}</p>
                            <p className='m-0 p-0 col-4 text-middle fs-10'>{legendData?.legend_mid}</p>
                            <p className='m-0 p-0 col-4 text-end fs-10'>{legendData?.legend_end}</p>
                        </> :
                        <>
                            <p className='m-0 p-0 col-4 text-start fs-10'>Low</p>
                            <p className='m-0 p-0 col-4 text-middle fs-10'>Medium</p>
                            <p className='m-0 p-0 col-4 text-end fs-10'>High</p>
                        </>
                    }
                </div>}
        </>
    );
};