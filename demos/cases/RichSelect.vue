<script setup>
import { Field, RichSelect } from "../../src/index";
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
    <h3>RichSelect with a simple list</h3>
    <Field>
      <RichSelect :options="users" :value="104" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>RichSelect with a side label</h3>
    <Field label="Owner" position="left">
      <RichSelect :options="users" :value="104" />
    </Field>
    <Field label="Disabled" position="left">
      <RichSelect :options="users" :disabled="true" :value="104" />
    </Field>
    <Field label="Error" position="left" :error="true">
      <RichSelect
        :options="users"
        :error="true"
        :value="104"
        title="Invalid option"
      />
    </Field>
  </div>

  <div class="demo-box">
    <h3>RichSelect overflow</h3>
    <Field width="150px">
      <RichSelect :options="users" :value="105" />
      <br />
      <RichSelect :options="users" :value="105">
        <template #default="{ option }">
          {{ option.label }}
        </template>
      </RichSelect>
    </Field>
  </div>

  <div class="demo-box">
    <h3>RichSelect with a template</h3>
    <Field>
      <RichSelect :options="users" :value="104">
        <template #default="{ option }">
          <UserOption :data="option" />
        </template>
      </RichSelect>
    </Field>
  </div>

  <div class="demo-box">
    <h3>RichSelect with a custom "textField"</h3>
    <Field>
      <RichSelect :options="users" :value="104" text-field="email" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>RichSelect without a value</h3>
    <Field>
      <RichSelect :options="users" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>RichSelect without options</h3>
    <Field>
      <RichSelect />
    </Field>
  </div>

  <div class="demo-box">
    <h3>RichSelect with clear button</h3>
    <Field>
      <RichSelect :options="users" :value="104" :clear="true" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>RichSelect with hidden options</h3>
    <Field>
      <RichSelect :text-options="users" :options="renderedUsers" :value="87" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Perfomance on a large list</h3>
    <Field>
      <RichSelect
        :options="usersLarge"
        :value="1000"
        :dropdown="{ virtualized: true }"
      />
    </Field>
  </div>
</template>