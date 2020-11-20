import firebase from "../services/firebase";

const DBA = firebase.ref("/appointments");
const DBP = firebase.ref("/profile");

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
  createProfile(profile) {
    return DBP.push(profile);
  }

  update(key, value) {
    return DBA.child(key).update(value);
  }

  delete(key) {
    return DBA.child(key).remove();
  }

  deleteAll() {
    return DBA.remove();
  }
}

export default new Db();

