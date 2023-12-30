import React, { useEffect } from 'react'
import LazyLoader from '../components/LazyLoader/LazyLoader';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { useCreateBookMutation } from '../redux/APIs/bookApi';
import { getUserDetails } from '../helpers/sessionHelper';

const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const user =getUserDetails()
  const [createBrand, { isLoading, isError, isSuccess, data, error }] =
    useCreateBookMutation();
  const onSubmit = (data) => {
    
    const bookData = {
      ...data, UserEmail:user.Email
    }
    createBrand(bookData);
    // console.log(bookData);
    reset();
  };
  useEffect(() => {
    if (isError) {
      message.error(`${error.data.message}`);
    }
    if (isSuccess) {
      message.success(`${data.message}`);
    }
  }, [isError, isSuccess, isLoading]);
  let AllData = null;
  if (isLoading) {
    AllData = <LazyLoader />;
  } else if (!isLoading) {
    AllData = (
      <form
        className="flex flex-col w-[200px] md:w-full md:p-7 p-1 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <div className="w-[350px]">
          <label className="text-gray-700 w-full" htmlFor="">
            Title
          </label>
          <input
            className="outline-[#27DEC0] p-1 border-2 rounded-md border-gray-200 my-2 w-full text-gray-500"
            type="text"
            placeholder="Title"
            required
            {...register("Title")}
          />
        </div>
        <div className="w-[350px]">
          <label className="text-gray-700 w-full" htmlFor="">
            Image URL
          </label>
          <input
            className="outline-[#27DEC0] p-1 border-2 rounded-md border-gray-200 my-2 w-full text-gray-500"
            type="text"
            required
            placeholder="Image"
            {...register("Image", {
              required: "This is required message",
              min: 3,
            })}
          />
        </div>
        <div className="w-[350px]">
          <label className="text-gray-700 w-full" htmlFor="">
            Author
          </label>
          <input
            className="outline-[#27DEC0] p-1 border-2 rounded-md border-gray-200 my-2 w-full text-gray-500"
            type="text"
            required
            placeholder="Author"
            {...register("Author")}
          />
        </div>
        <div className="w-[350px]">
          <label className="text-gray-700 w-full" htmlFor="">
            Genre
          </label>
          <input
            className="outline-[#27DEC0] p-1 border-2 rounded-md border-gray-200 my-2 w-full text-gray-500"
            type="text"
            required
            placeholder="Genre"
            {...register("Genre")}
          />
        </div>
        <div className="w-[350px]">
          <label className="text-gray-700 w-full" htmlFor="">
            Publication Date
          </label>
          <input
            className="outline-[#27DEC0] p-1 border-2 rounded-md border-gray-200 my-2 w-full text-gray-500"
            type="date"
            required
            placeholder="Publication Date"
            {...register("PublicationDate")}
          />
        </div>
        <button className="bg-black rounded-md text-white w-full" type="submit">
          Create New Book
        </button>
      </form>
    );
  }
  return (
    <div className="flex flex-col  items-center w-full">
      <div className="bg-white shadow-lg mt-10 rounded-md m-2 flex flex-col items-center md:p-6 my-5">
        <h1 className="md:text-3xl mb-5 text-center">Create Brand</h1>
        {AllData}
      </div>
    </div>
  );
}

export default AddNewBook