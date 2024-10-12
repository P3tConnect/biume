import React from 'react'

const RelevantCompanySection = () => {
  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Relevant Companies</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {/* This is a placeholder. In a real scenario, you'd map over an array of companies */}
          {[1, 2, 3, 4, 5].map((company) => (
            <div key={company} className="flex-shrink-0 w-64 bg-white shadow-md rounded-lg p-4">
              <div className="w-full h-32 bg-gray-200 rounded-md mb-4"></div>
              <h3 className="font-semibold text-lg mb-2">Company Name {company}</h3>
              <p className="text-sm text-gray-600 mb-2">Short description of the company...</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RelevantCompanySection