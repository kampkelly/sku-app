"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { skuConstant } from '../../../constants';

const CreateSku = () => {
  const router = useRouter();
  const [medicationName, setMedicationName] = useState('');
  const [unit, setUnit] = useState('');
  const [presentationUnit, setPresentationUnit] = useState('');
  const [dose, setDose] = useState('');
  const [countries, setCountries] = useState('');
  const [saveError, setSaveError] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!medicationName) newErrors.medicationName = 'Medication Name is required';
    if (!unit) newErrors.unit = 'Unit is required';
    if (!presentationUnit) newErrors.presentationUnit = 'Presentation Unit is required';
    if (!dose) newErrors.dose = 'Dose is required';
    if (!countries) newErrors.countries = 'Countries are required';
    return newErrors;
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newSku = {
      medication_name: medicationName,
      unit,
      presentation_unit: presentationUnit,
      dose,
      countries: countries.split(',').map((country) => country.trim()),
    };

    const response = await fetch(skuConstant.SKUs_CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSku),
    });

    if (response.ok) {
      router.push('/');
    } else {
      setSaveError('There was an error saving SKU');
    }
  };

  return (
    <>
      <form onSubmit={handleSaveChanges} className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-6 m-4 max-w-xl mx-auto">
        <div className="flex-1 mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add SKU</h2>
          <p className='text-red-500'>{saveError}</p>

          <div className="mb-4">
            <label htmlFor="medicationName" className="block text-sm font-medium leading-6 text-gray-900">
              Medication Name
            </label>
            <div className="relative mt-2 rounded-md shadow-sm max-w-xs">
              <input
                type="text"
                name="medicationName"
                id="medicationName"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.medicationName && <p className="text-red-500 text-xs">{errors.medicationName}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="dose" className="block text-sm font-medium leading-6 text-gray-900">
              Dose
            </label>
            <div className="relative mt-2 rounded-md shadow-sm max-w-xs">
              <input
                type="string"
                name="dose"
                id="dose"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.dose && <p className="text-red-500 text-xs">{errors.dose}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="dose" className="block text-sm font-medium leading-6 text-gray-900">
              Presentation Unit
            </label>
            <div className="relative mt-2 rounded-md shadow-sm max-w-xs">
              <input
                type="string"
                name="presentation-unit"
                id="presentation-unit"
                value={presentationUnit}
                onChange={(e) => setPresentationUnit(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.presentationUnit && <p className="text-red-500 text-xs">{errors.presentationUnit}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="unit" className="block text-sm font-medium leading-6 text-gray-900">
              Unit
            </label>
            <div className="relative mt-2 rounded-md shadow-sm max-w-xs">
              <input
                type="number"
                name="unit"
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.unit && <p className="text-red-500 text-xs">{errors.unit}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="countries" className="block text-sm font-medium leading-6 text-gray-900">
              Countries
              <span className="text-xs text-gray-500 italic ml-1">Separate each country by a comma</span>
            </label>
            <div className="relative mt-2 rounded-md shadow-sm max-w-xs">
              <input
                type="text"
                name="countries"
                id="countries"
                value={countries}
                onChange={(e) => setCountries(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.countries && <p className="text-red-500 text-xs">{errors.countries}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md"
          >
            Create Sku
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateSku;
