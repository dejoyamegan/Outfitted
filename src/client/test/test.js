import React from 'react';
import renderer from 'react-test-renderer';

import Signup from '../components/authentication/signup';
import Login from '../components/authentication/login';
import Closet from '../components/closet/closet';
import Outfit from '../components/outfits/outfits';
import DressingRoom from '../components/dressingroom/dressingroom';

describe('Signup component test', () => {
  it('renders', () => {
    renderer.create(<Signup/>);
  });
});
describe('Signup component test', () => {
  it('renders', () => {
    renderer.create(<Login/>);
  });
});
describe('Signup component test', () => {
  it('renders', () => {
    renderer.create(<Closet/>);
  });
});
describe('Signup component test', () => {
  it('renders', () => {
    renderer.create(<Outfit/>);
  });
});
describe('Signup component test', () => {
  it('renders', () => {
    renderer.create(<DressingRoom/>);
  });
});