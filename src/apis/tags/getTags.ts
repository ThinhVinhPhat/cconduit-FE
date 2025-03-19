import server from ".."

export const getTag = async () => {
  const response = await server.get("tag")
  return response.data
}