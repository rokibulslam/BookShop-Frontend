import React from "react";
import { useGetGenreListQuery, useGetYearListQuery } from "../../redux/APIs/bookApi";

const Genre = ({ setYear, setGenre, genre }) => {
  const { data } = useGetGenreListQuery();
  // console.log(data?.data);
  return (
    <div>
      <h1 className="font-semibold">Filter By Year</h1>
      <ul>
        {data?.data?.map((item, index) => (
          <li
            className={`cursor-pointer border-[1px] w-[150px] ps-1 ${
              item === genre ? "bg-[#27DEC0]" : "bg-[#27dec025]"
            }`}
            onClick={() => {
              setYear("");
              setGenre(item);
            }}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genre;
