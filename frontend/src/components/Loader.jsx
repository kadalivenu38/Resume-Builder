import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-900'>
        <div className='size-14 border-3 border-green-500 border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}

export default Loader