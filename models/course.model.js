const db = require('../utils/db');

const TBL_COURSES = 'courses';

module.exports = {
  all() {
    return db.load(`select * from ${TBL_COURSES}`);
  },

  async single(id) {
    const rows = await db.load(`select * from ${TBL_COURSES} where id = ${id}`);
    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  },

  add(entity) {
    return db.add(entity, TBL_COURSES);
  },

  del(entity) {
    const condition = { id: entity.id };
    return db.del(condition, TBL_COURSES);
  },

  patch(entity) {
    const condition = { id: entity.id };
    delete entity.id;
    return db.patch(entity, condition, TBL_COURSES);
  },
}