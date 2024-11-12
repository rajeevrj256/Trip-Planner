import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function HotelCard({ hotel }) {

    const [PhotoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
     GetPlacePhoto()
  },[hotel])
  const GetPlacePhoto=async()=>{
    //console.log("getplacephotfunction start")
    const data={
      textquery:hotel.hotelName
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      //console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
    //console.log("getplacephotfunction end")
  }
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={PhotoUrl?PhotoUrl:'/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover '></img>
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel.hotelName}</h2>
                    <h2 className='text-sx text-gray-600'>📌{hotel.hotelAddress}</h2>
                    <h2 className='text-sm'>💸{hotel?.price}</h2>
                    <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard;
