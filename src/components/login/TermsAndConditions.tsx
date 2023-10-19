import React from 'react';
import '../../App.css'
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button'
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Modal from '../ui/modal/Modal';

interface TermsAndConditionsProps {
	showModal: boolean;
	handleModal: (value: any) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
	showModal,
	handleModal
}) => {
	return (
		<div>
			<Modal showModal={showModal} classname='width-62-5'>
				<div className=' modal-header d-flex flex-row justify-content-between w-100'>
					<div className="d-flex flex-row align-items-center">
						<Heading
							title='Terms and Conditions'
							type={TypographyType.h3}
							colour={TypographyColor.dark}
							classname='text-start'
						/>
						<p className=' mx-2 mb-0 Dialog-p'>Last updated: DD/MM/YYYY</p>
					</div>
					<Button
						theme={ButtonTheme.primary}
						size={ButtonSize.medium}
						variant={ButtonVariant.transparent}
						onClick={() => handleModal({ tncModal: false })}
						type='button'
						classname='btn-close mx-3 w-auto my-auto'
					/>
				</div>
				<div className="modal-body d-flex flex-column justify-content-center align-items-center m-auto p-6 modal-padding">
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
					</div>
					<Button
						theme={ButtonTheme.primary}
						size={ButtonSize.medium}
						variant={ButtonVariant.contained}
						onClick={() => handleModal({ tncModal: false })}
					>
						Agree
					</Button>
				</div>
			</Modal>
		</div>
	)
}

export default TermsAndConditions;