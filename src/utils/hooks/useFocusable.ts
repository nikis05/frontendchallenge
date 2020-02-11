import { RefObject, useEffect } from 'react';

const useFocusable = (
  ref: RefObject<HTMLElement>,
  {
    onTriggered,
    onArrowNavigation,
    forceFocus,
  }: {
    onTriggered: () => void;
    onArrowNavigation: (up: boolean) => void;
    forceFocus: boolean;
  },
) => {
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.tabIndex = 0;
      const keydownHandler = (event: KeyboardEvent) => {
        if (event.keyCode === 32 || event.keyCode === 13) onTriggered();
        if (event.keyCode === 38) onArrowNavigation(true);
        if (event.keyCode === 40) onArrowNavigation(false);
      };
      node.addEventListener('keydown', keydownHandler);
      node.addEventListener('click', onTriggered);
      if (forceFocus) node.focus();
      return () => {
        node.removeEventListener('keydown', keydownHandler);
        node.removeEventListener('click', onTriggered);
      };
    }
    return undefined;
  }, [ref, onTriggered]);
};

export default useFocusable;
