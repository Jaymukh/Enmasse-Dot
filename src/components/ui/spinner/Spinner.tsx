import './Spinner.css';
import { spinnerState } from '../../../states';
import { useRecoilState } from 'recoil';
import spinnerGif from '../../../utils/images/spinnerGIF.gif'

export const Spinner = () => {
    const [spinner] = useRecoilState(spinnerState);
    return (
        <>
            {spinner &&
                <div className="spinner-wrapper1">
                    <div className="spinner-overlay1 d-flex justify-content-center align-items-center">
                        {/* <div className="spinner-wrapper w-100">
                            <div className="spinner-border spinner-size" role="status" />
                        </div> */}
                        <div className="w-100">
                            <img src={spinnerGif} alt="spinner" className="spinner-size" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}