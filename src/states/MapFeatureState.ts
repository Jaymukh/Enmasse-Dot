import { atom } from 'recoil';

export interface GeoLocation {
    geo_id: number;
    name: string;
    children?: GeoLocation[];
}
export interface Suggestion {
    type: string; // You might want to specify the actual type here
    properties: {
        region: string;
        address: string;
        children: GeoLocation[];
    };
}
export interface CifData {
    type: string;
    properties: {
        geo_id: string;
        region: string;
        address: string;
        totalPopulation: string | null;
        totalHouseholds: string | null;
        enMassesThesis: {
            totalAddressableMarket: null | number;
            totalAddressableMarketUOM: null | string;
            averageAnnualEHTransactionalValue: null | number;
            averageAnnualEHTransactionalValueUOM: null | string;
            numberOfEntrepreneurialHouseholds: null | string;
        };
        EHEconomicActivityIndicators: {
            pointsOfInterest: string;
            healthcareActivityPointsOfInterest: string;
            financialSolutionsActivityPointsOfInterest: string;
            educationActivityPointsOfInterest: string;
            agricultureMarketActivityPointsOfInterest: string;
        };
        EHSpend: {
            AnnualEHSpend: null | string;
            AnnualEHSpendUOM: null | string;
            AverageAnnualEHSpendOnCore: null | string;
            AverageAnnualEHSpendOnCoreUOM: null | string;
            AverageAnnualEHSpendOnNonCoreSolutions: null | string;
            AverageAnnualEHSpendOnNonCoreSolutionsUOM: null | string;
            AvergeAnnualEHSpendOnAgricultureMarket: null | string;
            AvergeAnnualEHSpendOnEducation: null | string;
            AvergeAnnualEHSpendOnFinancialSolutions: null | string;
            AvergeAnnualEHSpendOnHealthcare: null | string;
            agricultureMarketSpendUOM: null | string;
            educationSpendUOM: null | string;
            financialSolutionsSpendUOM: null | string;
            healthcareSpendUOM: null | string;
            showSpend: null | string;
        };
        EHIncome: {
            annualEHIncome: null | string;
            annualEHIncomeUOM: null | string;
            averageAnnualEHIncomeFromInformalSources: null | string;
            averageAnnualEHIncomeFromInformalSourcesUOM: null | string;
            averageAnnualEHIncomeFromVariableSources: null | string;
            averageAnnualEHIncomeFromVariableSourcesUOM: null | string;
        };
        EHBorrow: {
            averageAnnualEHBorrowing: null | string;
            averageAnnualEHBorrowingFromInformalSources: null | string;
            averageAnnualEHBorrowingFromInformalSourcesUOM: null | string;
            averageAnnualEHBorrowingUOM: null | string;
            averageAnuualEHBorrowingFromFormalSources: null | string;
            averageAnuualEHBorrowingFromFormalSourcesUOM: null | string;
        };
        EICoverage: {
            covered: number;
            total: number;
        };
    };
}

export interface FeatureStories {
    featuredStories: [],
    geodata: []
}

const mapFeatureState = atom({
    key: 'mapFeatures',
    default: {
        circles: [],
        stories: [],
        suggestions: [] as Suggestion[],
        cifData: {} as CifData,
        featuredStories: {} as FeatureStories,
    }
});

export { mapFeatureState };
