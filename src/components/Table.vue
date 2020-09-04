<template>
  <div>
    <table>
      <thead>
        <th v-for="(column, i) of columns" v-bind:key="i">{{column}}</th>
      </thead>
      <tbody>
        <TableItem
          v-for="user of users"
          v-bind:key="user.id"
          v-bind:user="user"
          v-on:remove-todo="deleteUser"
        />
      </tbody>
    </table>
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
    deleteTodo(id) {
      this.$emit("delete-user", id);
    },
  },
};
</script>

<style scoped>
table {
  margin: 0 auto;
}
</style>
