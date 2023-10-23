import { atom } from 'recoil';

const mapFeatureState = atom({
    key: 'mapFeatures',
    default: {
        circles: [],
        stories: [],
        featuredStories: [],
      }
});

export { mapFeatureState };