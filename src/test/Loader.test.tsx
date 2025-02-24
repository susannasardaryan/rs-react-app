import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loader from '../components/Loader/Loader';

describe('Loader component', () => {
  it('renders loader elements with correct classes', () => {
    const { container } = render(<Loader />);

    const loaderSection = container.querySelector('.loaderSection');
    expect(loaderSection).toBeInTheDocument();

    const loader = container.querySelector('.loader');
    expect(loader).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});