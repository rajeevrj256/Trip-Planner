import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
//import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
  const users = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDailog] = useState(false);
  
  useEffect(() => {
    console.log(users);
  }, [])
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

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
      window.location.reload();
    })
  };

  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-3'>
      <img src="/logo.svg" alt="logo" />
      <div>
        {users ?
          <div className='flex items-center gap-3'>
            <a href='/create-trip'>
            <Button variant="Outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button variant="Outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
            <img src={users?.picture} className='h-[35px] w-[35px] rounded-full' />

              </PopoverTrigger>
              <PopoverContent>
                <a href="/">
                <h2 className="cursor-pointer" onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
                </a>
              </PopoverContent>
            </Popover>


          </div>
          : <Button onClick={()=>setOpenDailog(true)}>Sign In</Button>
        }
      </div>
      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>
          {/* <DialogClose onClick={() => setOpenDailog(false)}></DialogClose> */}

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

export default Header