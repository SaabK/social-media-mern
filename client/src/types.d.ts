export interface Post {
  // * ! 👇 This might be the problem
  _id?: string,
  title: string,
  message: string,
  creator: string,
  tags: string[],
  selectedFile: string,
  createdAt?: Date,
  likeCount?: number
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