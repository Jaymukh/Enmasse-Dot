import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import styles from "./Table.module.css";
import { getCurrencyWithSymbol } from '../../../helpers';
import { RouteConstants, TableHeaderProps } from '../../../constants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TableProps {
    headers: TableHeaderProps;
    data: any[];
    size: TableSize;
}

interface TableRowProps {
    KEY: string;
    VALUE: string;
    UOM?: string;
}

export enum TableSize {
    medium,
    large,
}

const getSizeClass = (size: TableSize) => {
    let className = "";
    switch (size) {
        case TableSize.medium:
            className = `${styles.table_medium}`;
            break;
        case TableSize.large:
            className = `${styles.table_large}`;
            break;
    }
    return className;
}

const Table: React.FC<TableProps> = ({ headers, data, size = TableSize.medium, }) => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState<any>(data);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const getConvertedValue = (value: string) => {
        const units: { [key: string]: number } = {
            'K': 1e3,
            'M': 1e6,
            'B': 1e9,
        };
        const match = value.match(/(\d+(\.\d+)?)([A-Za-z]+)?/);
        if (match && match.length > 1) {
            let numericValue = parseFloat(match[1]);
            const unit = match[3];
            numericValue *= units[unit.toUpperCase()] || 1;
            return numericValue;
        }
        return 0;
    }

    const handleSortTable = (item: TableRowProps, order: string) => {
        let sortedTable = tableData.slice().sort((a: any, b: any) => {
            if (a[item.KEY] === null && b[item.KEY] === null) {
                return 0;
            } else if (a[item.KEY] === null) {
                return 1;
            } else if (b[item.KEY] === null) {
                return -1;
            } else if (typeof a[item.KEY] === 'string' && typeof b[item.KEY] === 'string') {
                // const regex = /^[0-9]+(\.[0-9]+)?[MBK]$/i;
                const regex = /^[0-9]+(\.[0-9]+)?[MBK](illion)?$/i;
                if (regex.test(a[item.KEY]) && regex.test(b[item.KEY])) {
                    const ValueA = getConvertedValue(a[item.KEY]);
                    const ValueB = getConvertedValue(b[item.KEY]);
                    return order === 'asc' ? ValueB - ValueA : ValueA - ValueB;
                }
                return order === 'asc' ? a[item.KEY].localeCompare(b[item.KEY]) : b[item.KEY].localeCompare(a[item.KEY]);
            } else if (typeof a[item.KEY] === 'number' && typeof b[item.KEY] === 'number') {
                return order === 'asc' ? b[item.KEY] - a[item.KEY] : a[item.KEY] - b[item.KEY];
            } else {
                return 0;
            }
        });
        setTableData([...sortedTable])
    }

    const handleColClick = (item: any, keyIndex: number) => {
        if (keyIndex === 0) {
            navigate({
                pathname: RouteConstants.stories,
                search: `?geo-code=${item.geoId}&page-no=1&storiespp=2`,
            });
        }
    }

    return (
        <div className={`dashboard-table-container mx-1 ${getSizeClass(size)}`}>
            <table>
                <thead>
                    <tr>
                        {headers?.KEYS?.map((item, index) => (
                            <th className='fs-10 text-start'>
                                <div className='d-flex flex-row align-items-center'>
                                    <p className='pt-3 pe-2'>{item.VALUE}</p>
                                    <div className='d-flex flex-column'>
                                        <BiSolidUpArrow name='asc' fontSize={9} onClick={() => handleSortTable(item, 'asc')} />
                                        <BiSolidDownArrow name='desc' fontSize={9} color='#367A2B' onClick={() => handleSortTable(item, 'desc')} />
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map((item: any, index: number) => (
                        <tr key={index}>
                            {headers?.KEYS?.map((key, keyIndex) => (
                                <td
                                    className={`fs-14 ${keyIndex === 0 ? 'table-state-row' : ''}`}
                                    style={{ cursor: `${keyIndex === 0 ? 'pointer' : 'default'}` }}
                                    onClick={() => handleColClick(item, keyIndex)}
                                >
                                    {getCurrencyWithSymbol(item[key.KEY], item[key?.UOM!])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;