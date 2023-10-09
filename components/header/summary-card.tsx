import { UserCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'

export const SummaryCard = () => {
  const summary = 'GPT is summarizing your tasks for the day....';

  return (
    <div className='flex items-center justify-center px-5 py-2 md:py-5'>
      <p className='flex items-center p-5 text-sm font-light shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]'>
        <UserCircleIcon className='inline-block h-10 w-10 text-[#0055D1] mr-1'/>
        {summary}
      </p>
    </div>
  )
}
