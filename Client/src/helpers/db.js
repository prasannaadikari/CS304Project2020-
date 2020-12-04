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
  getAllSettings() {
    return DBS;
  }
  
  createAppointment(appointment) {
    return DBA.push(appointment);
  }
  createSettings(Settings) {
    return DBS.push(Settings);
  }

  createProfile(profile) {
    return DBP.push(profile);
  }

  update(key, value) {
    return DBP.child(key).update(value);
  }

  delete(key) {
    return DBA.child(key).remove();
  }

  deleteAll() {
    return DBA.remove();
  }
}

export default new Db();

