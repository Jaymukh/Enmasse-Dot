import '../../App.css';
import React from 'react';
import Drawer from '../ui/Drawer';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import WorkInProgressImage from '../../utils/images/work_in_progress.svg';

interface WIPDrawerProps {
	open: boolean;
	title: string;
	closeWIPDrawer: () => void;
	description?: string;
}

const WIPDrawer: React.FC<WIPDrawerProps> = ({ open, title, closeWIPDrawer, description }) => {

	return (
		<>
			<Drawer
				id='wip-drawer'
				title={title}
				isOpen={open}
				toggleFunction={closeWIPDrawer}
			>
				<div>
					<p className='fs-14 text-start m-0'>{description}</p>
					<div className='bookmark-div'>
						<div className="d-flex justify-content-center align-items-center mx-2 py-5">
							<div className="mx-4 my-1 dialog-div d-flex flex-column justify-content-center align-items-center py-5">
								<img src={WorkInProgressImage} className="wip-img" alt="Work in progress" width="60%" />
								<Heading
									title='Work in progress.'
									type={TypographyType.h4}
									colour={TypographyColor.dark}
									classname='pt-5'
								/>
								<p className="text-center fs-12 my-3 mx-0">Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.</p>
							</div>
						</div>
					</div>
				</div>
			</Drawer>
		</>
	);
}

export default WIPDrawer;
