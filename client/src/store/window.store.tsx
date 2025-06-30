import { Accessor, onMount } from "solid-js";
import { createWithSignal } from "solid-zustand";

interface DimensionState {
  windowWidth: number;
  windowHeight: number;
}

const getWindowDimensions = (): DimensionState => ({
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
});

export const useDimensionsStore = createWithSignal<DimensionState>()(() =>
  getWindowDimensions()
);

onMount(() => {
  function handleResize() {
    useDimensionsStore.setState(getWindowDimensions());
  }
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
});

export const useIsMobile: () => Accessor<boolean> = () => () => useDimensionsStore(state => state.windowWidth)() <= 768;
