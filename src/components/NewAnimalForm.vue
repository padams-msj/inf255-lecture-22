<script setup>
import { ref } from "vue";

const newAnimal = ref({
  name: "",
  species: "Dog",
  age: 0,
  adopted: false,
});
const saving = ref(false);
const error = ref("");
const message = ref("");

const emit = defineEmits(["add"]);

async function submit() {
  saving.value = true;
  error.value = "";
  message.value = "";
  try {
    const response = await fetch("/api/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnimal.value),
    });
    const data = await response.json();
    if (!response.ok) {
      error.value = data.error;
    } else {
      emit("add");
      message.value = data.message;
      newAnimal.value = { name: "", species: "Dog", age: 0, adopted: false };
    }
  } catch (err) {
    error.value = "Couldn't reach the server. Please try again.";
    console.log(err);
  }
  saving.value = false;
}
</script>

<template>
  <form @submit.prevent="submit">
    <label>Name <input v-model="newAnimal.name" required /></label>

    <label>Species
      <select v-model="newAnimal.species">
        <option>Dog</option>
        <option>Cat</option>
        <option>Rabbit</option>
        <option>Guinea pig</option>
      </select>
    </label>

    <label>Age <input type="number" v-model.number="newAnimal.age" min="0" /></label>

    <label><input type="checkbox" v-model="newAnimal.adopted" /> Adopted</label>

    <button :disabled="saving">{{ saving ? "Adding..." : "Add" }}</button>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="message" class="message">{{ message }}</p>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
  font-weight: 600;
}

label:has(input[type="checkbox"]) {
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  padding-bottom: 0.5rem;
}

label input,
label select {
  font-weight: normal;
}

form p {
  flex-basis: 100%;
  margin: 0;
}

.message {
  color: var(--primary);
  font-weight: 600;
}

input[type="number"] {
  width: 5rem;
}
</style>
