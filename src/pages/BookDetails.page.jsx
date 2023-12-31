import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCreateReviewMutation, useDeleteBookMutation, useGetSingleBookQuery } from '../redux/APIs/bookApi';
import moment from 'moment';
import { Spin, message } from 'antd';
import profile from '../assets/profile.jpg'
import { getUserDetails } from '../helpers/sessionHelper';
const BookDetails = () => {
  
  const { id } = useParams()
  const { data, isLoading, isSuccess, isError } = useGetSingleBookQuery({ id })
  const [createReview, { isSuccess: reviewSuccess, isError: reviewIsError }] = useCreateReviewMutation()
  const [deleteBook,{isSuccess:deleteSuccess, isError:deleteIsError, isLoading:deleteIsLoading}]=useDeleteBookMutation()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const book = data?.data[0]
  const review = data?.data?.reviews
  const user = getUserDetails()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login')
    }
    setIsSubmitting(true);
    const review = {
      ...formData, UserEmail:user?.Email, BookID:id
    }
    // Add your login logic here
    console.log("Form submitted:", review);
    await createReview(review);
  };

  const handleEdit = (id) => {
    if (user.Email !== book.UserEmail) {
      message.error('You Dont Have Enough Permission')
    }
    if (user.Email === book.UserEmail) {
      navigate(`/updateBook/${id}`);
    }
  }
  const handleDelete = async()=>{
    if (user.Email !== book.UserEmail) {
      message.error('You Dont Have Enough Permission')
    }
    if (user.Email === book.UserEmail) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (isConfirmed) {
        await deleteBook(id)
      }
    }
  }
  useEffect(() => {
    if (reviewIsError) {
      setIsSubmitting(false);
      message.error("Please Try Again!!!");
    }
    if (reviewSuccess) {
      message.success("Thank you for your Review");
      setIsSubmitting(false);
    }
  }, [reviewIsError, reviewSuccess]);
  useEffect(() => {
    if (deleteSuccess) {
      message.success('Deleted Successfully');
      navigate('/')
    }
    if (deleteIsError) {
      message.error('Something Went Wrong!');
    }
  }, [deleteIsError, deleteIsLoading, deleteSuccess]);
  return (
    <div className="mx-[50px]">
      <h1 className="text-center text-4xl py-3">Book Details</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center">
        <div>
          <img src={book?.Image} className="h-[400px]" alt="" />
        </div>
        <div>
          <p>
            <span className="font-bold pe-4">Title:</span>
            {book?.Title}
          </p>
          <p>
            <span className="font-bold pe-4">Author:</span>
            {book?.Author}
          </p>
          <p>
            <span className="font-bold pe-4">Genre:</span>
            {book?.Genre}
          </p>
          <p>
            <span className="font-bold pe-4">Publication Date:</span>

            {moment(book?.PublicationDate).format("Do MMM YYYY")}
          </p>
          <div className=" space-x-5 py-5">
            <Link onClick={()=>handleEdit()} className="border-[1px] border-[#27DEC0] px-2  py-[1px] rounded-md hover:bg-[#27dec0dd] bg-[#27dec025] hover:text-black text-[13px]">
              Edit Book
            </Link>
            <Link onClick={()=>handleDelete()} className="border-[1px] border-[#de2727] px-2  py-[1px] rounded-md hover:bg-[#27dec0dd] bg-[#fb414125] hover:text-black text-[13px] text-red-600">
              Delete Book
            </Link>
          </div>
          {/* Review Input  */}
          <form className="w-full max-w-sm my-10" onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                type="text"
                id="Review"
                name="Review"
                value={formData.Review}
                onChange={handleChange}
                className="w-full px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Give a Review"
                required
              />
            </div>

            <div className="flex flex-col">
              <button
                type="submit"
                className={`${
                  isSubmitting
                    ? "transition-all duration-200"
                    : "bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200"
                }`}
              >
                {isSubmitting ? <Spin /> : "Give Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='flex justify-center mb-[200px]'>
        <div className="mt-10">
          <h1 className="mb-5 text-3xl">Reviews</h1>
          {review?.length > 0 &&
            review?.map((review, index) => (
              <div className="flex items-center space-x-5 mb-10" key={index}>
                <img className="h-10 rounded-full" src={profile} alt="" />
                <p>{review?.Review}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BookDetails