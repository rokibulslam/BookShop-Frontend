import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useParams } from "react-router-dom";
import { getUserDetails } from "../helpers/sessionHelper";
import { useCreateBookMutation, useGetSingleBookQuery, useUpdateBookMutation } from "../redux/APIs/bookApi";
import { Spin, message } from "antd";
import LazyLoader from "../components/LazyLoader/LazyLoader";
import moment from "moment";

const BookUpdate = () => {
  const {id}=useParams()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const user = getUserDetails();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [update, { isLoading, isError, isSuccess, data, error }] =
    useUpdateBookMutation();
  const { data: Book, isLoading: BookLoading, isFetching: BookFetching, isError: BookIsError, isSuccess: BookIsSuccess } = useGetSingleBookQuery({ id })
  console.log(Book);
  const onSubmit = (data) => {
    setIsSubmitting(true)
    const bookData = {
      ...data,
      UserEmail: user.Email,
    };
    console.log(bookData);
    update({id, bookData});
    // console.log(bookData);
    reset();
  };
  useEffect(() => {
    setIsSubmitting(false)
    if (isError) {
      message.error("Someting went wrong");
    }
    if (isSuccess) {
      message.success("Updated");
    }
  }, [isError, isSuccess, isLoading]);
  let AllData = null;
  if (isLoading) {
    <LazyLoader />;
  }
  return (
    <div className="flex flex-col  items-center w-full">
      <div className="bg-white shadow-lg mt-10 rounded-md m-2 flex flex-col items-center md:p-6 my-5">
        <h1 className="md:text-3xl mb-5 text-center">Create Brand</h1>
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
              defaultValue={Book?.data[0].Title}
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
              defaultValue={Book?.data[0].Image}
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
              defaultValue={Book?.data[0].Author}
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
              defaultValue={Book?.data[0].Genre}
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
              defaultValue={moment(Book?.data[0].PublicationDate).format(
                "YYYY-MM-DD"
              )}
              placeholder="Publication Date"
              {...register("PublicationDate")}
            />
          </div>
          {isLoading ? (
            <Spin />
          ) : (
            <button
              className="bg-black rounded-md text-white w-full"
              type="submit"
            >
              Update Book
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookUpdate;
