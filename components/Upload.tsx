import  {useState, useEffect, FC, ChangeEvent} from "react";
import { supabase } from "@/lib/supabaseClient";
import {useRouter} from "next/router";
import {Upload} from "@/types";


const Upload:FC<Upload> = ({ifNewPhoto, setIfNewPhoto}) => {
  const [uploading, setUploading] = useState(false)
  const router = useRouter()
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    try{
      setUploading(true)

      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        let {error: uploadError} = await supabase.storage
          .from('photos')
          .upload(filePath, file)

        if (uploadError) {
          throw uploadError
        }

        const {
          data: {publicUrl}
        }
          = supabase.storage.from('photos').getPublicUrl(filePath)

        const {
          data: { user },
        } = await supabase.auth.getUser()

        await supabase.from('photos').insert({
          user_id: user?.id,
          url: publicUrl
        })
      }

      if (!event.target.files || event.target.files.length === 0){
        throw new Error('Выберите фото для загрузки')
      }

    }
    catch (error){
      alert((error as Error).message)
    }
    finally {
      setUploading(false)
      setIfNewPhoto(!ifNewPhoto)
    }
  }


  return (
    <div>
      <div style={{width:300}}>
        <label
          htmlFor="file-input"
          className='text-green-700 text-xl hover:font-bold cursor-pointer'
        >
          {uploading ? "Загрузка..." : "Загрузить новое фото"}
        </label>
        <input
          className='hidden'
          id="file-input"
          type='file'
          accept='image/*'
          onChange={upload}
          disabled={uploading}
        />
      </div>
    </div>
  )
}

export default  Upload