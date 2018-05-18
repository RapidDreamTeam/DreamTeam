import Vue from "vue";
import Vuex from "vuex";
import { authentication } from "./authentication";
import { taskManagement } from "./taskManagement";

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
  modules: {
    auth: authentication,
    task: taskManagement
  },
  state: {
    loading: false
  },
  mutations: {
    setLoading(state, { loading }) {
      state.loading = loading;
    }
  },
  actions: {},
  getters: {}
});
