// External libraries
import React from 'react';

// CSS
import '../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import Drawer from '../ui/Drawer';

// Utilities
import WorkInProgressImage from '../../utils/images/WIP-FINAL.svg';


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
					<Body
						type={BodyType.p2}
						color={BodyColor.dark}
						classname='text-start m-0'
					>
						{description}
					</Body>
					<div className='bookmark-div'>
						<div className="d-flex justify-content-center align-items-center mx-2 py-5">
							<div className="mx-4 my-1 dialog-div d-flex flex-column justify-content-center align-items-center py-5">
								<img src={WorkInProgressImage} className="wip-img" alt="Work in progress" width={300} height={200}/>
								<Heading
									title='Work in progress.'
									type={TypographyType.h5}
									colour={TypographyColor.dark}
									classname='pt-5'
								/>
								<Body
									type={BodyType.p3}
									color={BodyColor.dark}
									classname='text-center my-3 mx-0'
								>
									Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.
								</Body>
							</div>
						</div>
					</div>
				</div>
			</Drawer>
		</>
	);
}

export default WIPDrawer;
