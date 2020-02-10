import React, { FC, useRef } from 'react';
import { useFocusable } from '../../../../../utils/hooks/useFocusable';
import Label from '../../Label/Label';
import classNames from 'classnames';
import styles from '../DropDownMenu.module.scss';
import Checkbox from '../../Checkbox/Checkbox';

export interface MenuOption {
  /**
   * Option key, must be unique
   */
  key: string;

  /**
   * Display label of option
   */
  label: string;

  /**
   * If true option is colored red
   */
  danger?: boolean;
}

interface Props {
  option: MenuOption;
  forceFocus: boolean;
  onArrowNavigation: (up: boolean) => void;
  onSelect: () => void;
  isSelected?: boolean;
}

const Option: FC<Props> = ({
  option,
  forceFocus,
  onArrowNavigation,
  onSelect,
  isSelected
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useFocusable(ref, { onTriggered: onSelect, forceFocus, onArrowNavigation });
  return (
    <div ref={ref} className={styles.option} onClick={onSelect}>
      {isSelected === undefined ? (
        <Label
          title={option.label}
          position="inline"
          className={classNames({ [styles.label_danger]: option.danger })}
        />
      ) : (
        <Checkbox label={option.label} checked={isSelected} />
      )}
    </div>
  );
};

export default Option;
