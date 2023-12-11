import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../../styles/main.css'
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

interface InfoPanelProps {
    text: string;
    fontSize: number;
    classname?: string;
}
const InfoPanel: React.FC<InfoPanelProps> = ({ text, fontSize, classname }) => {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [infoText, setInfoText] = useState('');
    const [showMore, setShowMore] = useState(false);

    const handlePopup = () => {
        if (text) {
            const wordLimit = 7;
            const words = text?.split(/\s+/).filter((word: any) => word !== '');

            if (words?.length > wordLimit) {
                // Truncate the input to the word limit
                const truncatedInput = words?.slice(0, wordLimit).join(' ');
                setInfoText(truncatedInput);
                setShowMore(true);
            }
            else {
                setInfoText(text);
            }
        }
        else{
            setInfoText('Info text');
        }
        setShowPopup(true);
    }

    const handleClickOutside = (event: { target: any; }) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleReadMore = () => {
        setInfoText(text);
        setShowMore(false);
    }

    return (
        <div className="info-container" ref={menuRef}>
            <div
                className="cursor-pointer infoIcon"
                onClick={() => handlePopup()}
            >
                <AiOutlineInfoCircle fontSize={fontSize} className='icon-color-5 mx-1' />
            </div>
            {showPopup && (
                <div className={`popup ${classname}`} style={{ zIndex: 1000 }}>
                    <p className='m-0'>
                        {infoText}
                        {showMore
                            && <>
                                ... <Button
                                    theme={ButtonTheme.success}
                                    size={ButtonSize.default}
                                    variant={ButtonVariant.transparent}
                                    onClick={() => handleReadMore()}
                                    classname='m-0 h-auto'
                                >
                                    Read More
                                </Button>
                            </>
                        }
                    </p>
                </div>
            )}
        </div>
    )
}

export default InfoPanel