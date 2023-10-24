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
        population: number;
        totalHouseholds: number;
        enmasseThesis: {
            TotalAddressableMarket: null | number;
            medianAnnualEHTransactionalValue: null | number;
            numberOfEH: number;
        };
        EHEconmicActivityIndicators: {
            pointsOfInterest: number;
            healthcarePointsOfInterest: number;
            financialSolutionsPointsOfInterest: number;
            educationPointsOfInterest: number;
            agricultureMarketPointsOfInterest: number;
        };
        EHSpend: {
            showSpend: null | boolean;
            medianAnnualEHHouseholdSpend: null | number;
            medianAnnualEHHouseholdSpendUOM: null | string;
            medianAnnualAnnualEHSpendOnCore: null | number;
            medianAnnualAnnualEHSpendOnCoreUOM: null | string;
            medianAnnualEHSpendOnNonCoreSolutions: null | number;
            medianAnnualEHSpendOnNonCoreSolutionsUOM: null | string;
            AvergeAnnualEHSpendOnHealthcare: number;
            healthcareSpendUOM: string;
            AvergeAnnualEHSpendOnFinancialSolutions: number;
            financialSolutionsSpendUOM: string;
            AvergeAnnualEHSpendOnEducation: number;
            educationSpendUOM: string;
            AvergeAnnualEHSpendOnAgricultureMarket: number;
            agricultureMarketSpendUOM: string;
        };
        EHIncome: {
            showIncome: null | boolean;
            averageAnnualEHIncomeFromVariableSources: null | number;
            averageAnnualEHIncomeFromVariableSourcesUOM: null | string;
            annualEHIncome: null | number;
            annualEHIncomeUOM: null | string;
            averageAnnualEHIncomeFromInformalSources: null | number;
            averageAnnualEHIncomeFromInformalSourcesUOM: null | string;
            healthcareMedianAnnualIncome: number;
            healthcareIncomeUOM: string;
            financialSolutionsMedianAnnualIncome: number;
            financialSolutionsIncomeUOM: string;
            educationMedianAnnualIncome: number;
            educationIncomeUOM: string;
            agricultureMarketMedianAnnualIncome: number;
            agricultureMarketIncomeUOM: string;
        };
        EHBorrow: {
            showBorrow: null | boolean;
            medianAnuualEHBorrowingFromFormalSources: null | number;
            medianAnuualEHBorrowingFromFormalSourcesUOM: null | string;
            medianAnnualEHBorrowing: null | number;
            medianAnnualEHBorrowingUOM: null | string;
            medianAnnualEHBorrowingFromInformalSources: null | number;
            medianAnnualEHBorrowingFromInformalSourcesUOM: null | string;
            healthcareMedianAnnualBorrow: number;
            healthcareBorrowUOM: string;
            financialSolutionsMedianAnnualBorrow: number;
            financialSolutionsBorrowUOM: string;
            educationMedianAnnualBorrow: number;
            educationBorrowUOM: string;
            agricultureMarketMedianAnnualBorrow: number;
            agricultureMarketBorrowUOM: string;
        };
        EICoverage: {
            covered: number;
            total: number;
        };
    };
}

<<<<<<< HEAD
=======
export interface FeatureStories {
	featuredStories: [],
	geodata: []
}
>>>>>>> c5af6095ef50224c29639c8292465405adf3dc13

const mapFeatureState = atom({
	key: 'mapFeatures',
	default: {
		circles: [],
		stories: [],
		suggestions: [] as Suggestion[],
        cifData: {} as CifData,
<<<<<<< HEAD
        featuredStories: [],
    }
=======
		featuredStories: {} as FeatureStories,
	}
>>>>>>> c5af6095ef50224c29639c8292465405adf3dc13
});

export { mapFeatureState };
