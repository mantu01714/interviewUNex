import { Send, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function InterviewComplete() {
  return (
    <div className="flex items-center justify-center py-10 px-4 sm:px-6 md:px-12 flex-col gap-6">
      {/* Check Image */}
      <Image
        src="/check.png"
        alt="check"
        width={100}
        height={100}
        className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
      />

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Interview Complete!
      </h2>

      {/* Subtext */}
      <p className="text-base sm:text-lg text-gray-500 font-medium text-center max-w-xl">
        Thank you for participating in the AI-driven interview with <strong>InterviewUNex</strong>
      </p>

      {/* Image Section */}
        <div className=' w-full max-w-[700px] h-[300px] flex justify-center mt-2 '>
            <Image src={'/complete1.jpg'} className=' w-full object-cover rounded-2xl shadow-2xl shadow-primary' width={500} height={200} alt='complete' />
        </div>

      {/* Back Button */}
      <Link href="/">
        <div className="p-3 bg-primary text-white rounded-full mt-6 cursor-pointer hover:scale-105 transition duration-300">
          <Send />
        </div>
      </Link>

      {/* What's Next */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mt-4">What's Next?</h2>

      <p className="text-sm sm:text-base text-center text-gray-500 font-medium max-w-md">
        The recruiter will review your interview responses and will contact you soon regarding the next steps.
      </p>

      {/* Timer Info */}
      <div className="flex items-center gap-2 text-gray-500 font-medium mt-2">
        <Timer />
        <p className="text-sm sm:text-base">Response within 2-3 business days</p>
      </div>
    </div>
  )
}

export default InterviewComplete