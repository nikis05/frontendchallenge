import React, { useState, FC } from 'react';
import { action } from '@storybook/addon-actions';

import DropDownMenu from './DropDownMenu';
import '../../App/Root/Root.scss';

export default {
  component: DropDownMenu,
  title: 'DropDownMenu',
};

export const normal = () => (
  <DropDownMenu
    label='Label'
    options={[
      { key: 'duplicate', label: 'Duplicate' },
      { key: 'delete', label: 'Delete', danger: true },
    ]}
    isOpen={false}
    onOpen={action('open')}
  />
);

export const active = () => (
  <DropDownMenu
    label='Label'
    options={[
      { key: 'duplicate', label: 'Duplicate' },
      { key: 'delete', label: 'Delete', danger: true },
    ]}
    isOpen
    onOpen={action('open')}
    onSelect={action('select')}
  />
);

export const multiple = () => (
  <DropDownMenu
    label='Label'
    options={[
      { key: 'one', label: 'One' },
      { key: 'two', label: 'Two' },
      { key: 'three', label: 'Three' },
    ]}
    isOpen
    selectedKeys={['one', 'three']}
    onSelect={action('select')}
  />
);

const Controller: FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [lastOption, setLastOption] = useState<string | null>(null);
  return (
    <div style={{ display: 'flex' }}>
      <DropDownMenu
        label='Label'
        options={[
          { key: 'duplicate', label: 'Duplicate' },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
        isOpen={isOpen}
        onOpen={setOpen}
        onSelect={setLastOption}
      />
      <div style={{ marginLeft: '16px' }}>
        isOpen:
        {' '}
        {JSON.stringify(isOpen)}
        <br />
        Last selected option:
        {' '}
        {JSON.stringify(lastOption)}
      </div>
    </div>
  );
};

export const controlled = () => <Controller />;
