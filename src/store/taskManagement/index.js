const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

import { db } from "@/firebase.js";
import moment from "moment";
export const taskManagement = {
  state: {
    freeHours: {},
    workHours: {},
    lectureHours: {},
    events: [],
    tasks: [],
    tasksByDueDate: [],
    classModal: false,
    workfreeModal: false
  },
  getters: {
    getClassDialog: state => state.classModal,
    getWFModal: state => state.workfreeModal,
    getTasks: state => state.tasks,
    getTasksAsList: (state, getters) => {
      console.log(getters);
      console.log(getters.getTasks);
      const tasks = getters.getTasks;
      console.log(tasks);
      console.log("GetTasksAsList");
      let list = [{ header: "Today" }];
      tasks.forEach( task => {
        console.log("loop tasks: ", task);
        console.log(moment.unix(task.dueDate).format('YYYY-M-D'), moment().format('YYYY-M-D'));
        if (moment.unix(task.dueDate).format('YYYY-M-D') === moment().format('YYYY-M-D') ) {
          list = list.concat([{ title: task.name, subtitle: "Due Today"}, { divider: true, inset: true }])
        }
      });
      console.log(list);
      return list;
    },
  },
  computed: {
    sortedArray: function() {
      function compare(a, b) {
        if (a.dueDate < b.dueDate) return -1;
        if (a.dueDate > b.dueDate) return 1;
        return 0;
      }
      return this.arrays.sort(compare);
    }
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
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setTasksByDueDate(state, { tasksByDueDate }) {
      state.tasksByDueDate = tasksByDueDate;
    },
    setClassModal(state, { modal }) {
      state.classModal = modal;
    },
    setWorkFreeModal(state, { modal }) {
      state.workfreeModal = modal;
    }
  },
  actions: {
    setClassModal({ commit }, { modal }) {
      commit("setClassModal", {
        modal
      });
    },

    setWorkFreeModal({ commit }, { modal }) {
      commit("setWorkFreeModal", {
        modal
      });
    },
    getFreeHours({ commit }, { uid }) {
      db()
        .ref(`${uid}/meta`)
        .once("value", ({ val, key }) => ({
          meta: val(),
          id: key
        }))
        .then(({ meta }) => {
          // const f = days.map(d => meta.week[d].freeHours); // Filter out and left with free hours within week
          return days.reduce((accu, currentValue) => {
            accu[currentValue] = meta.week[currentValue].freeHours;
            return accu;
          }, {});
        })
        .then(ret =>
          commit("setFreeHours", {
            freeHours: ret
          })
        );

      // TODO: merge prev state with new state and separate into days
    },
    getWorkHours({ commit }, { uid }) {
      db()
        .ref(`${uid}/meta`)
        .once("value", ({ val, key }) => ({
          meta: val(),
          id: key
        }))
        .then(({ meta }) => {
          return days.reduce((accu, currentValue) => {
            accu[currentValue] = meta.week[currentValue].workHours;
            return accu;
          }, {});
        })
        .then(val =>
          commit("setWorkHours", {
            workHours: val
          })
        );
    },
    getLectureHours({ commit }, { uid }) {
      db()
        .ref(`${uid}/classes`)
        .once("value", ({ val, key }) => ({
          meta: val(),
          id: key
        }))
        .then(({ meta }) => {
          return days.reduce((accu, current) => {
            accu[current] = meta.week[current].lectureHours;
            return accu;
          });
        })
        .then(val =>
          commit("setLectureHours", {
            lectureHours: val
          })
        );
    },
    getScheduledTasksforTheDay({ commit, state }, { uid, day }) {
      const { tasks } = state;
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
    getEvents({ dispatch }, { uid }) {
      // const freeHoursPromise = days.map(d =>
      //   dispatch("getFreeHours", {
      //     uid,
      //     day: d
      //   })
      // );

      // const workHoursPromise = days.map(d =>
      //   dispatch("getWorkHours", {
      //     uid,
      //     days: d
      //   })
      // );

      // const lectureHoursPromise = days.map(d =>
      //   dispatch("getWorkHours", {
      //     uid,
      //     day: d
      //   })
      // );

      Promise.all([
        dispatch("getFreeHours", {
          uid
        }),
        dispatch("getWorkHours", {
          uid
        }),
        dispatch("getLectureHours", {
          uid
        })
      ]).then(() => {});
    },
    getTaskByEarliestDueDate({ commit, state }, uid) {
      let taskList = [];
      db()
        .ref(`${uid}/tasks`).orderByChild('dueDate').limitToLast(100).once('value', snapshot => {
          console.log("snapshot: ", snapshot);
          snapshot.forEach(childSnapshot => {
            console.log("child: ", childSnapshot);
            console.log(childSnapshot.val());
            let task = {task: childSnapshot.val(), id: childSnapshot.key};
            taskList = taskList.concat([task.task]);
          });
          console.log("taskList",taskList);
          commit("setTasks", taskList);
      }).then(() => {
        console.log("GetTasks Complete")
      }).catch( e => {
        console.log("Get Tasks error: ", e.message);
      });
        // .once("value", snapshot => {
        //   const ls = snapshot
        //     .filter(each => {
        //       each.done === false;
        //       return this.sortedArray(ls);
        //     })
        //     .then(items =>
        //       commit("setTasksByDueDate", {
        //         tasksByDueDate: [...state.tasksByDueDate, ...items]
        //       })
        //     );
        // });
    },
    setTask({ commit, dispatch }, {uid, payload}) {
      console.log("setTask", uid);
      console.log("task", payload);
      db().ref(`${uid}/tasks`).push(payload).then( () => {
        console.log("stored");
      }).catch( (e) => {console.log(e.message);});
    }
  }
};
