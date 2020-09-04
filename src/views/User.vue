<template>
  <div>
    <h2>User page</h2>
    <button @click="moveToHomePage">Back to Homepage</button>
    <hr />
    <p v-if="errorMessage">{{errorMessage}}</p>
    <form @submit.prevent="onSubmit">
      <label>
        Name
        <input type="text" v-if="user" v-model="user.name" />
        <input type="text" v-else v-model="name" />
      </label>
      <br />
      <label>
        Surname
        <input type="text" v-if="user" v-model="user.surname" />
        <input type="text" v-else v-model="surname" />
      </label>
      <br />
      <label>
        Phone
        <input type="text" v-if="user" v-model="user.phone" />
        <input type="text" v-else v-model="phone" />
      </label>
      <br />
      <label>
        Email
        <input type="text" v-if="user" v-model="user.email" />
        <input type="text" v-else v-model="email" />
      </label>
      <br />
      <input type="submit" value="Save" />
    </form>
  </div>
</template>

<script>
import Home from "./Home";
import router from "../router";
export default {
  data() {
    return {
      users: [],
      user: null,
      name: "",
      surname: "",
      phone: "",
      email: "",
      errorMessage: "",
    };
  },
  mounted() {
    if (localStorage.getItem("users")) {
      try {
        this.users = JSON.parse(localStorage.getItem("users"));
      } catch (e) {
        localStorage.removeItem("users");
      }
    }
    if (localStorage.getItem("editUser")) {
      try {
        this.user = JSON.parse(localStorage.getItem("editUser"));
      } catch (e) {
        localStorage.removeItem("editUser");
      }
    }
  },
  methods: {
    addUser: Home.methods.addUser,
    editUser: Home.methods.editUser,
    saveUsers: Home.methods.saveUsers,
    moveToHomePage() {
      localStorage.removeItem("editUser");
      router.push("/");
    },
    onSubmit() {
      if (
        this.name.trim() &&
        this.surname.trim() &&
        this.phone.trim() &&
        this.email.trim()
      ) {
        this.errorMessage = "";
        const newUser = {
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          email: this.email,
        };
        this.addUser(newUser);
        this.name = "";
        this.surname = "";
        this.phone = "";
        this.email = "";
      } else {
        this.errorMessage = "Not all fields are filled";
      }
      if (
        this.user.name.trim() &&
        this.user.surname.trim() &&
        this.user.phone.trim() &&
        this.user.email.trim()
      ) {
        this.errorMessage = "";
        const editedUser = {
          name: this.user.name,
          surname: this.user.surname,
          phone: this.user.phone,
          email: this.user.email,
        };
        this.editUser(editedUser);
        localStorage.removeItem("user");
        this.user.name = "";
        this.user.surname = "";
        this.user.phone = "";
        this.user.email = "";
      } else {
        this.errorMessage = "Not all fields are filled";
      }
    },
  },
};
</script>

<style scoped>
form {
  width: 300px;
  margin: 0 auto;
  text-align: end;
}
input {
  margin: 5px;
}
</style>
