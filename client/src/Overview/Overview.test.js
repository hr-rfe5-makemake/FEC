import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import enzyme from 'enzyme';

import Overview from './Overview.jsx';

describe('Overview', () => {
  it('Test is React Component is a prototype of Overview', () => {
    expect(React.Component.isPrototypeOf(Overview)).to.be.true;
  });

  it('Shoule work with async functions', () => {
    const wrap = enzyme.shallow(<Overview />);
    setTimeout(() => {
      wrap.update();
      expect(wrap).toEqual('Camo Onesie');
    }, 600)
  })
})