<template>
  <tr class="table__body-item">
    <td class="table__body-cell" v-for="(column, i) of columns" :key="i">{{user[column]}}</td>
    <td class="table__body-cell">
      <button v-on:click="$emit('delete-user', user.id)">Delete</button>
    </td>
    <td class="table__body-cell">
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
    columns: {
      type: Array,
      required: true,
    },
  },
  methods: {
    startEdit() {
      const parsedData = JSON.stringify(this.user);
      localStorage.setItem("editUser", parsedData);
      router.push("user");
    },
  },
};
</script>
