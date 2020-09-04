<template>
  <div>
    <h2>User page</h2>
    <router-link to="/" tag="button">Back to Homepage</router-link>
    <hr />
    <button v-on:click="editUser('angular')">2</button>
    <form @submit.prevent="onSubmit">
      <label>
        Name
        <input type="text" v-model="name" />
      </label>
      <br />
      <label>
        Surname
        <input type="text" v-model="surname" />
      </label>
      <br />
      <label>
        Phone
        <input type="text" v-model="phone" />
      </label>
      <br />
      <label>
        Email
        <input type="text" v-model="email" />
      </label>
      <br />
      <input type="submit" value="Save" />
    </form>
  </div>
</template>

<script>
import Home from "./Home";

export default {
  data() {
    return {
      users: [],
      name: "",
      surname: "",
      phone: "",
      email: "",
    };
  },
  mounted() {
    if (localStorage.getItem("users")) {
      try {
        this.cats = JSON.parse(localStorage.getItem("users"));
      } catch (e) {
        localStorage.removeItem("users");
      }
    }
  },
  methods: {
    addUser: Home.methods.addUser,
    editUser: Home.methods.editUser,
    saveUsers: Home.methods.saveUsers,
    onSubmit() {
      if (
        this.name.trim() &&
        this.surname.trim() &&
        this.phone.trim() &&
        this.email.trim()
      ) {
        const newUser = {
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          email: this.email,
        };
        console.log(newUser);
        console.log(this.addUser);
        this.addUser(newUser);
        this.name = "";
        this.surname = "";
        this.phone = "";
        this.email = "";
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
