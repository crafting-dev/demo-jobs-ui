export const parseErrorDetailsFromResponse = async (
  resp: Response
): Promise<{ error: string }> => {
  const parsed = JSON.parse(await resp.text()).message
  return { error: parsed }
}
