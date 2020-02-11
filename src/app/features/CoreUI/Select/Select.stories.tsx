import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import Select from './Select';
import '../../App/Root/Root.scss';

export default {
  component: Select,
  title: 'Select',
};

export const normal = () => (
  <Select
    options={[
      { key: '1', label: 'One' },
      { key: '2', label: 'Two' },
      { key: '3', label: 'Three' },
    ]}
    value='1'
    onChange={action('change')}
  />
);

export const multiple = () => (
  <Select
    options={[
      { key: '1', label: 'One' },
      { key: '2', label: 'Two' },
      { key: '3', label: 'Three' },
    ]}
    value={['1', '2']}
    onChange={action('change')}
  />
);

const Controller: React.FC<{ multipleMode: boolean }> = ({ multipleMode }) => {
  const [state, setState] = useState<string | string[] | null>(
    multipleMode ? [] : null,
  );
  return (
    <Select
      options={[
        { key: '1', label: 'One' },
        { key: '2', label: 'Two' },
        { key: '3', label: 'Three' },
      ]}
      value={state}
      onChange={setState}
    />
  );
};

export const controlledSingle = () => <Controller multipleMode={false} />;

export const controlledMultiple = () => <Controller multipleMode />;
