"use client";

import Link from 'next/link'
import { useState, useEffect } from 'react';

import { skuConstant } from '../../../constants';

const ViewSku = ({ params }) => {
  const [skuData, setSkuData] = useState({
    id: '',
    medicationName: '',
    unit: '',
    presentationUnit: '',
    dose: '',
    countries: ''
  });

  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  });

  const getData = async () => {
    const res = await fetch(skuConstant.SKUs_RETRIEVE(params.id));
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    

    const resp = await res.json();

    setSkuData({
      ...skuData,
      id: resp.id,
      medicationName: resp.medication_name,
      presentationUnit: resp.presentation_unit,
      unit: resp.unit,
      dose: resp.dose,
      countries: resp.countries.join(', ')
    });
  }
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-6 m-4 max-w-xl mx-auto">
      <div className="flex-1 mb-4 md:mb-0">
        <h2 className="text-2xl font-semibold text-gray-800">{skuData.medicationName}</h2>
        <p className="text-gray-600">Presentation Unit:  {skuData.presentationUnit}</p>
        <p className="text-gray-600">Unit:  {skuData.unit}</p>
        <p className="text-gray-600">Dose: {skuData.dose}</p>
        <p className="text-gray-600">Countries: {skuData.countries}</p>

        <div className="flex justify-center">
        <Link href={`/sku/${skuData.id}/edit`} className={`mt-4 focus:outline-none focus:ring focus:ring-violet-300 p-1 rounded-md bg-violet-500 text-white hover:bg-violet-600 active:bg-violet-700`} passHref>
            Edit SKU
        </Link>
      </div>
      </div>
    </div>
    </>
  )
}

export default ViewSku;
