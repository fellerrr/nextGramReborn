import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabaseClient";

const usePhotos =()=>{
  const [photos, setPhotos] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(()=>{
    (async ()=>{
      setIsLoading(true)
      const response = await supabase.from('photos').select()
      setPhotos(response.data)
      setIsLoading(false)
    })()
  },[])
  return [photos, isLoading]
}

export default usePhotos

