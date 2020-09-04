<template>
  <tr>
    <td v-for="(data, i) of user" v-bind:key="i">{{data}}</td>
    <td>
      <button v-on:click="$emit('delete-user', user.email)">Delete</button>
    </td>
    <td>
      <button>Edit</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    deleteTodo: Function
  },
  filters: {
    upperCase(value) {
      return value.toUpperCase();
    },
  },
};
</script>

<style scoped>
</style>
