import React from 'react'
import { useGetYearListQuery } from '../../redux/APIs/bookApi'

const Year = ({setYear, setGenre, year}) => {
    const { data } = useGetYearListQuery();
    // console.log(data?.data);
  
  return (
    <div>
      <h1 className="font-bold">Filter By Year</h1>
      <ul>
        {data?.data?.map((item, index) => (
          <li
            className={`cursor-pointer border-[1px] w-[100px] text-center ${
              item === year ? "bg-[#27DEC0]" : "bg-[#27dec025]"
            }`}
            onClick={() => {
              setYear(item);
              setGenre("");
            }}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Year