import React from 'react';
import renderer from 'react-test-renderer';

import Signup from '../components/authentication/signup';

describe('Signup component test', () => {
  it('renders', () => {
    renderer.create(<Signup/>);
  });
});