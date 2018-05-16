import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import firebase, { auth, db } from "@/firebase.js";

Vue.use(Vuex);

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

// { workHours: 10-12, freeHours: 2-4, lectureHours: 12-2}

// uid/lectureHours
// uid/workHours
// uid/freeHours

// Cunt Was here!!

// export default new Vuex.Store({
//   state: {
//     freeHours: {},
//     workHours: {},
//     lectureHours: {}
//   },
//   mutations: {},
//   actions: {
//     getFreeHours({ commit }, { uid, day }) {
//       const { db } = Vue;
//       console.log(db);
//       const userMeta = db
//         .ref(`${uid}/meta`)
//         .once("value", snapshot => {
//           const eta = {
//             meta: snapshot.val(),
//             id: snapshot.key
//           };
//           return eta.meta;
//         })
//         .then(meta => {
//           this.setState({
//             freeHours: meta.week.day.freeHours
//           });
//           console.log("Done with freeHours");
//         });
//     },
//     getWorkHours({ commit }, { uid, day }) {
//       const { db } = Vue;
//       console.log(db);

//       const userMeta = db
//         .ref(`${uid}/meta`)
//         .once("value", snapshot => {
//           const eta = {
//             meta: snapshot.val(),
//             id: snapshot.key
//           };
//           return eta.meta;
//         })
//         .then(meta => {
//           this.setState({
//             workHours: meta.week.day.workHours
//           });
//           console.log("Done with workHours");
//         });
//     },
//     getLectureHours({ commit }, { uid, day }) {
//       const { db } = Vue;
//       const hours = [];
//       const userMeta = db
//         .ref(`${uid}/classes`)
//         .once("value", snapshot => {
//           snapshot.forEach(childSnapshot => {
//             const eachClass = {
//               classData: childSnapshot.val(),
//               id: childSnapshot.key
//             };

//             classData.days.forEach(lsDay => {
//               if (lsDay == day) {
//                 hours += classData.hours;
//               }
//             });
//           });
//           return hours;
//         })
//         .then(hours => {
//           this.setState({
//             lectureHours: hours
//           });
//           console.log("Done with lectureHours");
//         });
//     }
//   }
// });

export default new Vuex.Store({
  state: {
    freeHours: {},
    workHours: {},
    lectureHours: {},
    loading: false,
    currentUser: null,
    events: [],
    tasks: {}
  },
  mutations: {
    setFreeHours(state, { freeHours }) {
      state.freeHours = freeHours;
    },
    setWorkHours(state, { workHours }) {
      state.workHours = workHours;
    },
    setLectureHours(state, { lectureHours }) {
      state.lectureHours = lectureHours;
    },
    setLoading(state, { loading }) {
      state.loading = loading;
    },
    setCurrentUser(state, { currentUser }) {
      state.currentUser = currentUser;
    },
    setTasks(state, { tasks }) {
      state.tasks = tasks;
    }
  },
  actions: {
    getFreeHours({ commit }, { uid, day }) {
      db()
        .ref(`${uid}/meta`)
        .once("value", ({ val, key }) => ({
          meta: val(),
          id: key
        }))
        .then(({ meta, id }) =>
          commit("setFreeHours", meta.week[day].freeHours)
        );

      // TODO: merge prev state with new state and separate into days
    },
    getWorkHours({ commit }, { uid, day }) {
      db()
        .ref(`${uid}/meta`)
        .once("value", ({ val, key }) => ({
          meta: val(),
          id: key
        }))
        .then(({ meta, id }) =>
          commit("setWorkHours", meta.week[day].workHours)
        );
    },
    getLectureHours({ commit }, { uid, day }) {
      db()
        .ref(`${uid}/classes`)
        .once("value", ({ val, key }) => ({
          meta: val(),
          id: key
        }))
        .then(({ meta, id }) =>
          commit("setLectureHours", meta.week[day].freeHours)
        );
    },
    emailSignin({ commit }, { username, password }) {
      return auth()
        .signInWithEmailAndPassword(username, password)
        .then(user => {
          commit("setCurrentUser", {
            currentUser: user
          });
        })
        .then(() => router.push("/dashboard"));
    },
    facebookSignin({ commit }) {
      if (!auth().currentUser) {
        const provider = new firebase.auth.FacebookAuthProvider();
        return auth()
          .signInWithPopup(provider)
          .then(() => router.push("/dashboard"));
      } else {
        commit("signout");
      }
    },
    googleSignin({ commit }) {
      if (!auth().currentUser) {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth()
          .signInWithPopup(provider)
          .then(() => router.push("/dashboard"));
      } else {
        commit("signout");
      }
    },
    register({ commit }, { username, password }) {
      return auth()
        .createUserWithEmailAndPassword(username, password)
        .then(({ user }) => {
          user.sendEmailVerification();
          return user;
        })
        .then(user =>
          commit("setCurrentUser", {
            currentUser: user
          })
        )
        .then(() => router.push("/signin"));
    },
    signoutWithoutPush({ commit }) {
      auth()
        .signOut()
        .then(() =>
          commit("setCurrentUser", {
            currentUser: null
          })
        );
      // .then(() => router.push("/signin"));
    },
    signout({ commit, dispatch }) {
      dispatch("signoutWithoutPush").then(() => router.push("/signin"));
    },
    currentUser({ commit }, firebaseUser) {
      commit("setCurrentUser", {
        currentUser: firebaseUser
      });
    },
    resetPassword({ commit }, { username }) {
      return auth()
        .sendPasswordResetEmail(username)
        .then(() => router.push("/login"));
    },
    changePassword({ commit }, { username, currentPassword, newPassword }) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        username,
        currentPassword
      );

      const { currentUser } = auth();
      return currentUser
        .reauthenticateWithCredential(credential)
        .then(() => currentUser.updatePassword(newPassword));
    },
    getScheduledTasksforTheDay(
      {
        commit,
        state: { tasks }
      },
      { uid, day }
    ) {
      db()
        .ref(`${uid}/tasks`)
        .once("value", snapshot => {
          const d = day.toLowerCase().trim();
          return snapshot.filter(item => d === item.day.toLowerCase().trim());
        })
        // .then(item => item.map({ day, estimatedTime } => ({ day, estimatedTime })))
        .then(items =>
          commit("setTasks", {
            tasks: [...tasks, ...items]
          })
        );
    },
    getEvents({ commit, dispatch }, { uid }) {
      const freeHoursPromise = days.map(d =>
        dispatch("getFreeHours", {
          uid,
          day: d
        })
      );
      const workHoursPromise = days.map(d =>
        dispatch("getWorkHours", {
          uid,
          days: d
        })
      );

      const lectureHoursPromise = days.map(d =>
        dispatch("getWorkHours", {
          uid,
          day: d
        })
      );

      Promise.all(freeHoursPromise).then(() => {});
      Promise.all(workHoursPromise).then(() => {});
      Promise.all(lectureHoursPromise).then(() => {});
    }
  },
  getters: {}
});
