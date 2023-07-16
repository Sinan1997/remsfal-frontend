<template>
  <div>
    <header>
      <Menubar :model="items">
        <template #start>
          <div @click="$router.push('/')">
            <img alt="logo" src="@/assets/logo.png" height="30" class="logo" />
          </div>
        </template>
      </Menubar>
    </header>
  </div>
</template>

<style scoped>
.logo {
  margin-left: 20px;
  margin-right: 30px;
}
header{
  position: relative;
  z-index: 1;
}
</style>

<script lang="ts">
export default {
  props: {
    userEmail: String,
    projects: Array,
  },
  data() {
    return {
      selectedProject: "Projekt auswählen",
      selectedTicket: "Online-Ticketsystem",
      selectedTicketIntern: "Online-Ticketsystem(Intern)",
      items: [
        {
          label: () => this.selectedProject,
          icon: "pi pi-fw pi-home",
          items: [
            {
              label: "Neues Projekt",
              icon: "pi pi-fw pi-plus",
              to: { name: "NewProject" },
            },
          ],
        },
        {
          label: () => this.selectedTicket,
          icon: "pi pi-fw pi-ticket",
          items: [
            {
              label: "Ticketcenter",
              icon: "pi pi-fw pi-ticket",
              to: { name: "TicketSystem" },
            },
            {
              label: "Ticket erstellen",
              icon: "pi pi-fw pi-plus",
              to: { name: "CreateTicket" },
            },
          ],
        },
        {
          label: () => this.selectedTicketIntern,
          icon: "pi pi-fw pi-ticket",
          items: [
            {
              label: "Störung des Arbeitsapltzes",
              icon: "pi pi-fw pi-desktop",
              to: { name: "trouble" },
            },
            {
              label: "Serviceanfrage",
              icon: "pi pi-fw pi-users",
              to: { name: "service" },
            },
            {
              label: "Neue Hardware anfordern",
              icon: "pi pi-fw pi-plus",
              to: { name: "hardware" },
            },
            {
              label: "Defekte Hardware",
              icon: "pi pi-fw pi-sync",
              to: { name: "defectHardware" },
            },
          ],
        },
        {
          label: () => this.userEmail,
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "Kontoeinstellungen",
              icon: "pi pi-fw pi-user-edit",
              to: { name: "AccountSettings" },
            },
            {
              label: "Meine Kontakte",
              icon: "pi pi-fw pi-users",
              to: { name: "AccountContacts" },
            },
          ],
        },
        {
          label: "Abmelden",
          icon: "pi pi-fw pi-sign-out",
          url: "https://remsfal.de",
        },
      ],
    };
  },
  mounted() {
    this.updateProjectItems();
  },
  methods: {
    updateProjectItems() {
      console.log("update item ");
      this.items[0].items = [
        {
          label: "Neues Projekt",
          icon: "pi pi-fw pi-plus",
          to: { name: "NewProject" },
        },
        {
          separator: true,
        },
        {
          label: "Mein Super Projekt Berliner Str. 12, 13507 Berlin",
          icon: "pi pi-fw pi-external-link",
          to: { name: "Project", params: { projectId: "1" } },
        },
        {
          label: "Noch ein besseres Projekt Berliner Str. 15, 13507 Berlin",
          icon: "pi pi-fw pi-external-link",
          to: { name: "Project", params: { projectId: "2" } },
        },
      ];
    },
  },
};
</script>
