import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabaseClient";
import { PhotoI } from  '@/types'

const usePhoto = (id: string | string[] | undefined) =>{
  const [photo, setPhoto] = useState<PhotoI | null>(null)
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
      setPhoto(response.data as PhotoI | null)
      setIsLoading(false)
    })()
  },[id])
  return [photo, isLoading]
}

export default usePhoto

