import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HeadingH3, HeadingH6 } from "components/Common/Heading";
import { message, Modal, Rate } from "antd";
import { IoIosSend } from "react-icons/io";
import feedback from "../../../../public/images/review.png";
import Image from "next/image";
import axios from "axios";
import Loader from "components/Loader/Loader";
import Pagination from "../Pagination";
import { MdStar } from "react-icons/md";
const ITEMS_PER_PAGE = 2;
interface ReviewProps {
  reviews: any[];
  productId: string;
  fetchReviews: (productId: string) => Promise<void>;
}
const Review: React.FC<ReviewProps> = ({
  reviews,
  productId,
  fetchReviews,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    productId: productId,
    name: "",
    email: "",
    description: "",
    star: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = reviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarChange = (value: number) => {
    console.log(value, "value");
    setFormData({ ...formData, star: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.star == 0)
      return message.error("Please select the start rating");
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/addReview`,
        formData
      );
      message.success("Review submitted successfully!");
      console.log(response.data);
      setFormData({
        productId: productId,
        name: "",
        email: "",
        description: "",
        star: 0,
      });
      await fetchReviews(productId);
    } catch (error) {
      console.log(error, "error");
      message.error("Error submitting the form:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-center font-medium text-16 lg:text-20">
          Customer Reviews
        </h1>
        <div className="flex flex-wrap md:flex-nowrap items-center  mt-10">
          <div className="w-full lg:w-5/12">
            {currentItems.length > 0 ? (
              <>
                {currentItems.map((array: any, index: any) => {
                  console.log(array.star, "star");
                  return (
                    <div
                      className="space-y-2 rounded-md p-2 mt-1 shadow"
                      key={index}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={feedback}
                          width={50}
                          height={50}
                          alt="feedback"
                        />
                        <div>
                          <HeadingH6 title={array.name} />
                          <Rate
                            className="reviewstar"
                            disabled
                            value={array.star}
                          />
                        </div>
                      </div>
                      <p>{array.description}</p>
                    </div>
                  );
                })}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div>
                {/* 5 Yellow Stars */}
                {/* <div className="flex jus  items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <MdStar key={i} className="text-yellow-500" size={24} />
                  ))}
                </div> */}
                <p className="mt-2">There Is No Reviews Available</p>
              </div>
            )}
          </div>
          <div className="w-full lg:w-2/12 ">
            <div className="border-l h-20 w-2 text-center mx-auto border-black" />
          </div>
          <div className="w-full lg:w-5/12">
            <button
              onClick={showModal}
              className="bg-black text-white py-2 px-6"
            >
              Write a review
            </button>
          </div>
          <Modal
            title="Write a Review"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel} // Close modal when cancel button is clicked
            footer={null} // Hide default footer to customize buttons
          >
            <div className=" p-2 md:p-4 space-y-3 ">
              <p className="text-16">
                Your Email Address Will Not Be Published. Required Fields Are
                Marked *
              </p>
              <Rate onChange={handleStarChange} value={formData.star} />

              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  className={`peer p-4 block w-full border text-black  outline-none rounded-md  text-sm placeholder:text-slate-400 disabled:opacity-50 disabled:pointer-events-none autofill:pb-2`}
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  className={`peer p-4 block w-full border text-black  outline-none rounded-md  text-sm placeholder:text-slate-400 disabled:opacity-50 disabled:pointer-events-none autofill:pb-2`}
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  className="peer p-4 block w-full border text-black  outline-none rounded-md  text-sm placeholder:text-slate-400 disabled:opacity-50 disabled:pointer-events-none autofill:pb-2"
                  placeholder="Your Review *"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  onClick={handleCancel}
                  className="bg-black text-white py-3 px-4 rounded-none flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader color="#fff" />
                  ) : (
                    <>
                      <IoIosSend size={25} /> Submit Review
                    </>
                  )}
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Review;
