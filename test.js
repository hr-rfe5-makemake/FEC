import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Overview from './client/src/Overview/Overview.jsx';

test('tests is 1 + 1 equals 2', () => {
  expect(1 + 1).toEqual(2)
})

test('should render overview', () => {
  let render = Overview.toJSON();
  expect(render).toMatchSnapshot();
})