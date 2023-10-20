import { atom } from 'recoil';

const mapFeatureState = atom({
    key: 'mapFeatures',
    default: {
        circles: [],
        stories: [],
        cifData: {},
      }
});

export { mapFeatureState };