const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

const day_idx = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6
};

const day_offset = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0
};

import { db } from "@/firebase.js";
import moment from "moment";
export const taskManagement = {
  state: {
    freeHours: [],
    workHours: {},
    lectureHours: [],
    events: [],
    tasks: [],
    tasksByDueDate: [],
    classModal: false,
    freeModal: false,
    workModal: false
  },
  getters: {
    getWorkHours: state => state.workHours,
    getClassDialog: state => state.classModal,
    getFreeModal: state => state.freeModal,
    getWorkModal: state => state.workModal,
    getWork: state => state.workHours,
    getTasks: state => state.tasks,
    getTasksAsList: (state, getters) => {
      console.log(getters);
      console.log(getters.getTasks);
      const tasks = getters.getTasks;
      console.log(tasks);
      console.log("GetTasksAsList");
      let list = [
        {
          header: "Today"
        }
      ];
      tasks.forEach(task => {
        console.log("loop tasks: ", task);
        console.log(
          moment.unix(task.dueDate).format("YYYY-M-D"),
          moment().format("YYYY-M-D")
        );
        if (
          moment.unix(task.dueDate).format("YYYY-M-D") ===
          moment().format("YYYY-M-D")
        ) {
          list = list.concat([
            {
              title: task.name,
              subtitle: "Due Today"
            },
            {
              divider: true,
              inset: true
            }
          ]);
        }
      });
      console.log(list);
      return list;
    },
    getTasksAsCalendar: (state, getters) => {
      console.log("getTasksAsCalendar");
      const tasks = getters.getTasks;
      let list = [];

      const dow = moment().format("dddd").toLowerCase();
      const start = moment().subtract(day_offset[dow], "days");
      tasks.forEach( tasks => {
        console.log(tasks);
        tasks.subtask.forEach( subTask => {
          if (subTask.isScheduled) {
            const time = moment(subTask.startTime, "HH:mm");
            const startTaskTime = start.add(day_offset[subTask.day], "days").second(0).minute(time.minute()).hour(time.hour());
            const taskPayload = {
              title: subTask.name,
              start: startTaskTime.format(),
              end: startTaskTime.add(subTask.estimatedTime, "hours").format(),
            };
            list = list.concat([taskPayload]);
          }
        })
      });
      console.log("LIST", list);
      return list;
    }
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
    setFreeModal(state, { modal }) {
      console.log("mutate");
      state.freeModal = modal;
    },
    setWorkModal(state, { modal }) {
      state.workModal = modal;
    }
  },
  actions: {
    setWorkModal({ commit }, { modal }) {
      commit("setWorkModal", {
        modal
      });
    },
    setClassModal({ commit }, { modal }) {
      commit("setClassModal", {
        modal
      });
    },

    setFreeModal({ commit }, { modal }) {
      console.log("action");
      commit("setFreeModal", {
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
      console.log("UIDDD", uid);
      // db()
      //   .ref(`${uid}/meta`)
      //   .once("value", ({ val, key }) => ({
      //     meta: val(),
      //     id: key
      //   }))
      // .then(({ meta }) => {
      //   console.log("reducing");
      //   return days.reduce((accu, currentValue) => {
      //     accu[currentValue] = meta.week[currentValue].workHours;
      //     return accu;
      //   }, {});
      // })
      // .then(val => {
      //   console.log("getWorkHours", val);
      //   return val;
      // })
      // .then(val =>
      //   commit("setWorkHours", {
      //     workHours: val
      //   })
      // );

      db()
        .ref(`${uid}/meta`)
        .once("value", snapshot => ({
          meta: snapshot,
          id: snapshot.id
        }))
        .then(v => {
          const temp = {};
          Object.keys(v.val().week).map(d => {
            if (v.val().week[d].workHours) {
              Object.keys(v.val().week[d].workHours).map(k2 => {
                if (!temp[d]) {
                  temp[d] = [];
                }
                temp[d].push({
                  key: k2,
                  ...v.val().week[d].workHours[k2]
                });
              });
            }
          });

          return temp;
        })
        .then(a => {
          console.log(a);
          return a;
        })
        .then(a =>
          commit("setWorkHours", {
            workHours: a
          })
        );
      // .then(snapshot => {
      //   return {
      //     meta: days.reduce((accu, current) => {
      //       accu[current] = snapshot.meta["week"][current].workHours;
      //       return accu;
      //     }),
      //     id: snapshot.id
      //   };
      // })
      // .then(v => {
      //   commit("setWorkHours", {
      //     workHours: v
      //   });
      // });
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
        .ref(`${uid}/tasks`)
        .orderByChild("dueDate")
        .limitToLast(100)
        .once("value", snapshot => {
          console.log("snapshot: ", snapshot);
          snapshot.forEach(childSnapshot => {
            console.log("child: ", childSnapshot);
            console.log(childSnapshot.val());
            let task = {
              task: childSnapshot.val(),
              id: childSnapshot.key
            };
            taskList = taskList.concat([task.task]);
          });
          console.log("taskList", taskList);
          commit("setTasks", taskList);
        })
        .then(() => {
          console.log("GetTasks Complete");
        })
        .catch(e => {
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
    setTask({ commit, dispatch }, { uid, payload }) {
      console.log("setTask", uid);
      console.log("task", payload);
      db()
        .ref(`${uid}/tasks`)
        .push(payload)
        .then(() => {
          console.log("stored");
        })
        .catch(e => {
          console.log(e.message);
        });
    },
    setFreeTime({ commit }, { days, startTime, endTime, uid }) {
      // db().ref(`${uid}/meta/week`)

      const persistData = days.reduce((accu, current) => {
        accu[current] = {
          freeHours: {
            startTime,
            endTime
          }
        };
        return accu;
      }, {});

      console.log(uid);
      console.log(persistData);

      Object.keys(persistData).forEach(day => {
        db()
          .ref(`${uid}/meta/week/${day}/freeHours`)
          .push(persistData[day].freeHours);
      });

      // Check and append to db
    },
    setWorkTime({ commit }, { days, startTime, endTime, uid }) {
      // db().ref(`${uid}/meta/week`)

      const persistData = days.reduce((accu, current) => {
        accu[current] = {
          workHours: {
            startTime,
            endTime,
            occupied: false
          }
        };
        return accu;
      }, {});

      Object.keys(persistData).forEach(day => {
        db()
          .ref(`${uid}/meta/week/${day}/workHours`)
          .push(persistData[day].workHours);
      });
    },
    setClass({ commit, dispatch }, { uid, payload }) {
      console.log("setClass", uid);
      console.log("class", payload);
      db()
        .ref(`${uid}/class`)
        .push(payload)
        .then(() => {
          console.log("stored");
        })
        .catch(e => {
          console.log(e.message);
        });
    }
  }
};
