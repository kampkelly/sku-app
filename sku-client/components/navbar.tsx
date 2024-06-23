"use client";

import { Disclosure } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-violet-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                <div className="sm:ml-6 sm:block">
                  <div className="flex space-x-4 justify-center">
                      <a
                        href="/"
                        className={classNames(
                          'text-white',
                          'rounded-md px-3 py-2 text-sm font-medium text-center',
                        )}
                        aria-current='page'
                      >
                        Sku App
                      </a>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
