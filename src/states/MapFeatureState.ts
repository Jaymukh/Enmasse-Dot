import { atom } from 'recoil';

const mapFeatureState = atom({
    key: 'mapFeatures',
    default: {
        circles: [],
        stories: [],
        cifData: {},
        featuredStories: [],
      }
});

export { mapFeatureState };