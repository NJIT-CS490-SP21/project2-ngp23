import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Board from './Board';
import LeaderBoard from './LeaderBoard'

test('renders learn react link', () => {
  const result = render(<Board tempUser="user1"/>);
  const joinButtonElement = screen.getByText('Click to Hide');
  expect(joinButtonElement).toBeInTheDocument();
  fireEvent.click(joinButtonElement);
});

// test('Click on the board', () => {
//   const result = render(<Board tempUser="user1"/>);
//   const joinButtonElement = screen.getByText('Click to Hide');
//   expect(joinButtonElement).toBeInTheDocument();
//   fireEvent.click(joinButtonElement);
// });