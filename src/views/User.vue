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
      <UserForm
        v-bind:errorForm="errorForm"
        v-bind:existingUser="user"
        v-bind:userData="userData"
        @on-submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import UserForm from "../components/UserForm";
import Home from "./Home";
import router from "../router";
export default {
  data() {
    return {
      users: [],
      user: null,
      userData: {
        name: "",
        surname: "",
        phone: "",
        email: "",
      },
      jsonData: null,
      errorJSON: "",
      errorForm: [],
    };
  },
  components: { UserForm },
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
    IsJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
    parseJSON() {
      const dataFromJSON = this.IsJsonString(this.jsonData)
        ? JSON.parse(this.jsonData)
        : this.jsonData;
      const type = typeof dataFromJSON;
      if (
        type !== "string" &&
        Array.isArray(dataFromJSON) &&
        String(dataFromJSON[0]) === "[object Object]"
      ) {
        this.userData.name = dataFromJSON[0].name || this.userData.name;
        this.userData.surname =
          dataFromJSON[0].surname || this.userData.surname;
        this.userData.phone = dataFromJSON[0].phone || this.userData.phone;
        this.userData.email = dataFromJSON[0].email || this.userData.email;
        this.jsonData = null;
        this.errorJSON = "";
      } else if (String(dataFromJSON).length) {
        this.errorJSON = "Error: Wrong structure of JSON!";
      } else {
        this.errorJSON = "Error: JSON is empty!";
      }
    },
    checkForm(user) {
      if (
        user.name.trim() &&
        user.surname.trim() &&
        user.phone.trim() &&
        user.email.trim()
      ) {
        return true;
      }
      this.errorForm = [];
      if (!user.name) {
        this.errorForm.push("Name required.");
      }
      if (!user.surname) {
        this.errorForm.push("Surname required.");
      }
      if (!user.phone) {
        this.errorForm.push("Phone required.");
      }
      if (!user.email) {
        this.errorForm.push("Email required.");
      }
    },
    onSubmit(savedUser, editStatus) {
      if (this.checkForm(savedUser)) {
        this.errorForm = "";
        savedUser.id = editStatus ? this.user.id : nanoid();
        if (editStatus) {
          this.editUser(savedUser);
          localStorage.removeItem("user");
        } else {
          this.addUser(savedUser);
        }
        this.userData = {
          name: "",
          surname: "",
          phone: "",
          email: "",
        };
        this.moveToHomePage();
      }
    },
  },
};
</script>

<style>
.error-text {
  width: 280px;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 5px 0;
  background: blue;
  border: 1px solid white;
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
.json-textarea::placeholder,
.form__field::placeholder {
  color: mediumspringgreen;
}
.button-import-json {
  width: 280px;
  margin: 15px 0;
}
@media screen and (min-width: 600px) {
  .main-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
