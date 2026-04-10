<script setup>
defineOptions({ name: "DemoCombo" });
import { ref } from "vue";
import { Field, Combo, Button } from "../../src/index";
import { users, usersLarge } from "../data/userlist";

import UserOption from "../custom/UserOption.vue";

const value = ref("");
const values = [104, 103, 102, ""];
function changeValue() {
  value.value = values[(values.indexOf(value.value) + 1) % values.length];
}

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
    <h3>Combo with a simple list</h3>
    <Field>
      <Combo :options="users" :value="104" />
    </Field>
    <Field label="Disabled">
      <Combo :options="users" disabled :value="104" />
    </Field>
    <Field label="Error" error>
      <Combo :options="users" error :value="104" title="Invalid option" />
    </Field>
  </div>
  <div class="demo-box">
    <h3>Combo with a dynamic value</h3>

    <Button :onclick="changeValue">Change the value</Button>
    <Field>
      <Combo :options="users" :value="value" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Combo with a side label</h3>
    <Field label="Owner" position="left">
      <Combo :options="users" :value="104" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Combo with a template</h3>
    <Field>
      <Combo :options="users" :value="104">
        <template #default="{ option }">
          <UserOption :data="option" />
        </template>
      </Combo>
    </Field>
  </div>

  <div class="demo-box">
    <h3>Combo with a custom "textField"</h3>
    <Field>
      <Combo :options="users" :value="104" text-field="email" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Combo without a value</h3>
    <Field>
      <Combo :options="users" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Combo with a value that's not in options</h3>
    <Field>
      <Combo :options="users" :value="4" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Combo without options</h3>
    <Field>
      <Combo />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Combo with clear button</h3>
    <Field>
      <Combo :options="users" :value="104" :clear="true" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Combo with hidden options</h3>
    <Field>
      <Combo
        :text-options="users"
        :options="renderedUsers"
        :value="87"
        clear-button
      />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Perfomance on a large list</h3>
    <Field>
      <Combo
        :options="usersLarge"
        :value="9000"
        :dropdown="{ virtualized: true }"
      >
        <template #default="{ option }">
          <UserOption :data="option" />
        </template>
      </Combo>
    </Field>
    <h3>Combo with ids: '0', '000', '0E1'</h3>
    <Field>
      <Combo
        :options="['0', '000', '0E1'].map(id => ({
          id,
          label: `&quot;${id}&quot; option`,
        }))"
      />
    </Field>
  </div>
</template>