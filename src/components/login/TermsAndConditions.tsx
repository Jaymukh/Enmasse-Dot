import React from 'react';
import '../../App.css'
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button'
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
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
							type={TypographyType.h2}
							colour={TypographyColor.dark}
							classname='text-start'
						/>
						<Body
							type={BodyType.p2}
							color={BodyColor.dark}
							classname='text-start mx-2 mb-0'
						>
							Last updated: DD/MM/YYYY
						</Body>
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
						<Body
							type={BodyType.p2}
							color={BodyColor.dark}
							classname='text-start'
						>
							Please read these Terms and Conditions (“Terms”) carefully before using our services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
						</Body>
						<Heading
							title='1. General'
							type={TypographyType.h3}
							colour={TypographyColor.dark}
							classname='text-start margin-top-1-25 margin-bottom-0-63'
						/>
						<Body
							type={BodyType.p2}
							color={BodyColor.dark}
							classname='text-start'
						>
							1.1 These Terms apply to all users of our services, including but not limited to website visitors, customers, and clients. <br />
							1.2 Our services may include, but are not limited to, the provision of information, products, and online resources. <br />
							1.3 We reserve the right to modify, update, or discontinue our services at any time without prior notice.
						</Body>
						<Heading
							title='2. Intellectual Property'
							type={TypographyType.h3}
							colour={TypographyColor.dark}
							classname='text-start mt-4 margin-bottom-0-63'
						/>
						<Body
							type={BodyType.p2}
							color={BodyColor.dark}
							classname='text-start'
						>
							2.1 All content and materials provided through our services, including but not limited to text, graphics, logos, images, videos, and software, are the property of our company and are protected by applicable intellectual property laws. <br />
							2.2 You may not reproduce, distribute, modify, display, or use any of our intellectual property without our prior written consent. <br />
						</Body>
						<Heading
							title='3. User Responsibilities'
							type={TypographyType.h3}
							colour={TypographyColor.dark}
							classname='text-start mt-4 margin-bottom-0-63'
						/>
						<Body
							type={BodyType.p2}
							color={BodyColor.dark}
							classname='text-start'
						>
							3.1 By using our services, you agree to provide accurate and current information and to ensure the security of your account credentials.
						</Body>
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