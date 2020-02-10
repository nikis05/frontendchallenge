import { RefObject, useEffect } from 'react';

export const useFocusable = (
  ref: RefObject<any>,
  {
    onTriggered,
    onArrowNavigation,
    forceFocus
  }: {
    onTriggered: () => void;
    onArrowNavigation: (up: boolean) => void;
    forceFocus: boolean;
  }
) => {
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.tabIndex = 0;
      const handler = (e: KeyboardEvent) => {
        if (e.keyCode === 32 || e.keyCode === 13) onTriggered();
        console.log(e.keyCode);
        if (e.keyCode === 38) onArrowNavigation(true);
        if (e.keyCode === 40) onArrowNavigation(false);
      };
      node.addEventListener('keydown', handler);
      if (forceFocus) node.focus();
      return () => {
        node.tabIndex = undefined;
        node.removeEventListener('keydown', handler);
      };
    }
  }, [ref, onTriggered]);
};
