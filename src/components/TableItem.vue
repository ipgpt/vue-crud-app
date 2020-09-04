<template>
  <tr>
    <td v-for="(data, i) of user" v-bind:key="i">{{data}}</td>
    <td>
      <button v-on:click="$emit('delete-user', user.email)">Delete</button>
    </td>
    <td>
      <button v-on:click="startEdit">Edit</button>
    </td>
  </tr>
</template>

<script>
import router from "../router";
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    startEdit() {
      const parsed = JSON.stringify(this.user);
      localStorage.setItem("editUser", parsed);
      router.push("user");
    },
  },
};
</script>

<style scoped>
</style>
