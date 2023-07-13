<script setup lang="ts"></script>

<template>
  <main>
    <div class="Create-Ticket">
      <h1>CREATE A TICKET HERE</h1>
      <Button>Ticker erstellen</Button>
      <Button style="background-color: red; border-color: red; color: white"
        >Ticker erstellen</Button
      >
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .Create-Ticket {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .Delete-Ticket {
    min-height: 300vh;
    align-items: end;
    display: flex;
  }
}
</style>
