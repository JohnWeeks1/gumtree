<template>
  <div class="contentBox">
    <slot></slot>
  </div>
</template>

<style scoped>
.contentBox {
  background-color: white;
  border: 2px solid rgb(233, 233, 233);
  border-radius: 2px;
  max-width: 400px;
  padding: 15px;
}
</style>