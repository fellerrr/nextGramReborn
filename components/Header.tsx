import React, {useEffect, useState} from 'react';
import {supabase} from "@/lib/supabaseClient";
import {useRouter} from "next/router";
import Upload from "@/components/Upload";


const Header = ({user, ifNewPhoto, setIfNewPhoto}) => {
  const router = useRouter()


  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error signing out:', error.message)
    else router.push('/auth')
  }

  return (
    <div className='flex justify-between px-4 items-center'>
      <h1 className="text-center text-4xl text-cyan-950 font-bold m-10">SakuraGram</h1>
      {user && <Upload ifNewPhoto={ifNewPhoto} setIfNewPhoto={setIfNewPhoto}/>}
      <div className='flex flex-col justify-center items-center'>
        {user ? <>
            <h2 className='text-xl font-bold text-cyan-950 mb-2'>{user}</h2>
            <button onClick={handleSignOut}
                    className='bg-cyan-700 text-white px-2 py-0.5 hover:opacity-80'
            >
              Sign Out
            </button>
          </>
          : <button onClick={handleSignOut}
                    className='text-xl font-bold text-cyan-950 mb-2'
            >
              Войти в профиль
            </button>
        }

      </div>
    </div>
  );
};

export default Header;