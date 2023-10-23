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
      region: string;
      address: string;
      enmasseThesis: {
          TotalAddressableMarket: number | null;
          medianAnnualEHTransactionalValue: number | null;
          numberOfEH: number | null;
      };
      EHEconmicActivityIndicators: {
          pointsOfInterest: number;
          healthcarePointsOfInterest: number;
          educationPointsOfInterest: number;
          agricultureMarketPointsOfInterest: number;
          financialSolutionsPointsOfInterest: number;
      };
      EHSpend: {
          annualEHSpend: number | null;
          annualAnnualEHSpendOnCore: number | null;
          annualAnnualEHSpendOnNoncore: number | null;
          healthcareMedianAnnualSpend: number;
          healthcareSpendUOM: string;
          educationMedianAnnualSpend: number;
          educationSpendUOM: string;
          agricultureMarketMedianAnnualSpend: number;
          agricultureMarketSpendUOM: string;
          financialSolutionsMedianAnnualSpend: number;
          financialSolutionsSpendUOM: string;
      };
      EHIncome: {
          averageAnnualEHIncomeFromVariableSources: number | null;
          annualEHIncome: number | null;
          averageAnnualEHIncomeFromInformalSources: number | null;
          healthcareMedianAnnualIncome: number;
          healthcareIncomeUOM: string;
          educationMedianAnnualIncome: number;
          educationIncomeUOM: string;
          agricultureMarketMedianAnnualIncome: number;
          agricultureMarketIncomeUOM: string;
          financialSolutionsMedianAnnualIncome: number;
          financialSolutionsIncomeUOM: string;
      };
      EHBorrow: {
          averageAnnualEHBorrowingFromFormalSources: number | null;
          annualEHBorrowing: number | null;
          averageAnnualEHBorrowingFromInformalSources: number | null;
          healthcareMedianAnnualBorrow: number;
          healthcareBorrowUOM: string;
          educationMedianAnnualBorrow: number;
          educationBorrowUOM: string;
          agricultureMarketMedianAnnualBorrow: number;
          agricultureMarketBorrowUOM: string;
          financialSolutionsMedianAnnualBorrow: number;
          financialSolutionsBorrowUOM: string;
      };
      coverage: {
          covered: number;
          total: number;
      };
  };
}

const mapFeatureState = atom({
    key: 'mapFeatures',
    default: {
        circles: [],
        stories: [],
        suggestions: [] as Suggestion[],
        cifData: {} as CifData,
        featuredStories: [],
      }
});

export { mapFeatureState };
