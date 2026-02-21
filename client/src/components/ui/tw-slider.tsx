import { createSignal, Show } from "solid-js";

export interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  onInput?: (value: number) => void;
}

export const Slider = (props: SliderProps) => {
  const {
    min = 0,
    max = 5000,
    value = 0,
    step = 50,
    label,
    disabled = false,
    onInput,
  } = props;
  const [inputMode, setInputMode] = createSignal(false);
  const [internalValue, setInternalValue] = createSignal(value);

  // Keep internal value in sync with prop
  if (internalValue() !== value) setInternalValue(value);

  const handleSliderInput = (e: InputEvent) => {
    const t = e.target as HTMLInputElement;
    const val = Number(t.value);
    setInternalValue(val);
    onInput?.(val);
  };

  const handleInputChange = (e: KeyboardEvent) => {
    const t = e.target as HTMLInputElement;
    if (parseInt(t.value) < min) t.value = String(min);
    if (parseInt(t.value) > max) t.value = String(max);
    if (e.key === "Enter") {
      setInputMode(false);
      setInternalValue(Number(t.value));
      onInput?.(Number(t.value));
    }
  };

  const handleBlur = (e: FocusEvent) => {
    const t = e.target as HTMLInputElement;
    if (parseInt(t.value) < min) t.value = String(min);
    if (parseInt(t.value) > max) t.value = String(max);
    setInputMode(false);
    setInternalValue(Number(t.value));
    onInput?.(Number(t.value));
  };

  const filledTrackPercent = () =>
    ((internalValue() - min) / (max - min)) * 100;

  return (
    <div>
      <div class="flex items-center justify-between">
        <label
          for="slider-range"
          class="block mb-1 text-sm font-medium text-[var(--foreground)] dark:text-white"
        >
          {label}
        </label>
        <Show when={inputMode()}>
          <span class="block mb-1 text-sm font-medium text-[var(--foreground)] dark:text-white">
            $
            <input
              type="number"
              max={max}
              min={min}
              value={internalValue()}
              class="border-b-1 focus:border-b-1 focus:outline-none focus:ring-0 w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onKeyDown={handleInputChange}
              onBlur={handleBlur}
              autofocus
            />
          </span>
        </Show>
        <Show when={!inputMode()}>
          <span
            class="block mb-1 text-sm font-medium text-[var(--foreground)] dark:text-white cursor-pointer"
            onClick={() => setInputMode(true)}
          >
            ${internalValue()}
          </span>
        </Show>
      </div>
      <div class="relative w-full h-6 mt-1 mb-2 flex items-center">
        {/* Track background */}
        <div class="absolute h-2 w-full rounded-lg bg-gray-200 dark:bg-gray-700 top-1/2 left-0 z-0 transform -translate-y-1/2" />
        {/* Filled track */}
        <div
          class="absolute h-2 rounded-lg top-1/2 left-0 z-0 transform -translate-y-1/2 transition-[width] duration-0"
          style={{ 
            width: filledTrackPercent() + "%",
            background: "linear-gradient(to right, #0EB2FF, #3083FF, #5B47FF)"
          }}
        />
        <input
          id="slider-range"
          type="range"
          min={min}
          max={max}
          value={internalValue()}
          step={step}
          disabled={disabled || inputMode()}
          onInput={handleSliderInput}
          class="w-full h-6 bg-transparent appearance-none cursor-pointer relative z-10
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[var(--primary-foreground)]
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:drop-shadow-sm
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-all
            focus:[&::-webkit-slider-thumb]:ring-2
            focus:[&::-webkit-slider-thumb]:ring-[var(--ring)]
            [&::-webkit-slider-thumb]:appearance-none
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-[var(--primary-foreground)]
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:shadow-lg
            [&::-moz-range-thumb]:transition-all
            focus:[&::-moz-range-thumb]:ring-2
            focus:[&::-moz-range-thumb]:ring-[var(--ring)]
            [&::-ms-thumb]:h-5
            [&::-ms-thumb]:w-5
            [&::-ms-thumb]:rounded-full
            [&::-ms-thumb]:bg-[var(--primary-foreground)]
            [&::-ms-thumb]:border-2
            [&::-ms-thumb]:border-white
            [&::-ms-thumb]:shadow-lg
            [&::-ms-thumb]:transition-all
            focus:[&::-ms-thumb]:ring-2
            focus:[&::-ms-thumb]:ring-[var(--ring)]
            "
          style={{ position: "absolute", top: 0, left: 0, height: "100%" }}
        />
      </div>
    </div>
  );
};
