import { getAll } from '../repositories/todoRepository'

export const handler = async () => {
  const todos = await getAll()
  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};
