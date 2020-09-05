<template>
  <div>
    <h2>User page</h2>
    <button class="button" @click="moveToHomePage">Back to Homepage</button>
    <hr />
    <div class="main-content">
      <div class="main-content__item">
        <p class="error-text" v-if="errorJSON">{{errorJSON}}</p>
        <label>
          Uploading data in JSON format
          <br />
          <br />
          <textarea
            class="json-textarea"
            rows="8"
            v-model="jsonData"
            placeholder='[
  {
    "name": "Tony",
    "surname": "Hawk",
    "phone": "111-111-11-11",
    "email": "1@1.1"
  }
]'
          ></textarea>
        </label>
        <button class="button button-import-json" @click="parseJSON">Import JSON</button>
        </div>
        <div class="main-content__item">
          <div class="error-text" v-if="errorForm.length">
            <b>Error(s):</b>
            <ul class="error-text__list">
              <li v-for="(error, i) in errorForm" :key="i">{{ error }}</li>
            </ul>
          </div>
          <form class="form" @submit.prevent="onSubmit">
            <label>
              Name
              <input
                class="form__field"
                type="text"
                pattern="^[a-zA-Z]+$"
                placeholder="Tony"
                v-if="user"
                v-model="user.name"
              />
              <input
                class="form__field"
                type="text"
                pattern="^[a-zA-Z]+$"
                placeholder="Tony"
                v-else
                v-model="name"
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
                v-if="user"
                v-model="user.surname"
              />
              <input
                class="form__field"
                type="text"
                pattern="^[a-zA-Z]+$"
                placeholder="Hawk"
                v-else
                v-model="surname"
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
                v-if="user"
                v-model="user.phone"
              />
              <input
                class="form__field"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                placeholder="111-111-11-11"
                v-else
                v-model="phone"
              />
            </label>
            <br />
            <label>
              Email
              <input
                class="form__field"
                type="email"
                placeholder="1@1.1"
                v-if="user"
                v-model="user.email"
              />
              <input class="form__field" type="email" placeholder="1@1.1" v-else v-model="email" />
            </label>
            <br />
            <button class="button button-save" type="submit">Save</button>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import Home from "./Home";
import router from "../router";
export default {
  data() {
    return {
      users: [],
      user: null,
      jsonData: null,
      name: "",
      surname: "",
      phone: "",
      email: "",
      errorJSON: "",
      errorForm: [],
    };
  },
  mounted() {
    if (localStorage.getItem("users")) {
      try {
        this.users = JSON.parse(localStorage.getItem("users"));
      } catch (e) {
        localStorage.removeItem("users");
      }
    }
    if (localStorage.getItem("editUser")) {
      try {
        this.user = JSON.parse(localStorage.getItem("editUser"));
      } catch (e) {
        localStorage.removeItem("editUser");
      }
    }
  },
  methods: {
    addUser: Home.methods.addUser,
    editUser: Home.methods.editUser,
    saveUsers: Home.methods.saveUsers,
    moveToHomePage() {
      localStorage.removeItem("editUser");
      router.push("/");
    },
    parseJSON() {
      const dataFromJSON = Array.isArray(this.jsonData)
        ? JSON.parse(this.jsonData)
        : this.jsonData;
      if (
        Array.isArray(this.jsonData) &&
        String(dataFromJSON[0]) === "[object Object]"
      ) {
        this.name = dataFromJSON[0].name || this.name;
        this.surname = dataFromJSON[0].surname || this.surname;
        this.phone = dataFromJSON[0].phone || this.phone;
        this.email = dataFromJSON[0].email || this.email;
        this.jsonData = null;
        this.errorJSON = "";
      } else if (dataFromJSON) {
        this.errorJSON = "Error: Wrong structure of JSON!";
      } else {
        this.errorJSON = "Error: JSON is empty!";
      }
    },
    checkFormAddUser() {
      if (
        this.name.trim() &&
        this.surname.trim() &&
        this.phone.trim() &&
        this.email.trim()
      ) {
        return true;
      }

      this.errorForm = [];

      if (!this.name) {
        this.errorForm.push("Name required.");
      }
      if (!this.surname) {
        this.errorForm.push("Surname required.");
      }
      if (!this.phone) {
        this.errorForm.push("Phone required.");
      }
      if (!this.email) {
        this.errorForm.push("Email required.");
      }
    },
    checkFormEditUser() {
      if (
        this.user.name.trim() &&
        this.user.surname.trim() &&
        this.user.phone.trim() &&
        this.user.email.trim()
      ) {
        return true;
      }

      this.errorForm = [];

      if (!this.user.name) {
        this.errorForm.push("Name required.");
      }
      if (!this.user.surname) {
        this.errorForm.push("Surname required.");
      }
      if (!this.user.phone) {
        this.errorForm.push("Phone required.");
      }
      if (!this.user.email) {
        this.errorForm.push("Email required.");
      }
    },
    onSubmit() {
      if (this.checkFormAddUser()) {
        this.errorForm = "";
        const newUser = {
          id: nanoid(),
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          email: this.email,
        };
        this.addUser(newUser);
        this.name = "";
        this.surname = "";
        this.phone = "";
        this.email = "";
        this.moveToHomePage();
      } else if (this.user && this.checkFormEditUser()) {
        this.errorForm = "";
        const editedUser = {
          id: this.user.id,
          name: this.user.name,
          surname: this.user.surname,
          phone: this.user.phone,
          email: this.user.email,
        };
        this.editUser(editedUser);
        localStorage.removeItem("user");
        this.user.name = "";
        this.user.surname = "";
        this.user.phone = "";
        this.user.email = "";
        this.moveToHomePage();
      }
    },
  },
};
</script>

<style scoped>
.error-text {
  width: 280px;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 5px 0;
  background: blue;
  border: 1px solid white;
}
.error-text__list {
  margin: 0;
}
.json-textarea {
  width: 250px;
  display: block;
  margin: 0 auto;
  resize: none;
}
.json-textarea,
.form__field {
  padding: 5px 10px;
  border: 3px dashed white;
  background-color: inherit;
  color: inherit;
}
.form {
  width: 280px;
  margin: 0 auto;
  text-align: end;
}
.form__field {
  margin: 5px 0;
}
.json-textarea::placeholder,
.form__field::placeholder {
  color: mediumspringgreen;
}
.button-import-json {
  width: 280px;
  margin: 15px 0;
}
.button-save {
  width: 100%;
  margin-top: 10px;
}
@media screen and (min-width: 600px) {
  .main-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
