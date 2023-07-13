<script setup lang="ts">
import { Table } from "ant-design-vue";
import { InputSearch } from "ant-design-vue";
import { Input } from "ant-design-vue";
import type { TableColumnType, TableProps } from "ant-design-vue";
import { defineComponent } from "vue";

type TableDataType = {
  key: string;
  id: string;
  status: string;
  priority: string;
  place: string;
  reviser: string;
  initiator: string;
  ticketDate: string;
  dueDate: String;
};

const columns: TableColumnType<TableDataType>[] = [
  {
    title: "Ticket",
    dataIndex: "id",
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      {
        text: "Solved",
        value: "Solved",
      },
      {
        text: "Unsolved",
        value: "Unsolved",
      },
    ],
  },
  {
    title: "Priorität",
    dataIndex: "priority",
    filters: [
      {
        text: "hoch",
        value: "hoch",
      },
      {
        text: "normal",
        value: "normal",
      },
      {
        text: "niedrig",
        value: "niedrig",
      },
    ],
  },
  {
    title: "Standort",
    dataIndex: "place",
  },
  {
    title: "zugewiesen an",
    dataIndex: "reviser",
  },
  {
    title: "Initiator",
    dataIndex: "initiator",
  },
  {
    title: "Anfangsdatum",
    dataIndex: "ticketDate",
  },
  {
    title: "Fälligkeitsdatum",
    dataIndex: "dueDate",
  },
];
const data: TableDataType[] = [
  {
    key: "1",
    id: "RE-589",
    status: "in Bearbeitung",
    priority: "normal",
    place: "Turmstraße 22",
    reviser: "Sinan Ertogrul",
    initiator: "Thomas Müller",
    ticketDate: "10.10.2023",
    dueDate: "in 2 Tagen (12.10.2023)"
  },
  {
    key: "1",
    id: "RE-589",
    status: "in Bearbeitung",
    priority: "normal",
    place: "Turmstraße 22",
    reviser: "Aydin Efe Acik",
    initiator: "Sebastian Becker",
    ticketDate: "10.10.2023",
    dueDate: "in 16 Tagen (26.10.2023)"
  },
  {
    key: "1",
    id: "RE-589",
    status: "in Bearbeitung",
    priority: "normal",
    place: "Turmstraße 22",
    reviser: "Cem Yildirim",
    initiator: "Mario Brühl",
    ticketDate: "10.10.2023",
    dueDate: "in 2 Monaten (10.12.2023)"
  },
  {
    key: "1",
    id: "RE-589",
    status: "in Bearbeitung",
    priority: "normal",
    place: "Turmstraße 22",
    reviser: "Sinan Ertogrul",
    initiator: "Phil Nebel",
    ticketDate: "10.10.2023",
    dueDate: "in 14 Tagen (24.10.2023)"
  },
];
</script>

<template>
  <main>
    <div class="container">
      <h1 class="page-title">Tickets</h1>
      <InputSearch
        class="custom-search"
        placeholder="Suche.."
        style="width: 200px"
      ></InputSearch>
      <Table :columns="columns" :dataSource="data" class="custom-table"></Table>
    </div>
  </main>
</template>

<style>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh; /* Ändere die Höhe entsprechend deiner Bedürfnisse */
}

.custom-table {
  width: 200%; /* Ändere die Breite entsprechend deiner Bedürfnisse */
}

.page-title {
  position: absolute;
  top: 70px;
  left: 5%;
  transform: translateX(-50%);
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
}
.custom-search {
  position: absolute;
  top: 190px;
  left: 6%;
  transform: translateX(-50%);
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
}
</style>
