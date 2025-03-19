import { useMutation } from "@tanstack/react-query"
import { createPost } from "../../apis/post/createPost"
import { Article } from "../../types"

export const useCreatePost = () => {
  
  const response = useMutation({
    mutationFn: (data: Article) => createPost(data)
  })

  return {
    ...response,
    data: response.data || null
  }

}