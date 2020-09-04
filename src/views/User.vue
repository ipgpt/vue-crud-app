<template>
  <div>
    <h2>User page</h2>
    <button @click="moveToHomePage">Back to Homepage</button>
    <hr />
    <p v-if="errorMessage">{{errorMessage}}</p>
    <p v-else-if="errorEmptyJSON">{{errorEmptyJSON}}</p>
    <textarea
      rows="8"
      v-model="jsonData"
      placeholder='[
  {
    "name": "Tony",
    "surname": "Hawk",
    "phone": "888",
    "email": "8@8.8"
  }
]'
    ></textarea>
    <button @click="parseJSON">Import JSON</button>
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
import { nanoid } from "nanoid";
import Home from "./Home";
import router from "../router";
export default {
  data() {
    return {
      users: [],
      user: null,
      jsonData: null,
      name: "",
      surname: "",
      phone: "",
      email: "",
      errorEmptyJSON: "",
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
    parseJSON() {
      const dataFromJSON = this.jsonData ? JSON.parse(this.jsonData) : null;
      if (dataFromJSON) {
        this.name = dataFromJSON[0].name || this.name;
        this.surname = dataFromJSON[0].surname || this.surname;
        this.phone = dataFromJSON[0].phone || this.phone;
        this.email = dataFromJSON[0].email || this.email;
        this.jsonData = null;
        this.errorEmptyJSON = "";
      } else {
        this.errorEmptyJSON = "JSON is empty!";
      }
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
          id: nanoid(),
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
          id: this.user.id,
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
textarea {
  display: block;
  width: 280px;
  margin: 0 auto;
}
</style>
