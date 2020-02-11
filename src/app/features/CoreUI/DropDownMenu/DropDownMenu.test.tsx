import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import DropDownMenu from './DropDownMenu';

describe('DropDownMenu', () => {
  afterEach(cleanup);

  it('renders closed', () => {
    const { container } = render(
      <DropDownMenu label='Label' isOpen={false} options={[]} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders open with options', () => {
    const { container } = render(
      <DropDownMenu
        label='Label'
        isOpen
        options={[
          { key: 'duplicate', label: 'Duplicate' },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders selected items', () => {
    const { container } = render(
      <DropDownMenu
        label='Label'
        options={[
          { key: 'one', label: 'One' },
          { key: 'two', label: 'Two' },
          { key: 'three', label: 'Three' },
        ]}
        isOpen
        selectedKeys={['one', 'three']}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('invokes onOpen(true) if selection is clicked', () => {
    const onOpen = jest.fn();
    const { container } = render(
      <DropDownMenu label='Label' isOpen={false} onOpen={onOpen} options={[]} />,
    );
    const selectionElement = container.getElementsByClassName('selection')[0];
    fireEvent.click(selectionElement);
    expect(onOpen).toBeCalledWith(true);
  });

  it('invokes onOpen(false) if selection is clicked and is currently open', () => {
    const onOpen = jest.fn();
    const { container } = render(
      <DropDownMenu label='Label' isOpen onOpen={onOpen} options={[]} />,
    );
    const selectionElement = container.getElementsByClassName('selection')[0];
    fireEvent.click(selectionElement);
    expect(onOpen).toBeCalledWith(false);
  });

  it('invokes onOpen(false) on option select', () => {
    const onOpen = jest.fn();
    const { container } = render(
      <DropDownMenu
        label='Label'
        isOpen
        onOpen={onOpen}
        options={[{ key: 'one', label: 'One' }]}
      />,
    );
    const optionElement = container.getElementsByClassName('option')[0];
    fireEvent.click(optionElement);
    expect(onOpen).toBeCalledWith(false);
  });

  it("doesn't invoke onOpen on option select, if noOpenOnSelect is true", () => {
    const onOpen = jest.fn();
    const { container } = render(
      <DropDownMenu
        label='Label'
        isOpen
        onOpen={onOpen}
        options={[{ key: 'one', label: 'One' }]}
        noCloseOnSelect
      />,
    );
    const optionElement = container.getElementsByClassName('option')[0];
    fireEvent.click(optionElement);
    expect(onOpen).not.toBeCalled();
  });
});
