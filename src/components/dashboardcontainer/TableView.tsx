import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Table, { TableSize } from '../ui/table/Table';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { TableHeaderProps } from '../../constants';
import NoVisualData from './NoVisualData';

interface TableViewProps {
    data: any;
    headerData: TableHeaderProps;
}

const TableView: React.FC<TableViewProps> = ({ data, headerData }) => {
    return (
        <div className='white-bg pt-4 pb-5 dashboard-col p-3'>
            <div className='d-flex align-items-center m-0 p-0 mb-3'>
                <Heading
                    title={headerData.NAME}
                    type={TypographyType.h4}
                    colour={TypographyColor.dark}
                    classname='text-start px-1'
                />
                <AiOutlineInfoCircle fontSize={15} color='#b8b7b8' />
            </div>

            {(data && data?.length > 0)
                ? <Table headers={headerData} data={data} size={TableSize.medium} />
                : <NoVisualData displayImage={true} />}
        </div>
    );
};

export default TableView;