import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useState,useEffect } from 'react'
import { IoIosSend } from "react-icons/io";

//const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
function InfoSection({trip}) {

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
    <div >
        <img src={PhotoUrl?PhotoUrl:'/placeholder.jpg'} className='h-[340px] w-full object-cover rounded-xl' alt="image" />
        <div className='flex justify-between items-center'>

        <div className='my-5 flex flex-col gap-2'>
            <h2 className='text-2xl font-bold'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅{trip?.userSelection?.noofDays} Day</h2>
                <h2 className='p1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💲{trip?.userSelection?.budget} Budget</h2>
                <h2 className='p1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂No. of traveler: {trip?.userSelection?.traveler} </h2>
            </div>
        </div>
        <Button> <IoIosSend /></Button>
        </div>
      
    </div>
  )
}

export default InfoSection;
