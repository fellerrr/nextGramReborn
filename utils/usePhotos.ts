import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabaseClient";

const usePhotos =(ifNewPhoto)=>{
  const [photos, setPhotos] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(()=>{
    (async ()=>{
      setIsLoading(true)
      const response = await supabase.from('photos').select()
      setPhotos(response.data)
      setIsLoading(false)
    })()
  },[ifNewPhoto])
  return [photos, isLoading]
}

export default usePhotos

