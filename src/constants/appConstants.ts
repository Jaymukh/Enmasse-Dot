interface TableHeaderProps {
    ID: string,
    NAME: string,
    KEYS: { KEY: string, VALUE: string, UOM?: string }[]
}

interface TableProps {
    GEO_INFO_TABLE: TableHeaderProps,
    METRIC_BREAKDOWN_TABLE: TableHeaderProps,
    // INVITE_TABLE: TableHeaderProps
}

const TABLE_HEADERS: TableProps = {
    GEO_INFO_TABLE: {
        ID: 'geo-info',
        NAME: 'Heading',
        KEYS: [
            { KEY: 'geo_value', VALUE: 'State' },
            { KEY: 'area', VALUE: 'Area (sq.Km)' },
            { KEY: 'ehPopulation', VALUE: 'EH Population' },
            { KEY: 'totalEhGtv', VALUE: 'Average Annual EH Transactional Value', UOM: 'averageEHTransactionalValueUOM' },
            { KEY: 'poi', VALUE: 'Points of Interest' }
        ],
    },
    METRIC_BREAKDOWN_TABLE: {
        ID: 'metric-breakdown',
        NAME: 'wise metric breakdown',
        KEYS: [
            { KEY: 'geoName', VALUE: 'State' },
            { KEY: 'entrepreneurialHouseholds', VALUE: 'Entrepreneurial Households' },
            { KEY: 'medianAnnualEhSpend', VALUE: 'Median Annual EH Spend' },
            { KEY: 'medianAnnualEhBorrowing', VALUE: 'Median Annual EH Borrowing' },
            { KEY: 'medianAnnualEhIncome', VALUE: 'Median Annual EH Income' },
            { KEY: 'ehTransactionValue', VALUE: 'EH Transcational Value' }
        ],
    },
    // INVITE_TABLE: {
    //     ID: 'invite',
    //     NAME: 'Invite',
    //     KEYS: [
    //         { VALUE: 'Name' },
    //         { VALUE: 'Role' },
    //         { VALUE: 'Company' },
    //         { VALUE: 'Company type' },
    //         { VALUE: 'Action' },
    //     ],
    // }
}
export { TABLE_HEADERS };
export type { TableHeaderProps };
