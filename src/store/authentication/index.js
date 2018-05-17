import firebase, { auth } from "@/firebase.js";
import router from "@/router";

export const authentication = {
  state: {
    currentUser: null
  },
  mutations: {
    setCurrentUser(state, { currentUser }) {
      state.currentUser = currentUser;
    }
  },
  actions: {
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
    signout({ commit }) {
      auth()
        .signOut()
        .then(() =>
          commit("setCurrentUser", {
            currentUser: null
          })
        )
        .then(() => router.push("/signin"));
    },
    signoutWithoutRedirect({ commit }) {
      return auth()
        .signOut()
        .then(() =>
          commit("setCurrentUser", {
            currentUser: null
          })
        );
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
    }
  }
};
