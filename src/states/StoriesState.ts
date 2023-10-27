import { atom } from "recoil";

interface FamilyDetails {
    familyMembers: string;
    householdSpend: string;
    spendUOM: string;
    householdIncome: string;
    incomeUOM: string;
    householdBorrowing: string;
    borrowUOM: string;
}

interface Family {
    description: string;
    image: string;
    familyName: string;
    district: string;
    state: string;
    country: string;
    address: string;
    familyDetails: FamilyDetails;
    geo_id: number;
    geometry: {
        type: string;
        coordinates: [number, number];
    };
}

export interface Stories {
    type: string;
    page: string;
    totalStories: number;
    family: Family[];
    properties: any;
}


export const storiesState = atom({
    key: 'stories',
    default: {} as Stories,
});
