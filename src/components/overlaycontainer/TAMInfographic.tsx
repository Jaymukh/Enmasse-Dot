import React from 'react';
import '../../App.css';
import img6 from '../../utils/images/img6.png';
import { useSetRecoilState } from "recoil";
import { overlayState } from '../../states';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

interface TAMInfographicProps {
}

const TAMInfographic: React.FC<TAMInfographicProps> = ({
}) => {
	const setOverlay = useSetRecoilState(overlayState);
	return (
		<div className=''>
			<div className='bg-black-opacity d-flex flex-row justify-content-center'>
				<div className='d-flex flex-column justify-content-right TotalAdressableMarket-div-2'>
					<h5 className='color-white justify-content-start'>Total Addressable Market (TAM)</h5>
					<p className='color-white'>Total Addressable Market (TAM) refers to the total revenue opportunity available for you to act upon</p>
					<div className='d-flex justify-content-between '>
						{/* <button className='border-0 bg-transparent text-white px-4 py-2 rounded-1' onClick={() => setOverlay(false)}>Skip</button> */}
						<Button
							theme={ButtonTheme.primary}
							size={ButtonSize.default}
							variant={ButtonVariant.transparent}
							onClick={() => setOverlay(false)}
						>
							Skip
						</Button>
						{/* <button className="btn btn-light btn-height" onClick={() => setOverlay(false)}>Next</button> */}
						<Button
							theme={ButtonTheme.secondary}
							size={ButtonSize.default}
							variant={ButtonVariant.contained}
							onClick={() => setOverlay(false)}
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
