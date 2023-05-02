export interface PhotoI {
  caption: string | null
  created_at: string | null
  id: number
  likes: number
  url: string
  user_id: string
}
export interface IfNewPhotoI{
  ifNewPhoto: boolean;
}
export interface Upload extends IfNewPhotoI {

  setIfNewPhoto: (value: boolean) => void;
}
export interface HeaderProps extends Upload {
  user: string;

}

export interface ModalProps extends HeaderProps {
  photo: PhotoI;
}

export interface FormDataI {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}