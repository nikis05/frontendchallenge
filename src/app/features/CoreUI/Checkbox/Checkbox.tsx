import React, { forwardRef, useRef } from 'react';

import Label from '../Label/Label';
import CheckboxIcon from '../Icons/CheckboxIcon';
import styles from './Checkbox.module.scss';
import useHover from '../../../../utils/hooks/useHover';
import useFocus from '../../../../utils/hooks/useFocus';
import useCombinedRefs from '../../../../utils/hooks/useCombinedRefs';

interface Props {
  /**
   * Label to show next to checkbox
   */
  label: string;

  /**
   * Current value of input
   */
  checked: boolean;

  /**
   * Register callback for change event
   */
  onChange?: (checked: boolean) => void;

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, checked, onChange, disabled }, ref) => {
    const labelRef = useRef<HTMLDivElement>(null);
    // Used for internal logic (tracking focus)
    const internalCheckboxRef = useRef<HTMLInputElement>(null);
    // Actual input receives combined ref of internal ref and external one to
    // use with react-hook-form
    const checkboxRef = useCombinedRefs(ref, internalCheckboxRef);
    const hasHover = useHover(labelRef);
    const hasFocus = useFocus(internalCheckboxRef);

    return (
      <div ref={labelRef} className={styles.container}>
        <Label
          title={label}
          position="right"
          disabled={disabled}
          preventBubbling
        >
          <CheckboxIcon
            hasHover={!disabled && (hasHover || hasFocus)}
            isActive={checked}
          />
          <input
            type="checkbox"
            className={styles.input}
            checked={checked}
            onChange={e => {
              if (onChange) onChange(e.target.checked);
            }}
            ref={checkboxRef}
            disabled={disabled}
          />
        </Label>
      </div>
    );
  }
);

export default Checkbox;
