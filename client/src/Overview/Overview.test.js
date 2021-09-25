import React from 'react';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Overview from './Overview.jsx';

describe('Overview', () => {
  it('Test is React Component is a prototype of Overview', () => {
    expect(React.Component.isPrototypeOf(Overview)).to.be.true;
  });

  it('Jest Testing (Get it?)', () => {
    const wrapper = shallow(<App />);
    const { getByText } = render(<Overview />);
    const linkElement = getByText("Read all");
    expect(linkElement).toBeInTheDocument();
  })
})