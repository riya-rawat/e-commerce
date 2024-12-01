// /**
//  * @jest-environment jsdom
//  */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../common/components/modal';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../common/redux-store/actions';
import { modalMockData } from './mockData';
// Mocking the redux hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Modal Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('renders modal when data is available in the Redux state', () => {
    useSelector.mockReturnValue(modalMockData);
    render(<Modal />);

    // Check if modal is visible
    const modal = screen.getByLabelText('modal');
    expect(modal).toHaveClass('show');
    expect(modal).toHaveStyle('display: block');
    expect(screen.getByLabelText('product-title')).toHaveTextContent(modalMockData.title);
    expect(screen.getByLabelText('product-description')).toHaveTextContent(modalMockData.description);
  });

  it('modal should not render when there is no data in Redux state', () => {
    // Mocking useSelector to return null
    useSelector.mockReturnValue(null);
    const {container} = render(<Modal />);
    expect(container.getElementsByClassName('show').length).toBe(0);
  });

  it('focuses on modal when data is available', () => {
    useSelector.mockReturnValue(modalMockData);
    render(<Modal />);
    const modal = screen.getByLabelText('modal');
    expect(modal).toHaveFocus(); // Check if the modal is focused
  });

  it('dispatches removeItem action when close button is clicked', () => {
    useSelector.mockReturnValue(modalMockData);
    render(<Modal />);
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(mockDispatch).toHaveBeenCalledWith(removeItem());
  });

  it('dispatches removeItem action when modal close button is clicked', () => {
    useSelector.mockReturnValue(modalMockData);
    render(<Modal />);
    const modalCloseButton = screen.getByText('Close');
    fireEvent.click(modalCloseButton);
    expect(mockDispatch).toHaveBeenCalledWith(removeItem());
  });
});
