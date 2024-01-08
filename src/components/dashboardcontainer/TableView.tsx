// External libraries
import { AiOutlineInfoCircle } from 'react-icons/ai';

// CSS
import '../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import Table, { TableSize } from '../ui/table/Table';
import InfoPanel from '../ui/InfoPanel';
import NoVisualData from './NoVisualData';

// Utilities
import { TableHeaderProps } from '../../constants';

interface TableViewProps {
    data: any;
    headerData: TableHeaderProps;
    infoButton: string;
    breakdownType?: string;
    classname?: string;
}

const TableView: React.FC<TableViewProps> = ({ data, headerData, infoButton, breakdownType, classname }) => {
    return (
        <div>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='p-3'>
                <div className='d-flex align-items-center m-0 p-0 mb-3'>
                    <Heading
                        title={(breakdownType) ? `${breakdownType}-wise ${headerData.NAME}` : `${headerData.NAME}`}
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='text-start px-1 my-0'
                    />
                    <InfoPanel fontSize={20} text={infoButton} />
                </div>

                {(data && data?.length > 0)
                    ? <Table headers={headerData} data={data} size={TableSize.medium} breakdownType={breakdownType} classname={classname} />
                    : <NoVisualData displayImage={true} />}
            </Card>
        </div>
    );
};

export default TableView;