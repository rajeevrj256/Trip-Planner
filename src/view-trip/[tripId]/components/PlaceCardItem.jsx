import { Button } from '@/components/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoLocation } from "react-icons/io5";
import { Link } from 'react-router-dom';


function PlaceCardItem({place}) {
    
    const [PhotoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
     GetPlacePhoto()
  },[place])
  const GetPlacePhoto=async()=>{
    //console.log("getplacephotfunction start")
    const data={
      textquery:place.placeName
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      //console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
    //console.log("getplacephotfunction end")
  }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={PhotoUrl?PhotoUrl:'/placeholder.jpg'}
      className='w-[130px] h-[130px] rounded-xl object-cover'
      />
      <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm text-gray-400'>{place.placeDetails}</p>
        <h2 className='mt-2'>🕧{place.travelTime}</h2>
        {/* <Button className='sm'><IoLocation /></Button> */}
      </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem
