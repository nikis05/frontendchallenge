import React, { useState, FC } from 'react';

import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { MenuOption } from '../DropDownMenu/Option/Option';

interface Props {
  /**
   * A list of Select options
   */
  options: MenuOption[];

  /**
   * Placeholder to show when no ouption is selected
   */
  placeholder?: string;

  /**
   * Current value of Select
   */
  value: string | null | string[];

  /**
   * Register callback for change event
   */
  onChange: (value: string | null | string[]) => void;
}

// Returns current value of select as display string. For empty value falls back
// to placeholder if provided. Otherwise returns default placeholder.
const getMenuLabel = (
  options: MenuOption[],
  value: string | null | string[],
  customPlaceholder: string | undefined,
) => {
  const getOptionDisplayName = (key: string) => options.find((option) => option.key === key)!.label;
  const placeholder = customPlaceholder || 'Select an option';
  if (Array.isArray(value)) {
    if (value.length === 0) return placeholder;
    return value.map(getOptionDisplayName).join(', ');
  }
  if (value === null) return placeholder;
  return getOptionDisplayName(value);
};

const removeFromArray = (array: string[], key: string) => array.filter((existingKey) => existingKey !== key);

const addToArray = (array: string[], key: string) => [...array, key];

const Select: FC<Props> = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setOpen] = useState(false);
  const isMultipleMode = Array.isArray(value);

  const handleSelect = (key: string) => {
    // In multiple mode, calls onChange with updated array of selected keys
    if (isMultipleMode) {
      // Typescript type assertion
      const valueAsArray = value as string[];
      // If key is currently present in array, remove it from array
      if (valueAsArray.includes(key)) onChange(removeFromArray(valueAsArray, key));
      // Otherwise add it to array
      else onChange(addToArray(valueAsArray, key));
    } else onChange(key);
  };

  const menuLabel = getMenuLabel(options, value, placeholder);
  const selectedKeys = Array.isArray(value) ? value : undefined;

  return (
    <DropDownMenu
      label={menuLabel}
      options={options}
      isOpen={isOpen}
      onOpen={setOpen}
      selectedKeys={selectedKeys}
      onSelect={handleSelect}
      noCloseOnSelect={isMultipleMode}
    />
  );
};

export default Select;
