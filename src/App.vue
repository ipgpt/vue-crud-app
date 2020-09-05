<template>
  <div id="app">
    <h1>Vue CRUD App</h1>
    <router-view />
  </div>
</template>

<style>
html {
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.6)
  );
  background-color: aqua;
}
#app {
  max-width: 800px;
  margin: 0 auto;
  font-family: monospace;
  font-size: 16px;
  text-align: center;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.button {
  border: 2px solid black;
  background-color: white;
  padding: 5px 10px;
  font-size: inherit;
  font-weight: bold;
  font-family: inherit;
  text-transform: uppercase;
  cursor: pointer;
}
.button:hover {
  background-color: mediumspringgreen;
}
</style>
