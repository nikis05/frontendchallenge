import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  afterEach(cleanup);

  it('renders in regular mode', () => {
    const { container } = render(<Checkbox label="Label" checked={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders in disabled mode', () => {
    const { container } = render(
      <Checkbox label="Label" checked={false} disabled />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('displays checked status', () => {
    const { container } = render(<Checkbox label="Label" checked />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('invokes onChange(true) on click, if not checked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox label="Label" checked={false} onChange={onChange} />
    );
    const elem = container.getElementsByTagName('label')[0]!;
    fireEvent.click(elem);
    expect(onChange).toBeCalledWith(true);
  });

  it('invokes onChange(false) on click, if checked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox label="Label" checked onChange={onChange} />
    );
    const elem = container.getElementsByTagName('label')[0]!;
    fireEvent.click(elem);
    expect(onChange).toBeCalledWith(false);
  });

  it("doesn't invoke onChange if disabled", () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox label="Label" checked={false} onChange={onChange} />
    );
    const elem = container.getElementsByClassName('label')[0];
    fireEvent.click(elem);
    expect(onChange).not.toBeCalled();
  });
});
