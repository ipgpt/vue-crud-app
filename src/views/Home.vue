<template>
  <div>
    <h2>Home page</h2>
    <button class="button" @click="moveToUserPage">Add user</button>
    <hr />
    <Table v-bind:users="users" v-on:delete-user="deleteUser" />
  </div>
</template>

<script>
import Table from "../components/Table";
import router from "../router";
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
      users: [],
    };
  },
  components: {
    Table,
  },
  methods: {
    moveToUserPage() {
      localStorage.removeItem("editUser");
      router.push("/vue-crud-app/user");
    },
    deleteUser(id) {
      this.users = this.users.filter((user) => user.id !== id);
      this.saveUsers();
    },
    addUser(user) {
      this.users.push(user);
      this.saveUsers();
    },
    editUser(updatedUser) {
      this.users = this.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      this.saveUsers();
    },
    checkDuplicateUser(newUser) {
      return this.users.find(user => user.name === newUser.name &&
      user.surname === newUser.surname && user.phone === newUser.phone &&
      user.email === newUser.email);
    },
    saveUsers() {
      const parsedData = JSON.stringify(this.users);
      localStorage.setItem("users", parsedData);
    },
  },
};
</script>
