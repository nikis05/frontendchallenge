import React, { FC, KeyboardEvent, forwardRef, Ref } from 'react';
import classNames from 'classnames';

import styles from './Label.module.scss';

interface Props {
  /**
   * Displayed title
   */
  title: string;

  /**
   * Position of label relative to children (above child, to the right of child, ...)
   */
  position?: 'above' | 'right' | 'inline';

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;

  /**
   * tab index
   */
  tabIndex?: number;

  /**
   * label className
   */
  className?: string;

  /**
   * React ref passtrough to label
   */
  ref?: Ref<HTMLLabelElement>;

  /**
   * Handle keyboard events
   */
  onKeyPress?: (event: KeyboardEvent<HTMLLabelElement>) => void;

  /**
   * Fix to prevent double onClick events when using with input
   */
  preventBubbling?: boolean;
}

const Label: FC<Props> = forwardRef((props, ref) => {
  const {
    children,
    title,
    position,
    disabled,
    tabIndex,
    onKeyPress,
    className
  } = props;

  const text = (
    <div
      className={styles.label}
      onClick={e => {
        if (props.preventBubbling) e.stopPropagation();
      }}
    >
      {title}
    </div>
  );
  const classes = classNames(styles.container, className, {
    [styles.right]: position === 'right',
    [styles.inline]: position === 'inline',
    [styles.disabled]: disabled
  });

  return (
    <label
      className={classes}
      ref={ref}
      tabIndex={tabIndex}
      onKeyPress={onKeyPress}
      role="presentation"
    >
      {text}
      {children}
    </label>
  );
});

export default Label;
