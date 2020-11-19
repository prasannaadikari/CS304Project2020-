import firebase from "../services/firebase";

const DB = firebase.ref("/appointments");

class Db {
  getAll() {
    return DB;
  }

  create(appointment) {
    return DB.push(appointment);
  }

  update(key, value) {
    return DB.child(key).update(value);
  }

  delete(key) {
    return DB.child(key).remove();
  }

  deleteAll() {
    return DB.remove();
  }
}

export default new Db();
