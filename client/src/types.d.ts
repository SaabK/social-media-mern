export interface Post {
  // * ! 👇 This might be the problem
  _id?: string,
  title: string,
  message: string,
  tags: string[],
  likes?: string[],
  creator: string,
  selectedFile: string,
  createdAt?: Date,
}

export interface PostsState {
  posts: Post[],
  error: string,
  status: 'idle' | 'success' | 'failed' | 'loading'
}

export interface IdProps {
  currentId?: string,
  setCurrentId: React.Dispatch<React.SetStateAction<string>>
}

export interface InputFieldProps {
  half?: boolean,
  name: string,
  label: string,
  type: string,
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  handlePassword?: () => void,
}

export interface AuthState {
  authData: {
    token: string,
    data: {
      name: string,
      picture: string,
      email: string,
      _id?: string,
      sub?: string
    }
  } | null,
  status: 'idle' | 'success' | 'failed' | 'loading',
  error: string
}

export type TokenAndData = AuthState['authData'];

export interface IFormData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}