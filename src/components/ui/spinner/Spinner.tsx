import './Spinner.css';
import { spinnerState } from '../../../states';
import { useRecoilState } from 'recoil';

export const Spinner = () => {
    const [spinner] = useRecoilState(spinnerState);
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