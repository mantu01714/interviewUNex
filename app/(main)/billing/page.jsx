"use client";
import { useUser } from '@/app/provider'
import { PricingPlan } from '@/services/Constants'
import React from 'react'

function BillingCredits() {
  const { user } = useUser();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10 lg:px-8 lg:py-12 xl:py-16">
        {/* Header Section - Responsive */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Choose Your Plan
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Select the perfect plan for your needs with flexible pricing options
          </p>
        </div>

        {/* Pricing Cards Grid - Fully Responsive */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3  xl:gap-8">
          {
            PricingPlan.map((plan, index) => (
              <div 
                key={index} 
                className="relative shadow-2xl shadow-primary bg-white divide-y divide-gray-200 rounded-xl sm:rounded-2xl border border-gray-200  hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                

                {/* Plan Header */}
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="text-center">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                      {plan?.plan}
                    </h2>

                    {/* Price Display - Responsive Typography */}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                          ₹{plan?.price}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                        {
                          plan?.price === 200.00 ? 'for 8 credits' :
                          plan?.price === 700.00 ? 'for 35 credits' :
                          plan?.price === 2500.00 ? 'for 100 credits' : ''
                        }
                      </p>
                    </div>

                    {/* CTA Button - Responsive */}
                    <a
                      className="w-full inline-block rounded-lg border-2 border-blue-600 bg-blue-600 px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 text-center text-sm sm:text-base font-medium text-white hover:bg-blue-700 hover:border-blue-700 active:bg-blue-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
                      href={plan?.link+'?prefilled_email='+user?.email}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started
                    </a>
                  </div>
                </div>

                {/* Features Section */}
                <div className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">
                    What's included:
                  </h3>

                  <ul className="space-y-3 sm:space-y-4">
                    {/* Credits */}
                    <li className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base text-gray-700 font-medium">
                        {
                          plan?.credits === 8 ? '8 Credits' :
                          plan?.credits === 35 ? '35 Credits' :
                          plan?.credits === 100 ? '100 Credits' : ''
                        }
                      </span>
                    </li>

                    {/* Storage */}
                    <li className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base text-gray-700">
                        {
                          plan?.credits === 8 ? '2 GB' : 
                          plan?.credits === 35 ? '5 GB' :
                          plan?.credits === 100 ? '20 GB' : ''
                        } of storage
                      </span>
                    </li>

                    {/* Email Support */}
                    <li className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base text-gray-700">
                        Email support
                      </span>
                    </li>

                    {/* Help Center Access */}
                    <li className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-shrink-0">
                        {plan?.credits === 8 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm sm:text-base ${plan?.credits === 8 ? 'text-gray-400' : 'text-gray-700'}`}>
                        Help center access
                      </span>
                    </li>

                    {/* Phone Support */}
                    <li className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-shrink-0">
                        {plan?.credits === 100 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm sm:text-base ${plan?.credits === 100 ? 'text-gray-700' : 'text-gray-400'}`}>
                        Phone support
                      </span>
                    </li>

                    {/* Community Access */}
                    <li className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-shrink-0">
                        {plan?.credits === 100 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm sm:text-base ${plan?.credits === 100 ? 'text-gray-700' : 'text-gray-400'}`}>
                        Community access
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default BillingCredits