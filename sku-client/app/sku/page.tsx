"use client";
import Link from 'next/link'

import { useEffect, useState } from "react";

import { skuConstant } from '../../constants';

const SkuHome = () => {
  const [skus, setSkus] = useState<JSX.Element[]>([]);
  const [nextPageLink, setNextPageLink] = useState('');
  const [prevPageLink, setprevPageLink] = useState('');

  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, []);

  const getPageData = (url: string) => {
    getData(url);
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
      <div className="grid grid-cols-1 gap-4">
        {skus}
      </div>
      <button
            type="submit"
            onClick={() => getPageData(prevPageLink)}
            disabled={!prevPageLink}
            className={`mr-4 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md ${!prevPageLink ? 'text-white bg-gray-500 hover:bg-gray-500 active:bg-gray-500' : 'bg-violet-500 text-white hover:bg-violet-600 active:bg-violet-700'}`}
          >
            {'<<'}Prev
          </button>
          <button
            type="submit" 
            onClick={() => getPageData(nextPageLink)}
            disabled={!nextPageLink}
            className={`focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md ${!nextPageLink ? 'text-white bg-gray-500 hover:bg-gray-500 active:bg-gray-500' : 'bg-violet-500 text-white hover:bg-violet-600 active:bg-violet-700'}`}
          >
            Next{'>>'}
          </button>
    </>
  )
}

export default SkuHome;
