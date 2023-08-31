import '../../App.css';
import React, { useState } from 'react';
import globe from '../../utils/images/globe.png';
import ForgotPassword from './ForgotPassword';
import EmailSent from './EmailSent';
import TermsAndConditions from './TermsAndConditions';

interface LoginProps {
    handleLoggedIn: (flag: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ handleLoggedIn }) => {
    // login component
    const [email, setEmail] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);

    const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        setErrorMessageEmail('');
        setDisabled(true);
        if (emailValue) {
            if (emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                setEmail(emailValue);
                setErrorMessageEmail('');
            } else {
                setErrorMessageEmail('Enter a valid email.');
                setDisabled(true);
            }
        }
        if (password.length >= 8 && emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setDisabled(false);
        }
    };

    const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        setErrorMessagePassword('');
        setDisabled(true);
        if (passwordValue) {
            if (passwordValue.length >= 8) {
                setErrorMessagePassword('');
                setPassword(passwordValue);
            } else {
                setErrorMessagePassword('Password is incorrect');
                setDisabled(true);
            }
        }
        if (passwordValue.length >= 8 && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setDisabled(false);
        }
    };
    // forgot password

    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordEmailError, setForgotPasswordEmailError] = useState('');
    const [disabledSendEmail, setDisabledSendEmail] = useState(true);
    const [showEmailSentModal, setShowEmailSentModal] = useState(false); // SentMail Model
    const [showTermsAndConditionsModal, setShowTermsAndConditionsModal] = useState(false); // TermsAndConditions

    const openForgotPasswordModal = () => {
        setShowForgotPasswordModal(true);
    };

    const closeForgotPasswordModal = () => {
        setShowForgotPasswordModal(false);
        setForgotPasswordEmail('');
        setForgotPasswordEmailError('');
    };

    const handleForgotPasswordEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const forgotPasswordEmailValue = event.target.value;
        setForgotPasswordEmail(forgotPasswordEmailValue);
        setForgotPasswordEmailError('');
        setDisabledSendEmail(true);
        if (forgotPasswordEmailValue) {
            if (forgotPasswordEmailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                setForgotPasswordEmail(forgotPasswordEmailValue);
                setForgotPasswordEmailError('');
                setDisabledSendEmail(false)
            } else {
                setForgotPasswordEmailError('Enter a valid email.');
                setDisabledSendEmail(true);
            }
        }
    }

    const handleSendEmail = () => {
        setShowForgotPasswordModal(false);
        setShowEmailSentModal(true);
    };
    // Sent Mail Model
    const closeEmailSentModal = () => {
        setShowEmailSentModal(false);
        setForgotPasswordEmail('');
        setDisabledSendEmail(true);
    };
    // TermsAndConditions Model
    const openTermsAndConditionsModal = () => {
        setShowTermsAndConditionsModal(true);
    };
    const closeTermsAndConditionsModal = () => {
        setShowTermsAndConditionsModal(false);
    };

    return (
        <div>
            <div className='row mx-0' style={{ height: '100vh', width: '100vw' }} >
                <div className='col-md-6 col-xl-6 login-update-box lightGrayBackground'>
                    <div className='loginCardAlign'>
                        <img alt="globe" src={globe} />
                        {/* <img alt="globe" variant="top" src={globe} /> */}
                        <div>
                            <h3>enmasse</h3>
                            <p className='text-muted login-p'>
                                Our team of skilled professionals is committed to delivering outstanding advisory services and customer support, enabling you to maximize your investment potential with us.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 col-md-6 login-update-box whiteBackground'>
                    <div className='loginCardAlign'>
                        <h3 className='login-header'>Login</h3>
                        <p className='text-muted mb-4 login-p'>Enter your email ID and Password to login
                        </p>
                        <h5 className='fs-6'>Email</h5>
                        <input type="email" className='my-1 px-2 inputBoxHeight' value={email} placeholder='Enter your email id here' onChange={handleEmailInput} />
                        {errorMessageEmail && <p className='text-danger'>{errorMessageEmail}</p>}
                        <div className='d-flex flex-row justify-content-between mt-3'>
                            <h5 className='fs-6'>Password</h5>
                            <button className='bg-transparent underline-text border-0' onClick={openForgotPasswordModal}>Forgot password?</button>
                        </div>
                        <input type='password' className='my-1 px-2 inputBoxHeight' value={password} placeholder='Enter your password here' minLength={8} onChange={handlePasswordInput} />
                        {errorMessagePassword && <p className='text-danger'>{errorMessagePassword}</p>}
                        <button className={disabled ? 'mb-2 mt-4 inputBoxHeight login-btn bg-secondary text-white fs-6' : 'mb-2 mt-4 inputBoxHeight login-btn bg-dark text-white fs-6'} disabled={disabled} onClick={() => handleLoggedIn(true)}>Continue</button>
                        <p className='text-muted mb-0 mt-2 login-p'>By clicking on continue you are agreeing to the Enmasse
                            <button className='bg-transparent black underline-text border-0' onClick={openTermsAndConditionsModal} >Terms & conditions</button>
                            and <button className='bg-transparent black underline-text border-0' onClick={openTermsAndConditionsModal} >Privacy policies</button>
                        </p>
                    </div>
                </div>

                {showForgotPasswordModal && (
                    <ForgotPassword
                        closeForgotPasswordModal={closeForgotPasswordModal}
                        showForgotPasswordModal={showForgotPasswordModal}
                        handleForgotPasswordEmailInput={handleForgotPasswordEmailInput}
                        forgotPasswordEmail={forgotPasswordEmail}
                        forgotPasswordEmailError={forgotPasswordEmailError}
                        disabledSendEmail={disabledSendEmail}
                        handleSendEmail={handleSendEmail}
                    />
                )}

                {showEmailSentModal && (
                    <EmailSent
                        showEmailSentModal={showEmailSentModal}
                        closeEmailSentModal={closeEmailSentModal}
                        forgotPasswordEmail={forgotPasswordEmail}
                    />
                )}

                {showTermsAndConditionsModal && (
                    <TermsAndConditions
                        closeTermsAndConditionsModal={closeTermsAndConditionsModal}
                        showTermsAndConditionsModal={showTermsAndConditionsModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Login;
