import { useEffect, useState } from 'react';
import './Spinner.module.css';

import { spinnerState } from '../../../states';
import { useRecoilValue } from 'recoil';

export const Spinner = () => {
    const spinner = useRecoilValue(spinnerState);

    return (
        <>
            {spinner &&
                <div className="wrapper">
                    <div className="overlay d-flex justify-content-center align-items-center">
                        <div className="spinner-wrapper w-100">
                            <div className="spinner-border spinner-size" role="status" />
                        </div>
                    </div>
                </div>
            }
        </>    
    )
}