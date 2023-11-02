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
    // type: string;
    // properties: {
    description: string;
    image: string;
    geo_id: number;
    familyName: string;
    district: string;
    state: string;
    country: string;
    address: string;
    familyDetails: FamilyDetails;
    // };
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
