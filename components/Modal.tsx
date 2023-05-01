import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {supabase} from "@/lib/supabaseClient";

export default function Modal({ user, photo, ifNewPhoto, setIfNewPhoto }) {
  const overlay = useRef<HTMLDivElement>(null!)
  const wrapper = useRef<HTMLDivElement>(null!)
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const DeletePhoto = async ()=> {
    const { error } = await supabase
      .from('photos')
      .delete()
      .match({ id: photo.id })

    if (error) {
      alert(error)
    } else {
      onDismiss()
      setIfNewPhoto(!ifNewPhoto)
    }
  }

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={onClick}
    >
      {user && <button
        className='absolute right-8 top-8 text-red-700
        px-2 bg-amber-200 rounded-md hover:font-bold'
        onClick={DeletePhoto}
      >Удалить</button>}
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
      >
        <>
          <img
            alt=""
            src={photo.url}
            height={600}
            width={600}
            className="w-full object-cover aspect-square col-span-2"
          />

          {/*<div className="bg-white p-4 px-6">*/}
          {/*  <h3>{photo.caption}</h3>*/}
          {/*  /!*<p>Taken by {photo.username}</p>*!/*/}
          {/*</div>*/}
        </>
      </div>
    </div>
  );
}