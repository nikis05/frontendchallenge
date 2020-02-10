import React, { FC, useState } from 'react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox';
import '../../App/Root/Root.scss';

export default {
  component: Checkbox,
  title: 'Checkbox'
};

export const normal = () => (
  <Checkbox label="Label" onChange={action('changed')} checked />
);

export const disabled = () => (
  <Checkbox label="Label" checked={false} disabled />
);

const Controller: FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Checkbox label="Label" checked={checked} onChange={setChecked} />
      <div>Checked: {JSON.stringify(checked)}</div>
    </>
  );
};

export const controlled = () => <Controller />;
