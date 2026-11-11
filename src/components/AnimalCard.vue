<script setup>
defineProps({
  animalData: Object,
});

const emit = defineEmits(["toggle"]);
</script>

<template>
  <div class="card" :class="{ adopted: animalData.adopted }">
    <div class="details">
      <h2>{{ animalData.name }}</h2>
      <p>{{ animalData.species }}, {{ animalData.age }} years old</p>
      <p class="status">{{ animalData.adopted ? "Adopted" : "Available" }}</p>
      <div class="actions">
        <button @click="emit('toggle')">Toggle</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.details {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
}

.card h2 {
  font-size: 1.25rem;
}

.card p {
  margin: 0;
  color: var(--muted);
}

.card .status {
  align-self: flex-start;
  padding: 0.1rem 0.6rem;
  border-radius: 999px;
  background: #e3f1ec;
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 600;
}

.card.adopted .details {
  opacity: 0.6;
}

.card.adopted .status {
  background: #eceae6;
  color: var(--muted);
}

.actions {
  display: flex;
  gap: 0.4rem;
  margin-top: auto;
}

.card button {
  flex: 1;
  padding: 0.4rem 0.5rem;
  background: transparent;
  color: var(--primary);
}

.card button:hover {
  background: #e3f1ec;
}
</style>
