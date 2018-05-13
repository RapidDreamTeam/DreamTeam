import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// { workHours: 10-12, freeHours: 2-4, lectureHours: 12-2}

// uid/lectureHours
// uid/workHours
// uid/freeHours

// Pan Was here!!

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

new Vuex.Store({
  state: {
    freeHours: {},
    workHours: {},
    lectureHours: {},
    loading: false
  },
  mutations: {
    setFreeHours: (state, payload) => {
      state.freeHours = payload;
    },
    setWorkHours: (state, payload) => {
      state.workHours = payload;
    },
    setLectureHours: (state, payload) => {
      state.lectureHours = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    }
  },
  actions: {
    computeFreeHours: ({ commit }, { uid, day }) => {
      // const { db } = Vue;
      // db
      //   .ref(`${uid}/meta`)
      //   .once("value", ({ val, key }) => ({
      //     meta: val(),
      //     id: key
      //   }))
      //   .then(payload => commit("setFreeHours", payload));
    },
    getWorkHours: ({ commit }, { uid, day }) => {
      // const { db } = Vue;
      // db
      //   .ref(`${uid}/meta`)
      //   .once("value", ({ val, key }) => ({
      //     meta: val(),
      //     id: key
      //   }))
      //   .then(meta => commit("setWorkHours", meta.week.day.workHours));
    },
    getLectureHours: ({ commit }, { uid, day }) => {
      // commit("setLectureHours", null);
    }
  }
});
