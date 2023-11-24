import '../../App.css';
import React, { useState } from 'react';
import { HiMiniPhone } from 'react-icons/hi2';
import WorkInProgressImage from '../../utils/images/work_in_progress.svg';
import Drawer from '../ui/Drawer';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';

const RequestDetails = () => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<div >
			<Button
				theme={ButtonTheme.secondary}
				size={ButtonSize.small}
				variant={ButtonVariant.contained}
				classname='ms-4'
				onClick={() => toggleDrawer()}>
				<HiMiniPhone className='me-2' fontSize={20} />
				Request Details
			</Button>
			<Drawer
				id='map-bussiness'
				title='Map Your Business'
				isOpen={open}
				toggleFunction={toggleDrawer}
			>
				<div className='mx-3 my-1 dialog-div'>
					<Heading
						title='Why do we need this?'
						type={TypographyType.h5}
						colour={TypographyColor.dark}
						classname='contact-para'
					/>
					<Body
						type={BodyType.p3}
						color={BodyColor.secondary}
						classname='text-wrap'
					>
						To plot your business and recommend the best opportunities for you.
					</Body>
					<div className="d-flex flex-column justify-content-center align-items-center py-5">
						<img src={WorkInProgressImage} className="wip-img" alt="Work in progress" width="60%" />
						<Heading
							title='Work in progress'
							type={TypographyType.h4}
							colour={TypographyColor.dark}
							classname='pt-5'
						/>
						<Body
						type={BodyType.p3}
						color={BodyColor.secondary}
						classname='text-center'
					>
						Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.
					</Body>
					</div>
				</div>
			</Drawer>
		</div>
	);
}

export default RequestDetails;
