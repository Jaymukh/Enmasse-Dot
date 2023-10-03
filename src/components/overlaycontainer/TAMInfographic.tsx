import React from 'react';
import '../../App.css';
import img6 from '../../utils/images/img6.png';
import { useSetRecoilState } from "recoil";
import { overlayState } from '../../states';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';

const TAMInfographic = () => {
	const setOverlay = useSetRecoilState(overlayState);
	return (
		<div className=''>
			<div className='bg-black-opacity d-flex flex-row justify-content-center'>
				<div className='d-flex flex-column justify-content-right TotalAdressableMarket-div-2'>
					<Heading
					title='Total Addressable Market (TAM)'
					type={TypographyType.h3}
					colour={TypographyColor.secondary}
					classname='text-start mb-2'
				/>
					<p className='color-white fs-14'>Total Addressable Market (TAM) refers to the total revenue opportunity available for you to act upon</p>
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
							onClick={() => setOverlay(false)}
							classname='h-2'
						>
							Next
						</Button>
					</div>
				</div>
				<img src={img6} alt="TAM Infographic" width="300" height="300" className='TotalAdressableMarketImg' />
			</div>
		</div>
	);
}

export default TAMInfographic;
