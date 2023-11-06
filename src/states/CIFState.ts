import { type } from 'os';
import { atom } from 'recoil';

export interface geoInfoProps {
    geoId: number,
    geoName: string,
    area: number | null,
    ehPopulation: string | null,
    averageEHTransactionalValue: string | null,
    averageEHTransactionalValueUOM: string | null,
    pointsOfInterest: string | null
}

export interface metricBreakdownInfoProps {
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
    coreSolutionsByEH: {
        coreSolution: string
        pointsOfInterest: number,
        percentageContribution: number,
        color?: string | undefined;
    }[]
}

export interface cifProps {
    geoInfo: geoInfoProps[];
    metricBreakdownInfo: metricBreakdownInfoProps[];
    ehGrowthGraphData: ehGrowthGraphDataProps;
    inOutFlowData: inOutFlowDataProps[];
    coreSolutionsData: coreSolutionDataProps;
}

const cifState = atom({
    key: 'cif',
    default: {} as cifProps
});

export { cifState };