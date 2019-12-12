import { sum, min, mul } from './App'
import React from 'react';
import { shallow } from 'enzyme';
import App from './appTest/App';
import './appTest/setupApp';

const a = sum(1, 2)
const b = sum(2, 2)

describe('Test Jest', () => {
  it('Test Persamaan', () => {
      expect(sum(1,2)).toEqual(3)
      expect(min(a,b)).toEqual(a - b)
      expect(mul(a,b)).toEqual(a * b)
  })
})

describe('Test Component Enzyme', () => {
  it('Render Component', () => {
    shallow(<App />)
  })
})