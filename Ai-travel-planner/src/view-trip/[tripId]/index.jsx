import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ViewTrip() {
    const {tripId}=useParams();
    const [trip,setTrip]=useState(null);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Doc",docSnap.data());
            setTrip(docSnap.data());
        }else{
            console.log("No such Documents");
            toast("No trip Found");
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default ViewTrip;
