import React from 'react';
import img5 from '../../utils/images/img5.png';
import { useSetRecoilState } from "recoil";
import { overlayState, showHelpState } from '../../states';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';

const ISPInfographic = () => {
	const setOverlay = useSetRecoilState(overlayState);
	const setShow = useSetRecoilState(showHelpState);
	return (
		<div >
			<div className='bg-black-opacity d-flex flex-row justify-content-center'>
				<div className='d-flex flex-column justify-content-right EHinfograpic-div-2'>
					<Heading
						title='Contextual Information Feed'
						type={TypographyType.h3}
						colour={TypographyColor.secondary}
						classname='text-start'
					/>
					<p className='color-white'>An expandable summary screen inclusive of demographic and characteristic activity of the region of opportunity</p>
					<div className='d-flex justify-content-between '>
						<Button
							theme={ButtonTheme.secondary}
							size={ButtonSize.default}
							variant={ButtonVariant.transparent}
							onClick={() => setOverlay(false)}
							classname='h-2 text-decoration-underline'
						>
							Skip
						</Button>
						<Button
							theme={ButtonTheme.secondary}
							size={ButtonSize.default}
							variant={ButtonVariant.contained}
							onClick={() => setShow(3)}
							classname='h-2'
						>
							Next
						</Button>
					</div>
				</div>
				<img src={img5} alt="Image 5" width="300" height="300" className='contextualinfo' />
			</div>
		</div>
	);
}

export default ISPInfographic;
