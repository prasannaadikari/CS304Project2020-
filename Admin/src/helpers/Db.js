import firebase from "../services/firebase";

const DBA = firebase.ref("/appointments");
const DBP = firebase.ref("/profiles");
const DBS = firebase.ref("/settings");

class Db {
  getAllAppointments() {
    return DBA;
  }

  getAllProfiles() {
    return DBP;
  }
  createAppointment(appointment) {
    return DBA.push(appointment);
  }
  getAllSettings() {
    return DBS;
  }

  updateAppointment(key, value) {
    return DBA.child(key).update(value);
  }
  updateSettings(key, value) {
    return DBS.child(key).update(value);
  }

  delete(key) {
    return DBA.child(key).remove();
  }

  deleteAll() {
    return DBA.remove();
  }
}

export default new Db();

