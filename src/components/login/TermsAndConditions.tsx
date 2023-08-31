import React from 'react';
import '../../App.css'

interface TermsAndConditionsProps {
  showTermsAndConditionsModal: boolean;
  closeTermsAndConditionsModal: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> =({
  showTermsAndConditionsModal,
  closeTermsAndConditionsModal
}) => {
  return (
    <div>
      <div className={`modal ${showTermsAndConditionsModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showTermsAndConditionsModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered dialog-width">
          <div className="modal-content p-6">
          <div className=' modal-header d-flex flex-row justify-content-between w-100'>
                <div className="d-flex flex-row">
                  <h5 >Terms and Conditions</h5>
                  <p className=' mx-2 Dialog-p'>Last updated: DD/MM/YYYY</p>
                </div>
                <button type="button" className="btn-close" onClick={closeTermsAndConditionsModal}></button>
              </div>
            <div className="modal-body d-flex flex-column justify-content-center align-items-center m-auto p-6 modal-padding">
              {/* <div className='d-flex flex-row justify-content-between w-100 modal-header-padding'>
                <div className="d-flex flex-row">
                  <h5 >Terms and Conditions</h5>
                  <p className=' mx-2 Dialog-p'>Last updated: DD/MM/YYYY</p>
                </div>
                <button type="button" className="btn-close" onClick={closeTermsAndConditionsModal}></button>
              </div> */}
              <div className=" d-flex flex-column justify-content-start modal-dialog-scrollable my-2">
                <p className='Dialog-p'>Please read these Terms and Conditions (“Terms”) carefully before using our services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.</p>
                <h6 className='text-start'>1. General</h6>
                <p className='Dialog-p'>1.1 These Terms apply to all users of our services, including but not limited to website visitors, customers, and clients.</p>
                <p className='Dialog-p'>1.2 Our services may include, but are not limited to, the provision of information, products, and online resources.</p>
                <p className='Dialog-p'>1.3 We reserve the right to modify, update, or discontinue our services at any time without prior notice.</p>
                <h6 className='text-start'>2. Intellectual Property</h6>
                <p className='Dialog-p'>2.1 All content and materials provided through our services, including but not limited to text, graphics, logos, images, videos, and software, are the property of our company and are protected by applicable intellectual property laws.</p>
                <p className='Dialog-p'>2.2 You may not reproduce, distribute, modify, display, or use any of our intellectual property without our prior written consent.</p>
                <h6 className='text-start'>3. User Responsibilities</h6>
                <p className='Dialog-p'>3.1 By using our services, you agree to provide accurate and current information and to ensure the security of your account credentials.</p>
                {/* <button className='bg-transparent underline-text border-0' onClick={closeTermsAndConditionsModal}>Agree</button> */}
              </div>
              <button className='inputBoxHeight login-btn bg-dark text-white width-fit-content-button px-4' onClick={closeTermsAndConditionsModal}>Agree</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TermsAndConditions
