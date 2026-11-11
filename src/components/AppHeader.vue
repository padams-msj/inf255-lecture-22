<script setup>
defineProps({
  shelterName: String,
  total: Number,
  adopted: Number,
});
</script>

<template>
  <header>
    <h1>{{ shelterName }}</h1>
    <p>{{ adopted }} of {{ total }} adopted</p>
  </header>
</template>

<style scoped>
header {
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 2rem;
}

p {
  margin: 0.25rem 0 0;
  color: var(--muted);
}
</style>
