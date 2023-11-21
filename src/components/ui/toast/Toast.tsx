/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import styles from "./Toast.module.css";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidErrorCircle } from 'react-icons/bi';
import { errorState } from '../../../states';
import { useRecoilState } from 'recoil';

const Toast = () => {
    const [error, setError] = useRecoilState(errorState);

    const onClose = () => {
        setError(null);
    };

    const getTypeClass = (type: string) => {
        if (!type) {
            return '';
        }

        let className = "";
        switch (type) {
            case 'Error':
                className = `${styles.error_toast}`;
                break;
            case 'Success':
                className = `${styles.success_toast}`;
        }
        return className;
    }



    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <>
            {error && <div className={`d-flex align-items-center justify-content-between px-3 ${styles.alert_box} ${getTypeClass(error?.type)}`}>
                <div className='d-flex align-items-center'>
                    {error?.type === 'Error' ? <BiSolidErrorCircle fontSize={43} color='rgba(180, 51, 28, 1)' /> : <IoIosCheckmarkCircle fontSize={43} color='rgba(16, 128, 65, 1)' />}
                    <div className='mx-3'>
                        <h6 className={`${styles.alert_title} text-start mb-1 p-0`}>{error?.type}</h6>
                        <p className={`${styles.alert_description} m-0 p-0 text-start`}>{error?.message}</p>
                    </div>
                </div>
                <div className='d-flex align-items-start h-100 py-3 pe-1'>
                    <button className='btn-close' onClick={onClose}></button>
                </div>

            </div>}
        </>
    );
};

export default Toast;
