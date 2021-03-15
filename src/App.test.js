import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Board from './Board';
import Login from './Login';

test('click on the hide button', () => {
  const result = render(<Board tempUser="user1" />);
  const joinButtonElement = screen.getByText('Click to Hide');
  
  expect(joinButtonElement).toBeInTheDocument();
  const joinButtonElement2 = screen.getByText('ScoreBoard')
  fireEvent.click(joinButtonElement)
  expect(joinButtonElement2).not.toBeInTheDocument();
 
});

test('Click on the login button', () => {
  const result = render(<Login login={()=>{'user1'}}/>);
  const joinButtonElement = screen.getByText('Enter');
  expect(joinButtonElement).toBeInTheDocument();
  const joinButtonElement2 = screen.getByText('Enter');
  fireEvent.click(joinButtonElement);
  expect(joinButtonElement2).toBeValid();
});



