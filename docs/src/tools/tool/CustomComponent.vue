<template>
    <div>测试</div>
    <input type="text" :v-model="value" />
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  const value = ref("")
  </script>
  