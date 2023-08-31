import React from 'react';

interface ForgotPasswordProps {
  closeForgotPasswordModal: () => void;
  showForgotPasswordModal: boolean;
  handleForgotPasswordEmailInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  forgotPasswordEmail: string;
  forgotPasswordEmailError: string;
  disabledSendEmail: boolean;
  handleSendEmail: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  closeForgotPasswordModal,
  showForgotPasswordModal,
  handleForgotPasswordEmailInput,
  forgotPasswordEmail,
  forgotPasswordEmailError,
  disabledSendEmail,
  handleSendEmail,
}) => {
  return (
    <div>
      <div
        className={`modal ${showForgotPasswordModal ? 'show' : ''}`}
        tabIndex={-1}
        role="dialog"
        style={{ display: showForgotPasswordModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body d-flex flex-column justify-content-center w-auto m-3">
              <div className="d-flex flex-row justify-content-between">
                <h5>Forgot Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeForgotPasswordModal}
                ></button>
              </div>
              <p className="Dialog-p">Enter your email, we will send you instructions.</p>
              <div className="d-flex flex-column justify-content-start my-2">
                <h5 className="d-flex justify-content-start">Email</h5>
                <input
                  type="email"
                  className="my-1 px-2 inputBoxHeight"
                  value={forgotPasswordEmail}
                  placeholder="Enter your email id here"
                  onChange={handleForgotPasswordEmailInput}
                />
                {forgotPasswordEmailError && (
                  <p className="text-danger text-start">{forgotPasswordEmailError}</p>
                )}

                <button
                  className={
                    disabledSendEmail
                      ? 'mb-2 mt-4 inputBoxHeight login-btn bg-secondary text-white fs-6'
                      : 'mb-2 mt-4 inputBoxHeight login-btn bg-dark text-white fs-6'
                  }
                  disabled={disabledSendEmail}
                  onClick={handleSendEmail}
                >
                  Send Email
                </button>

                <button
                  className="bg-transparent underline-text border-0"
                  onClick={closeForgotPasswordModal}
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
