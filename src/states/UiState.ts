import { atom } from "recoil";

export const visiblePanelState = atom({
    key: 'visiblePanel',
    default: 0,
});

export const overlayState = atom({
    key: 'overlay',
    default: true,
});

export const showHelpState = atom({
    key: 'showHelp',
    default: 0,
});

// const [visiblePanel, setVisiblePanel] = useState(0);
// const [overlay, setOverlay] = useState(true);
// const [showInfographic, setShowInfographic] = useState(0);