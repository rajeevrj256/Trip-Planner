import React from 'react'
import { Link } from 'react-router-dom'
import HotelCard from './HotelCard'

function Hotels({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-4 gap-5 mt-5'>
        {trip?.tripData?.hotels?.map((hotel,index)=>(
           <HotelCard hotel={hotel}></HotelCard>
        ))}
      </div>
    </div>
  )
}

export default Hotels