<template>
  <div>
    <h2>Home page</h2>
    <router-link to="/user" tag="button">Add user</router-link>
    <Table v-bind:users="users" v-on:delete-user="deleteUser" />
  </div>
</template>

<script>
import Table from "../components/Table";
export default {
  name: "App",
  mounted() {
    if (localStorage.getItem("users")) {
      try {
        this.users = JSON.parse(localStorage.getItem("users"));
      } catch (e) {
        localStorage.removeItem("users");
      }
    }
  },
  data() {
    return {
      users: [
        { name: "Tom", surname: "Smith", phone: "123456", email: "1@1.1" },
        { name: "Sam", surname: "Black", phone: "234567", email: "2@2.2" },
      ],
    };
  },
  components: {
    Table,
  },
  methods: {
    deleteUser(email) {
      this.users = this.users.filter((user) => user.email !== email);
      this.saveUsers();
    },
    addUser(user) {
      this.users.push(user);
      this.saveUsers();
    },
    editUser(user) {
      console.log("edit ", user);
    },
    saveUsers() {
      const parsed = JSON.stringify(this.users);
      localStorage.setItem("users", parsed);
    },
  },
};
</script>
