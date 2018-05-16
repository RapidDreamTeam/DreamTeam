import { db } from "@/firebase.js";

export const taskManagement = {
  state: {
    freeHours: {},
    workHours: {},
    lectureHours: {},
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
    },
    setTask({ commit, dispatch }, {uid, payload}) {
      console.log("setTask", uid);
      console.log("task", payload);
      db().ref(`${uid}/tasks`).push(payload).then( () => {
        console.log("stored");
      }).catch( (e) => {console.log(e.message);});
    }
  },
};
