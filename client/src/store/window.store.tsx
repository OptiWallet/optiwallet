import { Accessor, onCleanup, onMount } from "solid-js";
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
const handleResize = () => {
  useDimensionsStore.setState(getWindowDimensions());
};
onMount(() => {
  window.addEventListener("resize", handleResize);
});
onCleanup(() => window.removeEventListener("resize", handleResize));

export const useIsMobile: () => Accessor<boolean> = () => () =>
  useDimensionsStore((state) => state.windowWidth)() <= 768;
