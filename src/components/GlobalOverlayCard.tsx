import * as Constants from '../utils/constants/Constants';

const GlobalOverlayCard = () => {
    const item = Constants.countryData[0];
    var cardItems = [
        {
            value: item.population,
            title: "Aspirational Citizens",
        },
        {
            value: item.entrepreneurialHouseholds,
            title: "Entrepreneurial Households (EH)",
        },
        {
            value: item.medianSpendonCoreSoln,
            title: "Median Annual EH Income for Core Solutions",
        },
        {
            value: item.tam,
            title: "Total Addressable Market",
        }
    ];
    return (
        <div className='d-flex bg-transparent my-2' style={{position: 'absolute', top: '0', zIndex: 1000}}>
            {cardItems.map((data, index) => (
                <div className={`d-flex flex-column px-4 py-3 my-4 h-100 ${index < 3 ? 'right-border' : ''}`}>
                    <h5 className={`fs-31 font-weight-500 text-center ${index === 3 ? 'insight-bar-green-color' : ''}`}>{data.value}</h5>
                    <p className='fs-15 font-lato font-weight-500 text-center grey-light-color'>{data.title}</p>
                </div>
            ))}
        </div>
    )
}

export default GlobalOverlayCard;