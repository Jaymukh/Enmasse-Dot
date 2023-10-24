import { atom } from 'recoil';

export interface FeatureStories {
	featuredStories: [],
	geodata: []
}


const mapFeatureState = atom({
	key: 'mapFeatures',
	default: {
		circles: [],
		stories: [],
		cifData: {},
		featuredStories: {} as FeatureStories,
	}
});

export { mapFeatureState };