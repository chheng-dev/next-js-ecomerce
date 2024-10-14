import React from 'react'
import CustomerReview from './CustomerReview'
import YourReviewSection from './YourReviewSection'

const ReviewSection = () => {
  const customerReviewItems = [
    {
      title: 'Good Quality and Fast Delivery',
      description: 'The product arrived much earlier than expected. I am happy with the quality and the packaging. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt deleniti, temporibus dolores, quia sequi.',
      star: 5,
      date: 'Jan 15, 2024',
      reviewer: 'Sarah',
      username: 'Sarah.M',
      userImage: 'https://via.placeholder.com/150'
    },
    {
      title: 'Could Be Better',
      description: 'The product was decent, but I found a few defects that were a bit disappointing. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet nostrum animi reprehenderit, alias perspiciatis.',
      star: 3,
      date: 'Dec 10, 2023',
      reviewer: 'Mark',
      username: 'Mark.D',
      userImage: 'https://via.placeholder.com/150'
    }
  ]
  return (
    <>
      <CustomerReview items={customerReviewItems} />
      <YourReviewSection />
    </>
  )
}

export default ReviewSection
