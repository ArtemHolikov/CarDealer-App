import { Suspense, use } from 'react';
import ResultPageProps from '@/types/ResultPageProps';

async function fetchData(makeId: string, year: string) {
  const apiUrl = process.env.NEXT_PUBLIC_GET_CARS_BY_YEAR_AND_MODEL as string;
  const url = apiUrl
  .replace('{makeId}', makeId)
  .replace('{year}', year);
  const response = await fetch(url)
  const resultData = await response.json();

  return resultData.Results;
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

const ResultPage = ({ params }: ResultPageProps) => {
  const { makeId, year } = params;
  const resultData = use(fetchData(makeId, year));

  const uniqueArray = Array.from(
    new Map(resultData.map((item:any) => [item.Model_ID, item])).values()
);

  return (
    <Suspense fallback={<Loading/>}>
      <div className='flex justify-center items-center p-16 columns-3xs h-screen'>
        <ul>
          {uniqueArray.length > 0 ? (uniqueArray.map((item: any) => (
            <li className='pb-5' key={item.Model_ID}>
              <p className='uppercase text-center text-xl'>{item.Model_Name}</p>
            </li>
          ))) : 
            'Oops, nothing this year!'
          }
        </ul>
      </div>
    </Suspense>
  );
};

export default ResultPage;
