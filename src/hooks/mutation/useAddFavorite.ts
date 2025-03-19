import { useMutation } from "@tanstack/react-query"
import { createPost } from "../../apis/post/createPost"

export const useAddFavorite = () => {
  
  const response = useMutation({
    mutationFn: (articleId: string) => createPost(articleId)
  })

  return {
    ...response,
    data: response.data || null
  }

}