<template>
  <div>
    <h2>User page</h2>
    <router-link to="/" tag="button">Back to Homepage</router-link>
    <hr>
    <button v-on:click="addUser('react')">1</button>
    <button v-on:click="editUser('angular')">2</button>
    <form>
      <label>
        Name
        <input type="text" />
      </label><br />
      <label>
        Surname
        <input type="text" />
      </label><br />
      <label>
        Phone
        <input type="text" />
      </label><br />
      <label>
        Email
        <input type="text" />
      </label><br />
      <input type="submit" value="Save"/>
    </form>
  </div>
</template>

<script>
import Home from "./Home";

export default {
  methods: {
    addUser: Home.methods.addUser,
    editUser: Home.methods.editUser,
  }
}
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
