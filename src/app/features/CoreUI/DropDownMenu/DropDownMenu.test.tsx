import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import DropDownMenu from './DropDownMenu';

describe('DropDownMenu', () => {
  afterEach(cleanup);

  it('renders closed', () => {
    const { container } = render(
      <DropDownMenu label="Label" isOpen={false} options={[]} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders open with options', () => {
    const { container } = render(
      <DropDownMenu
        label="Label"
        isOpen={true}
        options={[
          { key: 'duplicate', label: 'Duplicate' },
          { key: 'delete', label: 'Delete', danger: true }
        ]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders selected items', () => {
    const { container } = render(
      <DropDownMenu
        label="Label"
        options={[
          { key: 'one', label: 'One' },
          { key: 'two', label: 'Two' },
          { key: 'three', label: 'Three' }
        ]}
        isOpen={true}
        selectedKeys={['one', 'three']}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('invokes onOpen(true) if handle is clicked', () => {
    const onOpen = jest.fn();
    const { container } = render(
      <DropDownMenu label="Label" isOpen={false} onOpen={onOpen} options={[]} />
    );
    const handleElem = container.getElementsByClassName('handle')[0];
    fireEvent.click(handleElem);
    expect(onOpen).toBeCalledWith(true);
  });

  it('invokes onOpen(false) if handle is clicked and is currently open', () => {
    const onOpen = jest.fn();
    const { container } = render(
      <DropDownMenu label="Label" isOpen onOpen={onOpen} options={[]} />
    );
    const handleElem = container.getElementsByClassName('handle')[0];
    fireEvent.click(handleElem);
    expect(onOpen).toBeCalledWith(false);
  });

  it('invokes onOpen(false) on option select', () => {
    const onOpen = jest.fn();
    const { container } = render(
      <DropDownMenu
        label="Label"
        isOpen
        onOpen={onOpen}
        options={[{ key: 'one', label: 'One' }]}
      />
    );
    const optionElem = container.getElementsByClassName('option')[0];
    fireEvent.click(optionElem);
    expect(onOpen).toBeCalledWith(false);
  });

  it("doesn't invoke onOpen on option select, if noOpenOnSelect is true", () => {
    const onOpen = jest.fn();
    const { container } = render(
      <DropDownMenu
        label="Label"
        isOpen
        onOpen={onOpen}
        options={[{ key: 'one', label: 'One' }]}
        noCloseOnSelect
      />
    );
    const optionElem = container.getElementsByClassName('option')[0];
    fireEvent.click(optionElem);
    expect(onOpen).not.toBeCalled();
  });
});
