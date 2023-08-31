import { BiPlus } from 'react-icons/bi';
import { BiMinus } from 'react-icons/bi';
import { MdOutlineBookmarkAdd } from 'react-icons/md';

interface MapButtonGroupProps {
    handleZoom: (event: React.MouseEvent<HTMLButtonElement>, zoomIn: boolean) => void;
  }
  
  const MapButtonGroup: React.FC<MapButtonGroupProps> = ({ handleZoom }) => {
    return (
        <div className='d-flex flex-column justify-content-end mb-4 me-4'>
            <button className='rounded-circle bg-white border round-btn justify-content-center mb-2' >
                <MdOutlineBookmarkAdd size={20} />
            </button>
            <button className='rounded-circle bg-white border round-btn justify-content-center  mb-2' onClick={(e) => handleZoom(e, true)}>
                <BiPlus size={20} />
            </button>
            <button className='rounded-circle bg-white border round-btn justify-content-center  mb-2' onClick={(e) => handleZoom(e, false)}>
                <BiMinus size={20} />
            </button>
        </div>
    )

}

export default MapButtonGroup;