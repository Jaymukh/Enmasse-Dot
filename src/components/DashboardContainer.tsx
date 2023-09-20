import React from 'react';
import Header from './headercontainer/Header';
import DashBoard from './dashboardcontainer/DashBoard';

interface DashBoardContainerProps {
	handleVisiblePanel: (index: number) => void;
	handleOverlay: (overlay: boolean) => void;
	handleHelp: (showHelp: number) => void;
}

const DashBoardContainer: React.FC<DashBoardContainerProps> = ({
	handleVisiblePanel,
	handleOverlay,
	handleHelp,
}) => {
	return (
		<div className='w-100 primary-bg'>
			<Header
				handleVisiblePanel={handleVisiblePanel}
				handleOverlay={handleOverlay}
				handleHelp={handleHelp}
			/>
			<DashBoard />
		</div>
	);
};

export default DashBoardContainer;
