import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabaseClient";
import {PhotoI} from '@/types'

const usePhotos =(ifNewPhoto:boolean)=>{
  const [photos, setPhotos] = useState<PhotoI[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(()=>{
    (async ()=>{
      setIsLoading(true)
      const response = await supabase.from('photos').select()
      setPhotos(response.data as PhotoI[])
      setIsLoading(false)
    })()
  },[ifNewPhoto])
  return [photos, isLoading]
}

export default usePhotos

