import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabaseClient";

const usePhoto = (id: string | string[] | undefined) =>{
  const [photo, setPhoto] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(()=>{
    (async ()=>{
      if (!id){
        setIsLoading(false)
        setPhoto(null)
        return
      }
      setIsLoading(true)
      const response = await supabase
        .from('photos')
        .select()
        .eq('id', id)
        .single()
      setPhoto(response.data)
      setIsLoading(false)
    })()
  },[id])
  return [photo, isLoading]
}

export default usePhoto

