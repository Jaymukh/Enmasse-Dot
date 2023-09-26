import { useEffect, useState } from 'react';
import './Spinner.module.css';

export const Spinner = () => {
    
    return (
        <div className="wrapper">
            <div className="overlay d-flex justify-content-center align-items-center">
                <div className="spinner-wrapper w-100">
                    <div className="spinner-border spinner-size" role="status" />
                </div>
            </div>
        </div>
    )
}