<template>
  <div class="main-content__item">
    <div class="error-text" v-if="errorForm.length">
      <b>Error(s):</b>
      <ul class="error-text__list">
        <li v-for="(error, i) in errorForm" :key="i">{{ error }}</li>
      </ul>
    </div>
    <form
      class="form"
      @submit.prevent="$emit('on-submit', existingUser || userData, !!existingUser)"
    >
      <label>
        Name
        <input
          class="form__field"
          type="text"
          pattern="^[a-zA-Z]+$"
          placeholder="Tony"
          v-if="existingUser"
          v-model="existingUser.name"
        />
        <input
          class="form__field"
          type="text"
          pattern="^[a-zA-Z]+$"
          placeholder="Tony"
          v-else
          v-model="userData.name"
        />
      </label>
      <br />
      <label>
        Surname
        <input
          class="form__field"
          type="text"
          pattern="^[a-zA-Z]+$"
          placeholder="Hawk"
          v-if="existingUser"
          v-model="existingUser.surname"
        />
        <input
          class="form__field"
          type="text"
          pattern="^[a-zA-Z]+$"
          placeholder="Hawk"
          v-else
          v-model="userData.surname"
        />
      </label>
      <br />
      <label>
        Phone
        <input
          class="form__field"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
          placeholder="111-111-11-11"
          v-if="existingUser"
          v-model="existingUser.phone"
        />
        <input
          class="form__field"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
          placeholder="111-111-11-11"
          v-else
          v-model="userData.phone"
        />
      </label>
      <br />
      <label>
        Email
        <input
          class="form__field"
          type="email"
          placeholder="1@1.1"
          v-if="existingUser"
          v-model="existingUser.email"
        />
        <input class="form__field" type="email" placeholder="1@1.1" v-else v-model="userData.email" />
      </label>
      <br />
      <button class="button button-save" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    errorForm: {
      type: Array,
      required: true,
    },
    existingUser: null || Object,
    userData: Object,
  },
};
</script>

<style scoped>
.error-text__list {
  margin: 0;
}
.form {
  width: 280px;
  margin: 0 auto;
  text-align: end;
}
.form__field {
  margin: 5px 0;
}
.button-save {
  width: 100%;
  margin-top: 10px;
}
</style>
