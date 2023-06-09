import Head from 'next/head'
import {useRouter} from "next/router";
import usePhotos from "@/utils/usePhotos";
import Link from "next/link";
import usePhoto from "@/utils/usePhoto";
import Modal from "@/components/Modal";
import {supabase} from "@/lib/supabaseClient";
import Header from "@/components/Header";
import {useEffect, useState} from "react";


export default function Home() {
  const [user, setUser] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.email) {
        setUser(`${user?.email}`)
        setLoading(false)
      }

    };
    getCurrentUser();
  }, []);

  const router = useRouter();
  const { photoId } = router.query
  const [photo] = usePhoto(photoId)
  const [ifNewPhoto, setIfNewPhoto] = useState(false)

  const [photos, isLoading] = usePhotos(ifNewPhoto)
  return (
    <div className='container mx-auto '>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header user={user} ifNewPhoto={ifNewPhoto} setIfNewPhoto={setIfNewPhoto} />
      <main className="">
        {photo && photo !== true && <Modal user={user} photo={photo} ifNewPhoto={ifNewPhoto} setIfNewPhoto={setIfNewPhoto}/>}
        {isLoading
          ? <p>Loading...</p>
          : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 auto-rows-max	 gap-6 m-10">
            {photos && photos !== true && photos.map(({ id, url }) => (
              <Link
                key={id}
                // href={`/photos/${id}`}
                href={{pathname: '/', query:{photoId:id}}}
                as={`/photos/${encodeURI(String(id))}`}
                shallow
              >
                <img
                  alt=""
                  src={url}
                  height={500}
                  width={500}
                  className="w-full object-cover aspect-square"
                />
              </Link>
            ))}
            </div>
        }

      </main>
    </div>
  )
}