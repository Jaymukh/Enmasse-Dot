import { atom } from 'recoil';

export interface geoInfoProps {
    breakdownType: string;
    data: geoInfoTableProps[];
    show: boolean;
}


export interface geoInfoTableProps {
    geoId: number,
    geoName: string,
    area: number | null,
    ehPopulation: string | null,
    averageEHTransactionalValue: string | null,
    averageEHTransactionalValueUOM: string | null,
    pointsOfInterest: string | null
}

export interface metricBreakdownInfoProps {
    breakdownType: string;
    data: metricBreakdownInfoTableProps[];
}

export interface metricBreakdownInfoTableProps {
    geoId: number,
    geoName: string,
    entrepreneurialHouseholds: number | null,
    medianAnnualEhSpend: number | null,
    medianAnnualEhBorrowing: number | null,
    medianAnnualEhIncome: number | null,
    ehTransactionValue: number | null
}

export interface ehGrowthGraphDataProps {
    geoId: string,
    geoName: string,
    ehGrowth: { value: string | null, period: string }[],
    averageEhTransactionalValue: { value: null | string, uom: null | string, period: string | null }[]
}

export interface inOutFlowDataProps {
    geoId: number,
    parentId: number,
    geoValue: string,
    dataPeriod: string,
    medianAnnualIncome: number | null,
    medianAnnualBorrow: number | null,
    outflow: number | null,
    inflow: number | null
}

export interface coreSolutionDataProps {
    geoData: {
        geoId: number,
        geoName: string,
        region: string
    },
    coreSolutionsByEH: CoreSolutionByEH[]
}

export interface CoreSolutionByEH {
    type: string;
    coreSolution: string;
    pointsOfInterest: number;
    percentageContribution: number;
    subcategory: Subcategory[];
    color?: string | undefined;    
}

export interface Subcategory {
    name: string;
    value: string;
}

export interface cifProps {
    geoInfo: geoInfoProps;
    metricBreakdownInfo: metricBreakdownInfoProps;
    ehGrowthGraphData: ehGrowthGraphDataProps;
    inOutFlowData: inOutFlowDataProps[];
    coreSolutionsData: coreSolutionDataProps;
}

const cifState = atom({
    key: 'cif',
    default: {} as cifProps
});

export { cifState };
