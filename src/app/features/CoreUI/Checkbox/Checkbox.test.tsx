import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  afterEach(cleanup);

  it('renders in regular mode', () => {
    const { container } = render(<Checkbox label='Label' checked={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders in disabled mode', () => {
    const { container } = render(
      <Checkbox label='Label' checked={false} disabled />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('displays checked status', () => {
    const { container } = render(<Checkbox label='Label' checked />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('invokes onChange(true) on click, if not checked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox label='Label' checked={false} onChange={onChange} />,
    );
    const element = container.getElementsByTagName('label')[0];
    fireEvent.click(element);
    expect(onChange).toBeCalledWith(true);
  });

  it('invokes onChange(false) on click, if checked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox label='Label' checked onChange={onChange} />,
    );
    const element = container.getElementsByTagName('label')[0];
    fireEvent.click(element);
    expect(onChange).toBeCalledWith(false);
  });

  it("doesn't invoke onChange if disabled", () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox label='Label' checked={false} onChange={onChange} />,
    );
    const element = container.getElementsByClassName('label')[0];
    fireEvent.click(element);
    expect(onChange).not.toBeCalled();
  });
});
