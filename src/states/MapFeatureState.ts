import { atom } from 'recoil';

export interface GeoLocation {
    geo_id: number;
    geo_value: string;
    has_data?: boolean;
}
export interface Suggestion {
    geo_id: number;
    geo_name: string;
    has_data: string;
    children: GeoLocation[];
};
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
            agricultureMarketActivityPointsOfInterest: string;
            educationActivityPointsOfInterest: string;
            financialSolutionsActivityPointsOfInterest: string;
            healthcareActivityPointsOfInterest: string;
        };
        EHSpend: {
            showSpend: null;
            AnnualEHSpend: string | null;
            AnnualEHSpendUOM: string | null;
            AverageAnnualEHSpendOnCore: string | null;
            AverageAnnualEHSpendOnCoreUOM: string | null;
            AverageAnnualEHSpendOnNonCoreSolutions: string | null;
            AverageAnnualEHSpendOnNonCoreSolutionsUOM: string | null;
            AvergeAnnualEHSpendOnAgricultureMarket: string;
            agricultureMarketSpendUOM: string;
            AvergeAnnualEHSpendOnEducation: string;
            educationSpendUOM: string;
            AvergeAnnualEHSpendOnFinancialSolutions: string;
            financialSolutionsSpendUOM: string;
            AvergeAnnualEHSpendOnHealthcare: string;
            healthcareSpendUOM: string;
        };
        EHIncome: {
            showIncome: null;
            averageAnnualEHIncomeFromVariableSources: string | null;
            averageAnnualEHIncomeFromVariableSourcesUOM: string | null;
            annualEHIncome: string | null;
            annualEHIncomeUOM: string | null;
            averageAnnualEHIncomeFromInformalSources: string | null;
            averageAnnualEHIncomeFromInformalSourcesUOM: string | null;
        };
        EHBorrow: {
            showBorrow: null;
            averageAnuualEHBorrowingFromFormalSources: string | null;
            averageAnuualEHBorrowingFromFormalSourcesUOM: string | null;
            averageAnnualEHBorrowing: string | null;
            averageAnnualEHBorrowingUOM: string | null;
            averageAnnualEHBorrowingFromInformalSources: string | null;
            averageAnnualEHBorrowingFromInformalSourcesUOM: string | null;
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
        suggestions: [] as any,
        cifData: {} as CifData,
        featuredStories: {} as FeatureStories,
    }
});

export { mapFeatureState };
