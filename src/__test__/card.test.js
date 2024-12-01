// /**
//  * @jest-environment jsdom
//  */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cards from './../common/components/cards'; // Adjust the import path accordingly
import { useDispatch } from 'react-redux';
import { setItem } from '../common/redux-store/actions';
import { CardMockData } from './mockData';

// Mocking the redux hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Cards Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn(); // Mock the dispatch function
    useDispatch.mockReturnValue(mockDispatch); // Return the mock dispatch function
  });

  it('renders product data correctly', () => {
    render(<Cards data={CardMockData} />);
    expect(screen.getByText(CardMockData.title)).toBeInTheDocument();
    expect(screen.getByText(CardMockData.price)).toBeInTheDocument();
    const image = screen.getByAltText(CardMockData.title);
    expect(image).toHaveAttribute('alt', CardMockData.title);
  });

  it('dispatches setItem action when card is clicked', () => {
    render(<Cards data={CardMockData} />);
    const card = screen.getByRole('link');
    fireEvent.click(card);
    expect(mockDispatch).toHaveBeenCalledWith(setItem(CardMockData));
  });

  it('renders image with correct properties', () => {
    render(<Cards data={CardMockData} />);
    const image = screen.getByAltText(CardMockData.title);
    expect(image).toHaveAttribute('src', CardMockData.image);
    expect(image).toHaveAttribute('width', '50');
    expect(image).toHaveAttribute('height', '100');
  });
});
