import { db }  from '../db'

export const getAll = () => {
  return db.table('todos').select()
}

export const create = async ({ text, completed}) => {
  const [result] = await db.insert({ text, completed }).table('todos').returning('*');
  return result
}
export const update = (id, params) => {
  return db.table('todos').where('id', id).update(params).returning('*');
}
export const remove = (id) => {
  return db.table('todos').where('id', id).delete().returning('*');
}

