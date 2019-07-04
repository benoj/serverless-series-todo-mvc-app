import { update } from '../repositories/todoRepository'

export const handler = async (event) => {
  let text, completed
  try {
    const result = JSON.parse(event.body);
    text = result.text
    completed = result.completed || false
  } catch (e) {
    return {
      statusCode: 400,
      body: e.message
    };
  }

  const result = await update(event.pathParameters.id, { text, completed })

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
