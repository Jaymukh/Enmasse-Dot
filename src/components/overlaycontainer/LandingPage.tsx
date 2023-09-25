import React from 'react';
import { useSetRecoilState } from "recoil";
import { overlayState, showHelpState } from '../../states';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

const LandingPage = () => {
	const setOverlay = useSetRecoilState(overlayState);
	const setShow = useSetRecoilState(showHelpState);
	return (
		<div className='w-100'>
			<h4 className='text-white mb-3'>
				Hello! Welcome to Enmasse | D.O.T.S
			</h4>
			<div className='d-flex flex-column justify-content-center m-auto w-100'>
				<Button
					theme={ButtonTheme.secondary}
					size={ButtonSize.medium}
					variant={ButtonVariant.bordered}
					onClick={() => setShow(1)}
					classname='mx-auto my-3'
				>
					Start Exploring
				</Button>
				<Button
					theme={ButtonTheme.secondary}
					size={ButtonSize.large}
					variant={ButtonVariant.transparent}
					onClick={() => setOverlay(false)}
					classname='m-auto'
				>
					Skip
				</Button>
			</div>
		</div>
	);
}

export default LandingPage;
