import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { SliderRootProps } from "@kobalte/core/slider";
import { Slider as SliderPrimitive } from "@kobalte/core/slider";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const sliderVariants = cva(
  "flex flex-col select-none touch-none",
  {
    variants: {
      size: {
        default: "h-8",
        sm: "h-6",
        lg: "h-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type SliderProps<T extends ValidComponent = "div"> = SliderRootProps<T> &
  VariantProps<typeof sliderVariants> & {
    class?: string;
  };

export const Slider = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SliderProps<T>>
) => {
  const [local, rest] = splitProps(props as SliderProps, ["class", "size"]);
  return (
    <SliderPrimitive
      class={cn(sliderVariants({ size: local.size }), local.class)}
      {...rest}
    />
  );
};

// Override subcomponents with Tailwind CSS
export const SliderLabel = SliderPrimitive.Label;

export const SliderLabelWrapper = (props: any) => (
  <div class={cn("w-full flex justify-between", props.class)}>
    {props.children}
  </div>
);
export const SliderValueLabel = (props: any) => (
  <SliderPrimitive.ValueLabel {...props} />
);
export const SliderTrack = (props: any) => (
  <SliderPrimitive.Track
    class={cn(
      "relative rounded-full h-10 w-full bg-[hsl(240_6%_90%)]",
      props.class
    )}
    {...props}
  />
);
export const SliderFill = (props: any) => (
  <SliderPrimitive.Fill
    class={cn(
      "absolute bg-[var(--primary)] rounded-full h-full",
      props.class
    )}
    {...props}
  />
);
export const SliderThumb = (props: any) => (
  <SliderPrimitive.Thumb
    class={cn(
      "block w-4 h-4 bg-[var(--primary-foreground)] rounded-full drop-shadow-sm -top-1 hover:shadow-[0_0_0_5px_#2a91fe98] focus:outline-none focus:shadow-[0_0_0_5px_#2a91fe98]",
      props.class
    )}
    {...props}
  />
);
export const SliderInput = (props: any) => <SliderPrimitive.Input {...props} />;
