import { remove } from '../repositories/todoRepository'

export const handler = async (event) => {
  
  const result = await remove(event.pathParameters.id)

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
