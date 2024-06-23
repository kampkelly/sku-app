const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const skuConstant = {
  SKUs_LIST: `${BASE_URL}/api_v1/sku`,
  SKUs_CREATE: `${BASE_URL}/api_v1/sku`,
  SKUs_RETRIEVE: (id: string) => `${BASE_URL}/api_v1/sku/${id}`,
  SKUs_EDIT: (id: string) => `${BASE_URL}/api_v1/sku/${id}`,
  SKUs_DELETE: (id: string) => `${BASE_URL}/api_v1/sku/${id}`,
};
