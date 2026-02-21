import { Accessor, createSignal } from "solid-js";
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
  getWindowDimensions(),
);

const handleResize = () => {
  useDimensionsStore.setState(getWindowDimensions());
};

window.addEventListener("resize", handleResize);

export const useIsMobile: () => Accessor<boolean> = () => () =>
  useDimensionsStore((state) => state.windowWidth)() <= 768;

const savedTheme = localStorage.getItem("theme");
export const [isDarkMode, setIsDarkMode] = createSignal(savedTheme === "dark");

export const useIsDarkMode: () => Accessor<boolean> = () => isDarkMode;
