const db = require("../src/config/database");

const query = {
  all(sql, params = []) {
    return db.prepare(sql).all(...params);
  },

  get(sql, params = []) {
    return db.prepare(sql).get(...params);
  },

  run(sql, params = []) {
    return db.prepare(sql).run(...params);
  },

  transaction(callback) {
    return db.transaction(callback)();
  },
};

module.exports = query;
