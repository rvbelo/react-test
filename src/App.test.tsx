import React from 'react'
import renderer from 'react-test-renderer'
import {render, screen} from '@testing-library/react';
import { expect, test } from 'vitest'
import App from './App'

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  return result as renderer.ReactTestRendererJSON
}

test('Form page must be rendered correctly', () => {
  const component = renderer.create(
    <App />,
  )
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()

  // re-rendering
  tree = toJson(component)
  expect(tree).toMatchSnapshot()

  // re-rendering
  tree = toJson(component)
  expect(tree).toMatchSnapshot()

  
})

test('Input CEP must be in document', () => {
    const component = renderer.create(<App />)

    const testInstance = component.root
    expect(testInstance.findByProps({className: 'input-cep'})).toBeDefined()
})
