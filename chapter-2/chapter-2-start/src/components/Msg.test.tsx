import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Msg from './Msg'
 
describe('Msg', () => {
  it('renders a heading', () => {
    render(<Msg text="Hello World" />)
    const el = screen.getByText('Hello World')
    expect(el).toBeInTheDocument()
  })
})