<script setup lang="ts">
import {
  Button,
  Table,
  Card,
  Drawer,
  Form,
  Row,
  Col,
  FormItem,
  Space,
  Select,
  Textarea,
  UploadDragger,
  message,
  Input,
  InputSearch,
  AutoComplete,
} from "ant-design-vue";
import type { UploadChangeParam } from "ant-design-vue";
import {
  DownOutlined,
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  EditTwoTone,
  ToolTwoTone,
  FileTextTwoTone,
  UnlockTwoTone,
  MessageTwoTone,
  FileTwoTone,
  HomeTwoTone,
  SettingTwoTone,
  ArrowRightOutlined,
} from "@ant-design/icons-vue";
import { computed, reactive, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { mieter, mitarbeiter } from "@/data/testData";
import { data, columns } from "@/data/tableTestData";
import { ticketCategory, ticketStatus } from "@/data/tableTestData";
import { stufe } from "@/data/formCategorys";

const form = reactive({
  empty: "",
  mietNummer: "",
  email: "",
  category: "",
  adress: "",
  description: "",
  status: "",
});

const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};

// Get numbers of open tickets for card
const numberOfOpenTickets = computed(() => {
  return data.filter((item) => item.status === "Offen").length;
});

const numberOfOwnTickets = computed(() => {
  return data.filter((item) => item.reviser === "Sinan Ertogrul").length;
});

// For uploading files in Ticket-Forms
const fileList = ref([]);
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (status === "done") {
    message.success(`${info.file.name} Datei wurde erfolgreich hochgeladen.`);
  } else if (status === "error") {
    message.error(`${info.file.name} Fehlgeschlagen.`);
  }
};
function handleDrop(e: DragEvent) {
  console.log(e);
}

// filter Data per category, status, ticket id
const selectedStatus = ref("Status");
const selectedCategory = ref("Kategorie");
const searchInput = ref("");

const filteredData = computed(() => {
  let filtered = data;

  if (selectedCategory.value !== "Kategorie") {
    filtered = filtered.filter(
      (item) => item.category === selectedCategory.value
    );
  }

  if (selectedStatus.value !== "Status") {
    filtered = filtered.filter((item) => item.status === selectedStatus.value);
  }

  if (searchInput.value !== "") {
    filtered = filtered.filter((item) => item.id.includes(searchInput.value));
  }

  return filtered;
});

const openTicketsArrow = computed(() => {
  return data.filter((item) => item.status === "Offen");
});

const handleArrowButtonOpen = () => {
  selectedStatus.value = "Offen";
};

// Reset all filters with button
const resetFilters = () => {
  selectedStatus.value = "Status";
  selectedCategory.value = "Kategorie";
};

interface Option {
  value: string;
}
// live search in testData for standard Tickets for mietVertragsID
const value2 = ref("");
const options2 = ref<Option[]>(
  mieter.map((mieter) => ({ value: mieter.mietVertragsID }))
);
const filterOption = (input: string, option: Option) => {
  return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
};

// autofill if renter is found
const foundMietVertragID = () => {
  const selectedMietVertragID = value2.value;
  const selectedRenter = mieter.find(
    (mieter) => mieter.mietVertragsID === selectedMietVertragID
  );
  if (selectedRenter) {
    form.adress =
      selectedRenter.adresse +
      ", " +
      selectedRenter.plz +
      " " +
      selectedRenter.stadt;
    form.email = selectedRenter.email;
  } else {
    form.adress = "";
    form.email = "";
  }
};

// search for worker
interface EmployeeOption {
  value: string;
}
const valueEmployee = ref("");
const options3 = ref<EmployeeOption[]>(
  mitarbeiter.map((mitA) => ({ value: `${mitA.vorname} ${mitA.nachname}` }))
);
</script>

<template>
  <main>
    <div class="container">
      <h1 class="page-title">Ticketcenter</h1>
      <h3 class="description">
        Herzlich willkommen im Ticketcenter! In dieser Übersicht findest du alle
        aktuellen Tickets und Anfragen. Hier kannst du den Status deiner Tickets
        verfolgen, wichtige Informationen abrufen und mit Leichtigkeit auf
        Kundenanfragen antworten. Wir sind hier, um sicherzustellen, dass du
        effizient und produktiv arbeiten kannst, um die Anliegen unserer Kunden
        bestmöglich zu bearbeiten.
      </h3>
      <h5 class="navigation-title">Online-Ticketsystem/Ticketcenter</h5>
      <div class="cards">
        <Card :bordered="false" class="card">
          <template #extra>
            <PlusOutlined
              class="plus"
              @click="showDrawer"
              style="font-size: 25px; color: white"
            />
          </template>
          <div style="flex-grow: 1"></div>
          <h4
            style="
              color: white;
              font-weight: bold;
              margin-left: -13px;
              margin-bottom: -10px;
            "
          >
            Ticket erstellen
          </h4>
        </Card>
        <Card :title="numberOfOpenTickets" :bordered="false" class="card white">
          <template #extra>
            <ArrowRightOutlined
              class="arrow"
              @click="handleArrowButtonOpen"
              style="font-size: 25px; color: #1e5f20"
            />
          </template>
          <div style="flex-grow: 1"></div>
          <h4
            style="
              color: rgb(80, 79, 79);
              font-weight: bold;
              margin-left: -13px;
              margin-bottom: -10px;
            "
          >
            Tickets - Offen
          </h4>
        </Card>
        <Card :title="numberOfOwnTickets" :bordered="false" class="card white">
          <template #extra>
            <ArrowRightOutlined
              class="arrow"
              style="font-size: 25px; color: #1e5f20"
            />
          </template>
          <div style="flex-grow: 1"></div>
          <h4
            style="
              color: rgb(80, 79, 79);
              font-weight: bold;
              margin-left: -13px;
              margin-bottom: -10px;
            "
          >
            Meine Tickets
          </h4>
        </Card>
        <Card title="4" :bordered="false" class="card white">
          <template #extra>
            <ArrowRightOutlined
              class="arrow"
              style="font-size: 25px; color: #1e5f20"
            />
          </template>
          <div style="flex-grow: 1"></div>
          <h4
            style="
              color: rgb(80, 79, 79);
              font-weight: bold;
              margin-left: -13px;
              margin-bottom: -10px;
            "
          >
            Archiv
          </h4>
        </Card>
      </div>
      <div class="inline-elements">
        <InputSearch
          class="custom-search"
          placeholder="Suche nach TicketID.. "
          v-model:value="searchInput"
        ></InputSearch>
        <Select
          v-model:value="selectedStatus"
          :options="ticketStatus.map((stat) => ({ value: stat }))"
          style="width: 125px"
        ></Select>
        <Select
          v-model:value="selectedCategory"
          :options="ticketCategory.map((cat) => ({ value: cat }))"
          style="width: 180px"
        ></Select>
        <Button class="reset-filter" @click="resetFilters">
          Filter zurücksetzen
        </Button>
      </div>
      <div>
        <Drawer
          title="Ticket erstellen"
          :width="720"
          :open="open"
          :body-style="{ paddingBottom: '80px' }"
          :footer-style="{ textAlign: 'right' }"
          @close="onClose"
        >
          <Form :model="form" layout="vertical">
            <Row :gutter="16">
              <Col :span="12">
                <FormItem label="Mietvertragsnummer" name="mietNummer">
                  <AutoComplete
                    v-model:value="value2"
                    :options="options2"
                    placeholder="Mietvertragsnummer eingeben"
                    :filterOption="filterOption"
                    @change="foundMietVertragID"
                  />
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="E-Mail" name="email">
                  <Input
                    v-model:value="form.email"
                    style="width: 100%"
                    placeholder="E-Mail eingeben"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col :span="12">
                <FormItem label="Kategorie" name="category">
                  <Select
                    :model:value="form.category"
                    placeholder="Wähle eine Kategorie aus"
                    :options="ticketCategory.map((cat) => ({ value: cat }))"
                  >
                  </Select>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="Adresse" name="adresse">
                  <Input
                    v-model:value="form.adress"
                    placeholder="Adresse eingeben"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col :span="12">
                <FormItem label="Dringlichkeit" name="dringlichkeit">
                  <Select
                    :model:value="form.category"
                    placeholder="Wähle die Dringlichkeit aus"
                    :options="stufe.map((stuf) => ({ value: stuf }))"
                  >
                  </Select>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="Bearbeiter (Optional)" name="bearbeiter">
                  <AutoComplete
                    v-model:value="valueEmployee"
                    :options="options3"
                    placeholder="Suche nach einem Mitarbeiter"
                    :filterOption="filterOption"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col :span="24">
                <FormItem label="Beschreibung" name="description">
                  <Textarea
                    v-model:value="form.description"
                    :rows="4"
                    placeholder="Beschreiben Sie Ihr Anliegen.."
                  >
                  </Textarea>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col :span="24">
                <UploadDragger
                  v-model:fileList="fileList"
                  name="file"
                  :multiple="true"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  @change="handleChange"
                  @drop="handleDrop"
                >
                  <p class="ant-upload-drag-icon">
                    <inbox-outlined></inbox-outlined>
                  </p>
                  <p class="ant-upload-text">
                    Klicken oder ziehen Sie die Datei in diesen Bereich um sie
                    hochzuladen
                  </p>
                  <p class="ant-upload-hint">
                    Unterstützung für Einzel- oder Massen-Uploads. Streng
                    verbieten von Hochladen von Unternehmensdaten oder anderen
                    Banddateien
                  </p>
                </UploadDragger>
              </Col>
            </Row>
          </Form>
          <template #extra>
            <Space>
              <Button @click="onClose">Verlassen</Button>
              <Button
                type="primary"
                @click="onClose"
                style="background-color: #1e5f20"
                >Bestätigen</Button
              >
            </Space>
          </template>
        </Drawer>
      </div>
      <Table
        class="custom-table"
        :columns="columns"
        :dataSource="filteredData"
      ></Table>
    </div>
  </main>
</template>

<style>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px 3%;
  background: rgb(235, 233, 233);
  border-radius: 15px;
  margin-left: -3%;
  margin-right: -3%;
  margin-top: 40px;
  box-sizing: border-box;
}

.page-title {
  position: absolute;
  top: 10px;
  left: 2%;
  font-size: 2.3vw;
  font-weight: bold;
  color: #1e5f20;
}
.description {
  position: absolute;
  top: 100px;
  color: #1e5f20;
  left: 2%;
}
.navigation-title {
  position: absolute;
  top: 20vh;
  margin-left: -1px;
  font-weight: bold;
  width: 100%;
  color: #1e5f20;
}
.inline-elements {
  display: flex;
  margin-top: 60px;
  gap: 15px;
  margin-left: -1px;
}
.custom-search {
  font-weight: bold;
  color: white;
  width: 100%;
  max-width: 300px;
}

.reset {
  position: absolute;
  top: 27.1vw;
  left: 85.8%;
}

.cards {
  display: flex;
  margin-top: 200px;
  gap: 50px;
  margin-left: -1px;
}

.card {
  position: relative;
  width: 150px;
  height: 150px;
  background-color: #1e5f20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.card.white {
  background-color: white;
}

.arrow {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: -15px;
  margin-right: -15px;
}

.plus {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: -15px;
  margin-right: -15px;
}

.custom-table {
  position: relative;
  width: 100%;
  top: 20px;
}

/** For smaller monitors */
@media (max-width: 768px) {
  .container {
    padding: 20px 3%;
    width: 100%;
  }
  .page-title {
    font-size: 4.5vw;
    top: 5%;
  }
  .description {
    top: 80px;
  }
  .navigation-title {
    font-size: 4vw;
    top: 8vh;
  }
  .cards {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .inline-elements {
    flex-direction: column;
    gap: 10px;
  }
  .custom-table {
    width: 100%;
    font-size: 12px;
  }
}
</style>
