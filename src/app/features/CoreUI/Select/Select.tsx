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

const Select: FC<Props> = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setOpen] = useState(false);

  let displayValue: string | null;
  let handleSelect: (key: string) => void;
  const getOptionDisplayName = (key: string) =>
    options.find(option => option.key === key)!.label;
  let isMultipleMode: boolean;
  if (Array.isArray(value)) {
    isMultipleMode = true;
    displayValue =
      value.length === 0 ? null : value.map(getOptionDisplayName).join(', ');
    handleSelect = key => {
      if (value.includes(key))
        onChange(value.filter(existingKey => existingKey !== key));
      else onChange([...value, key]);
    };
  } else {
    isMultipleMode = false;
    displayValue = value === null ? null : getOptionDisplayName(value);
    handleSelect = onChange;
  }

  const label = displayValue || placeholder || 'Select an option';

  return (
    <DropDownMenu
      label={label}
      options={options}
      isOpen={isOpen}
      onOpen={setOpen}
      selectedKeys={Array.isArray(value) ? value : undefined}
      onSelect={handleSelect}
      noCloseOnSelect={isMultipleMode}
    />
  );
};

export default Select;
