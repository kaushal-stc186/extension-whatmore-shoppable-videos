import { useSyncExternalStore } from 'react';

// Dependency-free global store (drop-in replacement for react-hooks-global-state).
// Same public API: getGlobalState / setGlobalState / useGlobalState / GlobalStateProvider.
const initialState = {
    verticalSwiperViewActiveIndex: 0,
    isAppMuted: false,
    // true while a product page is presented over the reels modal — pauses the
    // active fullscreen video/audio; cleared on return (see EventsVerticalSwipeView)
    pausedForNavigation: false,
    brandDomainContext: 'shopify',
    isInDesignMode: true,
    isDemoBrand: true,
    whatmoreShopId: '58669793418',
    whatmorePrimaryFont: 'sans-serif',
    whatmorePrimaryColor: '#d97777',
    whatmoreAllowAutoSlide: true,
    whatmoreAddedToCart: false,
    commandsObject: {},
    template: 'template-swipe-a',
    modalUsed: true,
    activateMock: false,
    collectionId: "",
    customStyles: {}
};

let state = { ...initialState };
const listeners = new Set();

export function getGlobalState(key) {
    return state[key];
}

export function setGlobalState(key, value) {
    const next = typeof value === 'function' ? value(state[key]) : value;
    if (state[key] === next) return;
    state = { ...state, [key]: next };
    listeners.forEach((l) => l());
}

export function useGlobalState(key) {
    const value = useSyncExternalStore(
        (onStoreChange) => {
            listeners.add(onStoreChange);
            return () => listeners.delete(onStoreChange);
        },
        () => state[key]
    );
    const setValue = (v) => setGlobalState(key, v);
    return [value, setValue];
}

// kept for API compatibility — the store is module-scoped, no provider needed
export function GlobalStateProvider({ children }) {
    return children;
}
