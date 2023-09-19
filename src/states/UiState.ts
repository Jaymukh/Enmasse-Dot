import { atom } from "recoil";

export const visiblePanelState = atom({
    key: 'visiblePanel',
    default: 0,
});


// const [visiblePanel, setVisiblePanel] = useState(0);