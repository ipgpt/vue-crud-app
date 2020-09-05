<template>
  <div>
    <table v-if="users.length">
      <thead>
        <th v-for="(column, i) of columns" :key="i">{{column}}</th>
      </thead>
      <tbody>
        <TableItem
          v-for="user of users"
          v-bind:key="user.id"
          v-bind:user="user"
          v-bind:columns="columns.slice(0,4)"
          v-on:delete-user="deleteUser"
        />
      </tbody>
    </table>
    <p v-else>There are no users to display...</p>
  </div>
</template>

<script>
import TableItem from "./TableItem";
export default {
  props: ["users"],
  data() {
    return {
      columns: ["name", "surname", "phone", "email", "delete", "edit"],
    };
  },
  components: {
    TableItem,
  },
  methods: {
    deleteUser(email) {
      this.$emit("delete-user", email);
    },
  },
};
</script>

<style scoped>
table {
  margin: 0 auto;
}
</style>
