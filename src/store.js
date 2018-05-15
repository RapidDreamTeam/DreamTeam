import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import firebase, { auth } from "@/firebase.js";

Vue.use(Vuex);

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
    currentUser: null
  },
  mutations: {
    setFreeHours: (state, { freeHours }) => {
      state.freeHours = freeHours;
    },
    setWorkHours: (state, { workHours }) => {
      state.workHours = workHours;
    },
    setLectureHours: (state, { lectureHours }) => {
      state.lectureHours = lectureHours;
    },
    setLoading: (state, { loading }) => {
      state.loading = loading;
    },
    setCurrentUser: (state, { currentUser }) => {
      state.currentUser = currentUser;
    }
  },
  actions: {
    computeFreeHours: ({ commit }, { uid, day }) => {
      db()
        .ref(`${uid}/meta`)
        .once("value", ({ val, key }) => ({
          meta: val(),
          id: key
        }))
        .then(({ meta, id }) => commit("setFreeHours", meta.week[day].freeHours));
    },
    getWorkHours: ({ commit }, { uid, day }) => {
      db()
        .ref(`${uid}/meta`)
        .once("value", ({ val, key }) => ({
          meta: val(),
          id: key
        }))
        .then(({ meta, id }) => commit("setWorkHours", meta.week[day].workHours));
    },
    getLectureHours: ({ commit }, { uid, day }) => {
      // commit("setLectureHours", null);
      db()
      .ref(`${uid}/classes`)
      .once("value",({ val, key }) => ({
        meta: val(),
        id: key
      }))
      .then(({ meta, id }) => commit("setLectureHours", meta.week[day].freeHours));
    },
    emailSignin: ({ commit }, { username, password }) => {
      return auth()
        .signInWithEmailAndPassword(username, password)
        .then(u => {
          console.log(u);
          return u;
        })
        .then((user) => {
          commit("setCurrentUser", {
            currentUser: user
          });
        });
    },
    facebookSignin: ({commit}) => {
      if (!auth().currentUser) {
        const provider = new firebase.auth.FacebookAuthProvider();
        auth().signInWithPopup(provider)
        .then((user) => {
          commit("setCurrentUser", {
            currentUser: user
          });
        })
        .then(() => router.push("/dashboard"))
      } else {
        commit("signout");
      }
    },
    googleSignin: ({ commit }) => {
      if (!auth().currentUser) {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth().signInWithPopup(provider)
        .then((user) => {
          commit("setCurrentUser", {
            currentUser: user
          });
        }).then(() => router.push("/dashboard"))
      } else {
        commit("signout");
      }
    },
    register: ({ commit }, { username, password }) => {
      return auth()
        .createUserWithEmailAndPassword(username, password)
        .then(({ user }) => {
          user.sendEmailVerification();

          return user;
        })
        .then(user => {
          commit("setCurrentUser", {
            currentUser: user
          });
        })
        .then(() => router.push("/signin"));
    },
    signout: ({ commit }) => {
      //  this.$store.dispatch('signout')
      auth().signOut();
      commit("setCurrentUser", null);
      router.push("/login");
    },
    currentUser: ({ commit }, firebaseUser) => {
      commit("setCurrentUser", firebase);
    },
    resetPassword: ({ commit }, { username }) => {
      return auth()
        .sendPasswordResetEmail(user)
        .then(() => router.push("/login"));
    },
    changePassword: (
      { commit },
      { username, currentPassword, newPassword }
    ) => {
      const credential = firebase.auth.EmailAuthProvider.credential(
        username,
        currentPassword
      );

      const { currentUser } = auth();
      return currentUser
        .reauthenticateWithCredential(credential)
        .then(() => currentUser.updatePassword(newPassword));
    }
  },
  getters: {}
});
