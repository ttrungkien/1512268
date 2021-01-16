const db = require('../utils/db');

const TBL_USERS = 'users';

module.exports = {
  all() {
    return db.load(`select * from ${TBL_USERS}`);
  },

  async lecturers() {
    const rows = await db.load(`select * from ${TBL_USERS} where role = 'LECTURER'`);
    return rows;
  },

  async single(id) {
    const rows = await db.load(`select * from ${TBL_USERS} where id = '${id}'`);
    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  },

  async singleByUsername(username) {
    const rows = await db.load(`select * from ${TBL_USERS} where username = '${username}'`);
    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  },

  add(entity) {
    return db.add(entity, TBL_USERS);
  },

  del(entity) {
    const condition = { id: entity.id };
    return db.del(condition, TBL_USERS);
  },

  patch(entity) {
    const condition = { id: entity.id };
    delete entity.id;
    return db.patch(entity, condition, TBL_USERS);
  },
}