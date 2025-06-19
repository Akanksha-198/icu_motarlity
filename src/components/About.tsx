import React from 'react'

const about = () => {
  return (
    <div  className="mt-16 bg-white p-10 rounded-3xl shadow-lg max-w-5xl mx-auto hover:shadow-xl transition duration-300"
>
      <h2 className="text-3xl font-bold mb-4 text-purple-800">About</h2>
          <p className="text-purple-700 leading-relaxed text-lg">
            This is an ICU assistant system that estimates mortality risk using
            34 critical clinical parameters. Designed for medical professionals,
            this tool helps in decision-making with the power of ML.
          </p>
    </div>
  )
}

export default about
