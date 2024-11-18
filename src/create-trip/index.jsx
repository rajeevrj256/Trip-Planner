import { Input } from '@/components/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/Options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '@/components/button';
//import { toast } from '@/hooks/use-toast';
import { toast } from "sonner"
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
//import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';




function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate()
  const handleInputChange = (name, value) => {
    // if(name=='noofDays' && value>5){
    //   console.log("Please eneter trip days less than 5")
    //   return;
    // }
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDailog(true)
      return;
    }
    if (formData?.noofDays > 30 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("please fill all deatils")

      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noofDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noofDays)

    //console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    //console.log(result?.response.text());
    setLoading(false);
    SaveAiTrip(result?.response.text());
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId

    });


    setLoading(false);
    navigate('/view-trip/'+docId)

  }

  const GetUserProfile = (tokeninfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokeninfo?.access_token}`,
        Accept: 'Application/json',
      }
    }).then((resp) => {
      console.log(resp)
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      OnGenerateTrip();
    })
  };


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>

      <h2 className='font-bold text-3xl'>Tell us your travel preferences☀️🌴🏖️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      <div className='mt-20 flex flex-col gap-10'>
        <div >
          <h2 className='text-xl mt-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }

            }}
          />
        </div>
        <div>
          <h2 className='text-xl mt-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.3'}
            onChange={(e) => handleInputChange('noofDays', e.target.value)}
          >
          </Input>
        </div>


        <div>
          <h2 className='text-xl mt-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
            ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-s, text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div >
        <div>
          <h2 className='text-xl mt-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
              ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-s, text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div >
      </div>
      <div className='my-10 justify-end flex'>

        <Button
          disabled={loading}
          onClick={OnGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'  /> : "Generate Trip"
          }
        </Button>
      </div>
      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>

            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>

                Sign in to the App with Google authentication Security</p>

              <Button

                className='w-full mt-5 flex gap-4 items-center'
                onClick={login}>

                <FcGoogle className='h-7 w-7' />
                Sign in With Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip