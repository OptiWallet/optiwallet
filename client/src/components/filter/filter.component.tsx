import { Select } from "@kobalte/core/select";
// import { CaretSortIcon, CheckIcon } from "some-icon-library";
import "./filter.component.css";

import { createSignal } from "solid-js";

export function Filter(props: {
  options: string[];
  placeholder: string;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = createSignal<string>();

  const handleChange = (val: string | null) => {
    const safeVal = val ?? "";
    setValue(safeVal);
    props.onChange?.(safeVal);
  };

  return (
    <>
      <Select
        value={value()}
        onChange={handleChange}
        options={props.options}
        placeholder={props.placeholder}
        itemComponent={(props) => (
          <Select.Item class="select__item" item={props.item}>
            <Select.ItemLabel>{props.item.rawValue as string}</Select.ItemLabel>
            <Select.ItemIndicator class="select__item-indicator">
              {/* Icon can be added here, e.g., <CaretSortIcon />, once we add icon library */}
              {/* <CheckIcon /> */}
            </Select.ItemIndicator>
          </Select.Item>
        )}
      >
        <Select.Trigger class="select__trigger">
          <Select.Value<string> class="select__value">
            {(state) => state.selectedOption()}
          </Select.Value>
          <Select.Icon>
            {/* Icon can be added here, e.g., <CaretSortIcon />, once we add icon library */}
            {/* <CaretSortIcon /> */}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content class="select__content">
            <Select.Listbox class="select__listbox" />
          </Select.Content>
        </Select.Portal>
      </Select>
    </>
  );
}
