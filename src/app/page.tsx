import Result from '@/types/Result';
import Dropdowns from './filter/page';

export const getData = async () => {
  const apiUrl = await fetch(process.env.NEXT_PUBLIC_GET_INFO as string);
  const carsInfo = await apiUrl.json();   

  return carsInfo.Results;
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Dropdowns data={data} />
    </div>
  );
}
