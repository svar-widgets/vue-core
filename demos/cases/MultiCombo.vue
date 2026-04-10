<script setup>
import { Field, MultiCombo } from "../../src/index";
import { users, usersLarge } from "../data/userlist";
import UserOption from "../custom/UserOption.vue";

const renderedUsers = [
  {
    id: 103,
    label: "Ned Stark",
    email: "winterhell@gmail.com",
    avatar: "https://cdn.svar.dev/demos/assets/avatar/491902305.jpg",
  },
  {
    id: 104,
    label: "Lord Varys",
    email: "little.birds@gmail.com",
    avatar: "https://cdn.svar.dev/demos/assets/avatar/005471511.jpg",
  },
];
</script>

<template>
  <div class="demo-box">
    <h3>MultiCombo with a simple list</h3>
    <Field width="500px">
      <MultiCombo :options="users" :value="[104]" />
    </Field>
  </div>
  <div class="demo-box">
    <h3>MultiCombo with checkboxes</h3>
    <Field width="500px">
      <MultiCombo :checkboxes="true" :options="users" :value="[104]" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>MultiCombo with a side label</h3>
    <Field label="Owner" position="left" width="500px">
      <MultiCombo :options="users" :value="[104]" />
    </Field>
    <Field label="Disabled" position="left" width="500px">
      <MultiCombo :options="users" :disabled="true" :value="[104]" />
    </Field>
    <Field label="Error" :error="true" position="left" width="500px">
      <MultiCombo
        title="Invalid option"
        :options="users"
        :error="true"
        :value="[104]"
      />
    </Field>
  </div>

  <div class="demo-box">
    <h3>MultiCombo with a template</h3>
    <Field width="500px">
      <MultiCombo :options="users" :value="[104]">
        <template #default="{ option }">
          <UserOption :data="option" />
        </template>
      </MultiCombo>
    </Field>
  </div>

  <div class="demo-box">
    <h3>MultiCombo with a custom "textField"</h3>
    <Field width="500px">
      <MultiCombo :options="users" :value="[104]" text-field="email" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>MultiCombo without a value</h3>
    <Field width="500px">
      <MultiCombo :options="users" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>MultiCombo without options</h3>
    <Field width="500px">
      <MultiCombo />
    </Field>
  </div>

  <div class="demo-box">
    <h3>MultiCombo with hidden options</h3>
    <Field width="500px">
      <MultiCombo :text-options="users" :options="renderedUsers" :value="[87]" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Perfomance on a large list</h3>
    <MultiCombo
      :options="usersLarge"
      :value="[9000]"
      :dropdown="{ virtualized: true }"
    >
      <template #default="{ option }">
        <UserOption :data="option" />
      </template>
    </MultiCombo>
  </div>
</template>
