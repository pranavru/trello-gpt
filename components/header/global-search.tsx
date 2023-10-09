import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

export const GlobalSearch = () => {
  return (
    <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
      <MagnifyingGlassIcon className='h-6 w-6 text-gray-400'/>
      <input 
        type='text' 
        placeholder='Search' 
        className='flex-1 outline-none p-2'
      />
      <button 
        hidden 
        type='submit' 
      >
        {'Search'}
      </button>
    </form>
  )
}
