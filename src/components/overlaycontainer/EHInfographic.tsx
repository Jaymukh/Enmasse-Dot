import img4 from '../../utils/images/img4.png';
import { overlayState, showHelpState } from '../../states';
import { useSetRecoilState } from "recoil";
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';

const EHInfographic = () => {
	const setOverlay = useSetRecoilState(overlayState);
	const setShow = useSetRecoilState(showHelpState );
	return (
		<div className=''>
			<div className='bg-black-opacity d-flex flex-row justify-content-center'>
				<div className='d-flex flex-column justify-content-center EHinfograpic-div-2'>
					<Heading
					title='Region of Potent Entrepreneurial households'
					type={TypographyType.h3}
					colour={TypographyColor.secondary}
					classname='text-start'
				/>
					<p className='color-white fs-14'>Entrepreneurial households: represent households with its members engaged in opportunities of potential growth and economic activities</p>
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
							onClick={() => setShow(2)}
							classname='h-2'
						>
							Next
						</Button>
					</div>
				</div>
				<img src={img4} alt="image" width="300" height="300" className='imgBorderRadiousinfograpic' />
			</div>
		</div>
	);
}

export default EHInfographic;
