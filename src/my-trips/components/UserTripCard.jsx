import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({trip}) {
    const [PhotoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
     GetPlacePhoto()
  },[trip])
  const GetPlacePhoto=async()=>{
    //console.log("getplacephotfunction start")
    const data={
      textquery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      //console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
    //console.log("getplacephotfunction end")
  }
  return (
    <Link to={'/view-trip/'+trip?.id}>
   
    <div className='hover:scale-105 transition-all hover:shadow-md'>
        
        <img src={PhotoUrl?PhotoUrl:'/placeholder1.jpg'}
        className="object-cover rounded-xl h-[220px]" />
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection.noofDays} Days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
      
    </div>
    </Link>
  )
}

export default UserTripCard
