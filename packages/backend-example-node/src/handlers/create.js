import { create } from '../repositories/todoRepository'

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

  const created = await create({ text, completed })

  return {
    statusCode: 201,
    body: JSON.stringify(created)
  };
};
