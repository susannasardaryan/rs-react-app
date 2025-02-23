import { describe, it, expect} from 'vitest';
import { vi } from 'vitest'; // Import vi directly
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card/Card';
// Mock the onClick handler
const mockOnClick = vi.fn();

// Mock data for the card
const mockPerson = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
};

const mockImage = 'https://starwars-visualguide.com/assets/img/characters/1.jpg';

describe('Card Component', () => {
  it('renders the card with correct data', () => {
    render(<Card person={mockPerson} image={mockImage} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();

    // Check if the image is rendered with the correct src and alt text
    const imageElement = screen.getByAltText('Luke Skywalker');
    expect(imageElement).toHaveAttribute('src', mockImage);
  });

  it('calls onClick when the card is clicked', () => {
    render(<Card person={mockPerson} image={mockImage} onClick={mockOnClick} />);

    const cardElement = screen.getByRole('button');
    fireEvent.click(cardElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });


//   it('Validate that clicking on a card opens a detailed card component.', async () => {
//     // Mock the fetch API for the Details component
//     vi.fn(() =>
//       Promise.resolve({
//         json: () =>
//           Promise.resolve({
//             name: 'Luke Skywalker',
//             height: '172',
//             mass: '77',
//             birth_year: '19BBY',
//           }),
//       })
//     );

//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <Routes>
//           <Route path="/" element={<Card person={mockPerson} image={mockImage} onClick={mockOnClick} />} />
//           <Route path="/details/:id" element={<Details />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     // Simulate clicking on the card
//     const cardElement = screen.getByRole('button');
//     fireEvent.click(cardElement);

//     // Wait for the Details component to render
//     await screen.findByText('Height: 172');
//     await screen.findByText('Mass: 77');

//     // Verify that the Details component is rendered with the correct data
//     expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
//     expect(screen.getByText('Height: 172')).toBeInTheDocument();
//     expect(screen.getByText('Mass: 77')).toBeInTheDocument();
//     expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
//   });
});