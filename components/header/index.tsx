'use client'

import React from 'react'
import { 
  baseLink, 
  trelloPrimaryColor
} from '../literals'
import Image from 'next/image'
import Avatar from 'react-avatar'
import { GlobalSearch } from './global-search'
import { SummaryCard } from './summary-card'

export const HeaderComponent = () => {
  return (
    <header>
      <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl'>
        
        <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50'/>

        <Image
          src={`${baseLink}/c2cdd5`} 
          alt='Trello logo' 
          width={300} 
          height={100} 
          className='w-44 md:w-56 pb-10 md:pb-0 object-contain'
         />

        <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
          <GlobalSearch/>
          <Avatar name="Pranav Ruparelia" round color={trelloPrimaryColor} size='50'/>
        </div>

      </div>

      <SummaryCard/>
      
    </header>
  )
}
