import React from 'react'

function InfoSection({trip}) {
  return (
    <div>
        <img src="/placeholder.png" className='h-[340px] w-full object-cover rounded-sm' alt="image" />
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='text-2xl font-bold'>{trip?.userSelection?.location?.label}</h2>
            <div>
                <h2>{trip?.userSelection?.noOfDays}</h2>
            </div>
        </div>
      
    </div>
  )
}

export default InfoSection;
