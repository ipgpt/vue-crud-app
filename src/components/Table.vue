<template>
  <div>
    <table class="table" v-if="users.length">
      <thead class="table__head">
        <tr class="table__head-item">
          <th class="table__head-cell" v-for="(column, i) of columns" :key="i">{{column}}</th>
        </tr>
      </thead>
      <tbody class="table__body">
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

<style>
.table {
  width: 100%;
  margin: 0 auto;
  border: 3px dashed mediumspringgreen;
}
.table__head-cell,
.table__body-cell {
  padding: 10px;
}
.table__head-cell {
  text-transform: uppercase;
  border-bottom: 3px dashed mediumspringgreen;
  background: green;
}
.table__head-cell:not(:last-of-type),
.table__body-cell:not(:last-of-type) {
  border-right: 3px dashed mediumspringgreen;
}
.table__body-item:not(:last-of-type) .table__body-cell {
  border-bottom: 3px dashed mediumspringgreen;
}
.table__body-item:hover {
  background: turquoise;
}
</style>
