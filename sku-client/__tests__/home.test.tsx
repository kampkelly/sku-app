import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SkuHome from '../app/sku/page';
import fetchMock from 'jest-fetch-mock';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

// Mock the constants
jest.mock('../constants', () => ({
  skuConstant: {
    SKUs_LIST: 'http://127.0.0.1:8000/api_v1/sku',
  },
}));

fetchMock.enableMocks();

describe('SkuHome', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches and displays SKUs', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        links: {
          next: 'http://127.0.0.1:8000/api_v1/sku?page=2',
          previous: null,
        },
        results: [
          {
            id: 1,
            medication_name: 'Paracetamol',
            presentation_unit: 'Tablet',
            unit: 10,
            dose: '20mg',
            countries: ['USA', 'Canada'],
          },
          {
            id: 2,
            medication_name: 'Ibuprofen',
            presentation_unit: 'Tablet',
            unit: 10,
            dose: '20mg',
            countries: ['USA', 'Canada'],
          },
        ],
      })
    );

    render(<SkuHome />);

    await waitFor(() => {
      expect(screen.getByText('List of Skus')).toBeInTheDocument();
      expect(screen.getByText('Paracetamol')).toBeInTheDocument();
      expect(screen.getByText('Ibuprofen')).toBeInTheDocument();
    });
  });
});
