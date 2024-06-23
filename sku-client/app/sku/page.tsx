"use client";
import Link from 'next/link'

import { useEffect, useState } from "react";

import { skuConstant } from '../../constants';

const SkuHome = () => {
  const [skus, setSkus] = useState<JSX.Element[]>([]);
  const [nextPageLink, setNextPageLink] = useState('');
  const [prevPageLink, setprevPageLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await getData();
      setLoading(false);
    }
    fetchData();
  }, []);

  const getPageData = async (url: string) => {
    setLoading(true);
    await getData(url);
    setLoading(false);
  };

  const getData = async (url?: string) => {
    const res = await fetch(url || skuConstant.SKUs_LIST)
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const resp = await res.json();
    setNextPageLink(resp.links.next);
    setprevPageLink(resp.links.previous);
    const elements = resp.results?.map((d: any) => {
      return (
        <Link key={d.id} href={`/sku/${d.id}`} className="p-6 mb-8 max-w-sm mx-12 bg-white rounded-xl shadow-lg" passHref>
            <div key={d.id} className=" flex items-center space-x-4">
              <div>
                <div className="text-xl font-medium text-black">{d.medication_name}</div>
                <p className="text-slate-500 text-sm italic">{d.presentation_unit}</p>
                <p className="text-slate-500 text-sm italic">Countries available: {d.countries.join(', ')}</p>
              </div>
            </div>
        </Link>
      );
    })

    setSkus(elements)
  }

  return (
    <>
      <h2 className="text-lg text-center underline mt-3 mb-3">List of Skus</h2>
      <div className="flex justify-center">
        <Link href={`/sku/create`} className="mr-4 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md bg-violet-500 text-white hover:bg-violet-600 active:bg-violet-700" passHref>
          Add SKU
        </Link>
      </div>
      {loading ? (
         <div className="flex justify-center mt-6 mb-6">
          <svg className="animate-spin h-8 w-8 text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.937l3-2.646z"></path>
          </svg>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {skus}
          </div>
          <div className="flex justify-center mt-6 mb-6">
            <button
              type="button"
              onClick={() => getPageData(prevPageLink)}
              disabled={!prevPageLink}
              className={`mr-4 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md ${!prevPageLink ? 'text-white bg-gray-500 hover:bg-gray-500 active:bg-gray-500' : 'bg-violet-500 text-white hover:bg-violet-600 active:bg-violet-700'}`}
            >
              {'<<'}Prev
            </button>
            <button
              type="button"
              onClick={() => getPageData(nextPageLink)}
              disabled={!nextPageLink}
              className={`focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md ${!nextPageLink ? 'text-white bg-gray-500 hover:bg-gray-500 active:bg-gray-500' : 'bg-violet-500 text-white hover:bg-violet-600 active:bg-violet-700'}`}
            >
              Next{'>>'}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default SkuHome;
