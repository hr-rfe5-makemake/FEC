import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RelatedItems from './RelatedItems';

describe('component', ()=>{
  it('renders three <Product Card />', () => {
    const wrapper = shallow(<RelatedItems />);
    console.log(wrapper.state());
  });
});