import React, { FC, useRef, useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './DropDownMenu.module.scss';
import Label from '../Label/Label';
import ArrowIcon from '../Icons/ArrowIcon';
import useFocusable from '../../../../utils/hooks/useFocusable';
import Option, { MenuOption } from './Option/Option';

interface Props {
  /**
   * Label of the menu, shown in handle
   */
  label: string;

  /**
   * List of options to render
   */
  options: MenuOption[];

  /**
   * Current open state
   */
  isOpen: boolean;

  /**
   * Callback to listen on open state changes
   */
  onOpen?: (open: boolean) => void;

  /**
   * Callback when menu item is selected
   */
  onSelect?: (key: string) => void;

  /**
   * If provided, options are rendered with checkboxes. Checkboxes are checked
   * in options with respective keys
   */
  selectedKeys?: string[];

  /**
   * Disables automatic close on select
   */
  noCloseOnSelect?: boolean;
}

const DropDownMenu: FC<Props> = ({
  label,
  options,
  isOpen,
  onOpen,
  onSelect,
  selectedKeys,
  noCloseOnSelect,
}) => {
  // Current position of focus in the element. 0 = focus on handle, 1+ = focus
  // on respective option
  const [focusIndex, setFocusIndex] = useState(0);

  // Change focus when arrows used to navigate up/down the menu
  const handleArrowNavigation = (up: boolean) => {
    let targetIndex: number;
    // Enable circular navigation, e.g. if keyup is pressed wjile topmost
    // component is focused, focus is moved to bottom
    if (focusIndex === options.length && !up) targetIndex = 0;
    else if (focusIndex === 0 && up) targetIndex = options.length;
    // Basic up/down navigation
    else targetIndex = focusIndex + (up ? -1 : 1);
    setFocusIndex(targetIndex);
  };

  const handleOpen = () => {
    if (onOpen) onOpen(!isOpen);
  };

  const selectionReference = useRef<HTMLDivElement>(null);

  useFocusable(selectionReference, {
    onTriggered: handleOpen,
    onArrowNavigation: handleArrowNavigation,
    // Focus should be forced on handle if no option has focus and if menu is
    // open
    forceFocus: focusIndex === 0 && isOpen,
  });

  // On close focus position is reset. Not doing it on open to prevent glitches
  useEffect(() => {
    if (!isOpen) setFocusIndex(0);
  }, [isOpen]);

  const optionNodes = options.map((option, index) => {
    // Whether or not option should take focus
    const focusIsOnOption = focusIndex === index + 1;

    // Invoked when option is selected
    const handleSelect = () => {
      if (onSelect) onSelect(option.key);
      // Move focus to selected option
      setFocusIndex(index + 1);
      // Auto close on select
      if (!noCloseOnSelect && onOpen) onOpen(false);
    };

    // Whether or not to render checkbox and is it checked
    const isSelected = selectedKeys === undefined
      ? undefined
      : selectedKeys.includes(option.key);

    return (
      <Option
        key={option.key}
        option={option}
        forceFocus={focusIsOnOption}
        onArrowNavigation={handleArrowNavigation}
        onSelect={handleSelect}
        isSelected={isSelected}
      />
    );
  });

  return (
    <div className={classNames(styles.container, { [styles.isOpen]: isOpen })}>
      <div className={styles.selection} ref={selectionReference}>
        <Label title={label} position='inline' />
        <ArrowIcon className={styles.arrow} />
      </div>
      <div className={styles.wrapper}>{optionNodes}</div>
    </div>
  );
};

export default DropDownMenu;
