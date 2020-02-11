import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Select from './Select';

describe('Select', () => {
  afterEach(cleanup);

  it('supports single select', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Select
        placeholder='placeholder'
        options={[
          { key: '1', label: 'One' },
          { key: '2', label: 'Two' },
          { key: '3', label: 'Three' },
        ]}
        value='1'
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
    const selectionElement = container.getElementsByClassName('selection')[0];
    fireEvent.click(selectionElement);
    const optionElement = container.getElementsByClassName('option')[2];
    fireEvent.click(optionElement);
    expect(onChange).toBeCalledWith('3');
  });

  it('supports multi select', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Select
        placeholder='placeholder'
        options={[
          { key: '1', label: 'One' },
          { key: '2', label: 'Two' },
          { key: '3', label: 'Three' },
        ]}
        value={['1', '3']}
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
    const selectionElement = container.getElementsByClassName('selection')[0];
    fireEvent.click(selectionElement);
    const optionElement = container.getElementsByClassName('option')[1];
    fireEvent.click(optionElement);
    expect(onChange).toBeCalledWith(['1', '3', '2']);
  });

  it('supports option deselect', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Select
        placeholder='placeholder'
        options={[
          { key: '1', label: 'One' },
          { key: '2', label: 'Two' },
          { key: '3', label: 'Three' },
        ]}
        value={['1', '3']}
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
    const selectionElement = container.getElementsByClassName('selection')[0];
    fireEvent.click(selectionElement);
    const optionElement = container.getElementsByClassName('option')[2];
    fireEvent.click(optionElement);
    expect(onChange).toBeCalledWith(['1']);
  });
});
