import Image from "next/image";
import { PhotoI } from  '@/types'

type Props = {
  photo:PhotoI
}
const Photo = ({photo}:Props) => {
  console.log(photo)
  return (
    <>
      <Image
        alt=""
        src={photo.url}
        height={600}
        width={600}
        className="w-full object-cover aspect-square col-span-2"
      />
    </>
  );
}

export default Photo;