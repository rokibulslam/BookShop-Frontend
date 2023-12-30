import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import { useGetBookListByGenreQuery, useGetBookListByYearQuery, useGetBooksQuery } from '../redux/APIs/bookApi'
import { Spin } from 'antd'
import ProductCard from '../components/ProductCard/ProductCard'
import { Link } from 'react-router-dom'
import Year from '../components/Filter/Year'
import Genre from '../components/Filter/Genre'

const Books = () => {
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState("");
  const { data, isLoading, isError, error, isSuccess } = useGetBooksQuery()
  const { data: genreList, isLoading: genreLoading, isError: genreIsError, isSuccess: genreIsSuccess } = useGetBookListByGenreQuery({ genre })
  const { data: yearList, isLoading: yearLoading, isError: yearIsError, isSuccess: yearIsSuccess } = useGetBookListByYearQuery({ year });
  // console.log(genreList);
  // console.log(yearList);
  // console.log(data?.data);
  let AllData=null;
  if (isError) {
    AllData=<p className='text-red-500 text-center py-[200px]'>Something Went Wrong Try Again!!!</p>
  }
  if (isLoading && genreLoading && yearLoading) {
    AllData = (
      <div className="text-red-500 text-center py-[200px]">
        <Spin />
        <Spin />
        <Spin />
        <Spin />
        <Spin />
        <Spin />
        <Spin />
      </div>
    );
  }
  if (year=='' && data && !isLoading && !isError) {
    AllData = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
        {data?.data?.map((item, index) => (
          <ProductCard key={index} item={item}></ProductCard>
        ))}
      </div>
    );
  }
  if (year !== "" && data && !isLoading && !isError) {
    AllData = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
        {yearList?.data?.map((item, index) => (
          <ProductCard key={index} item={item}></ProductCard>
          
        ))}
      </div>
    );
  }
  if (genre !== "" && data && !isLoading && !isError) {
    AllData = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
        {genreList?.data?.map((item, index) => (
          
          <ProductCard key={index} item={item}></ProductCard>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-5 relative">
      <Navbar />
      <div className="lg:fixed ms-5 z-10">
        <Year setYear={setYear} setGenre={setGenre} year={year} />
        <Genre setYear={setYear} setGenre={setGenre} genre={genre} />
      </div>
      {/* Filter */}
      <Link className="border-[1px] border-[#27DEC0] px-2  py-[1px] rounded-md hover:bg-[#27dec0dd] bg-[#27dec025] hover:text-black text-[13px] fixed  md:right-10 right-1 top-[65px]">
        Add New Book
      </Link>
      <div className="flex justify-center items-center">{AllData}</div>
      <Footer />
    </div>
  );
}

export default Books