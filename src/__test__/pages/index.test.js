/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../pages/index';
import {getServerSideData} from '../mockData';
import useSWR from 'swr';

// Mocking the redux hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
// Mocking getServerSideProps
jest.mock('../../pages/index', () => ({
  __esModule: true,
  ...jest.requireActual('../../pages/index'),
  getServerSideProps: jest.fn(),
}));

jest.mock('swr');
jest.mock('../../common/lib/Util', () => ({
  fetchData: jest.fn(),
  fetcher: jest.fn(),
}));

describe('Home/index Component', () => {
  test('renders the data from getServerSideProps', () => {
    useSWR.mockReturnValue({
      data: getServerSideData?.initialData?.data,
      error: null,
    })
    render(<Home props={getServerSideData} />);
    // Check if the mocked data is displayed
    expect(screen.getByText("All Products")).toBeInTheDocument();
  });

  test('check if component is loaded if there are no prodcuts', async() =>{
    useSWR.mockReturnValue({
      data: [],
      error: null,
    })
    render(<Home initialData={{ res: [] }} />);

    await waitFor(() => {
      expect(screen.getByText('No Products Available')).toBeInTheDocument();
    });
  })

  test('check if component is loaded if there are error in swr', () =>{
  useSWR.mockReturnValue({
    data: [],
    error: "error in loading the products",
  })
  render(<Home initialData={{ res: [] }} />);
  expect(screen.getByText('Error loading products')).toBeInTheDocument();
})

});