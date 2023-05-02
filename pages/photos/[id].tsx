import React from "react";
import Photo from "@/components/frame";
import {useRouter} from "next/router";
import usePhoto from "@/utils/usePhoto";


export default function PhotoPage() {
  const router = useRouter();
  const { id } = router.query
  const [photo] = usePhoto(id)

  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        {!photo || photo === true ? <p>loading...</p> : <Photo photo={photo} />}
      </div>
    </div>
  );
}