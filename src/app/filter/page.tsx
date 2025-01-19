'use client'

import React, { useState } from 'react';
import Result from '@/types/Result';
import Link from 'next/link'
import DropdownProps from '@/types/DropdownProps';

const Dropdowns: React.FC<DropdownProps> = ({ data }) => {
  const [vehicleMakesOpen, setVehicleMakesOpen] = useState<boolean>(false);
  const [vehicleYearOpen, setVehicleYearOpen] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, index) => 2015 + index);

  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedMakeId, setSelectedMakeId] = useState<number| null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleMakeSelect = (makeName: string, makeId: number) => {
    setSelectedMake(makeName);
    setSelectedMakeId(makeId);
    setVehicleMakesOpen(false);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setVehicleYearOpen(false);
  };

  const isNextButtonEnabled = selectedMake !== null && selectedYear !== null;

  return (
    <div className="flex justify-center gap-10">
        <div className="relative inline-block text-left">
          <div>
            <button type="button" onClick={() => setVehicleMakesOpen(!vehicleMakesOpen)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
              {selectedMake ? selectedMake : 'Vehicle Makes'}
              <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {vehicleMakesOpen && (
            <div className="absolute right-0 max-h-60 overflow-y-auto z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-expanded={vehicleMakesOpen} aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    <ul>
                        {
                        data.sort((a: Result, b: Result) => a.MakeName.localeCompare(b.MakeName)).map((item: Result) => {
                            return (
                                <li key={item.MakeId} onClick={() => handleMakeSelect(item.MakeName, item.MakeId)}>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">{item.MakeName}</a>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
          )}
        </div>

        <div className="relative inline-block text-left">
          <div>
            <button type="button" onClick={() => setVehicleYearOpen(!vehicleYearOpen)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
            {selectedYear ? selectedYear : 'Vehicle Year'}
              <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {vehicleYearOpen && (
            <div className="absolute right-0 max-h-60 overflow-y-auto z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-expanded={vehicleMakesOpen} aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    <ul>
                        {
                        years.map((item) => {
                            return (
                                <li onClick={() => handleYearSelect(item)} key={item}>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">{item}</a>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
          )}
        </div>
        <button 
            disabled={!isNextButtonEnabled}
            className={`text-white ${isNextButtonEnabled ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'} font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
        >
            <Link 
              className={!isNextButtonEnabled ? 'pointer-events-none' : ''} 
              aria-disabled={!isNextButtonEnabled} 
              href={`/result/${selectedMakeId}/${selectedYear}`}>
                Next
            </Link>
        </button>
      </div>
  );
};

export default Dropdowns;