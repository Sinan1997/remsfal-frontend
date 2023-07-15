<script setup lang="ts">
import {
  Button,
  MenuItem,
  Table,
  Dropdown,
  Menu,
  DropdownButton,
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
} from "ant-design-vue";
import { InputSearch } from "ant-design-vue";
import { Input } from "ant-design-vue";
import { reactive, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import type { Rule } from "ant-design-vue/es/form";
import type {
  MenuProps,
  SelectOption,
  SelectProps,
  TableColumnType,
  TableProps,
  UploadChangeParam,
} from "ant-design-vue";
import { defineComponent } from "vue";
import {
  UserOutlined,
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
  PlusCircleTwoTone,
  ArrowRightOutlined,
} from "@ant-design/icons-vue";

import { data, columns } from "@/data/testData";
type TableDataType = {
  key: string;
  id: string;
  status: string;
  category: string;
  description: string;
  place: string;
  reviser: string;
  initiator: string;
  ticketDate: string;
};
const handleMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

const handleButtonClick = (e: Event) => {
  console.log("click left button", e);
};

const handleTest = (e: Event) => {
  console.log("It worked");
};

const form = reactive({
  empty: "",
  mietNummer: "",
  email: "",
  category: "",
  adress: "",
  description: "",
  status: "",
});

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: "Please enter user name" }],
  url: [{ required: true, message: "please enter url" }],
  owner: [{ required: true, message: "Please select an owner" }],
  type: [{ required: true, message: "Please choose the type" }],
  approver: [{ required: true, message: "Please choose the approver" }],
  dateTime: [
    { required: true, message: "Please choose the dateTime", type: "object" },
  ],
  description: [{ required: true, message: "Please enter url description" }],
};

const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};

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

const options = ref<SelectProps["options"]>([
  {
    value: "ware",
    label: "Wartung und Reperatur",
  },
  {
    value: "re",
    label: "Reinigung",
  },
  {
    value: "einr",
    label: "Gemeinschaftseinrichtungen",
  },
  {
    value: "vetrag",
    label: "Vertragsangelegenheiten",
  },
  {
    value: "verw",
    label: "Verwaltung",
  },
  {
    value: "sct",
    label: "Sicherheit",
  },
  {
    value: "kommu",
    label: "Kommunikation",
  },
]);
const handleChangeCategory: SelectProps["onChange"] = (value) => {
  console.log(value);
};

const value = ref("Kategorie");
</script>

<template>
  <main>
    <div class="container"></div>
    <h1 class="page-title">Ticketcenter</h1>
    <h5 class="navigation-title">Online-Ticketsystem/Ticketcenter</h5>
    <InputSearch
      class="custom-search"
      placeholder="Suche.."
      style="width: 300px"
    ></InputSearch>
    <div class="cards">
      <Card :bordered="false" class="add-Ticket-Card">
        <template #extra>
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              margin-top: -15px;
              margin-right: -15px;
            "
          >
            <PlusOutlined
              @click="showDrawer"
              style="font-size: 25px; color: white"
            />
          </div>
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
      <Card
        title="36"
        style="color: darkgreen"
        :bordered="false"
        class="open-Tickets-Card"
      >
        <template #extra>
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              margin-top: -15px;
              margin-right: -15px;
            "
          >
            <ArrowRightOutlined
              @click="handleTest"
              style="font-size: 25px; color: darkgreen"
            />
          </div>
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
      <Card title="12" :bordered="false" class="own-Tickets-Card">
        <template #extra>
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              margin-top: -15px;
              margin-right: -15px;
            "
          >
            <ArrowRightOutlined
              @click="handleTest"
              style="font-size: 25px; color: darkgreen"
            />
          </div>
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
          Meine Tickets - Offen
        </h4>
      </Card>
      <Card title="4" :bordered="false" class="archiv-Card">
        <template #extra>
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              margin-top: -15px;
              margin-right: -15px;
            "
          >
            <ArrowRightOutlined
              @click="handleTest"
              style="font-size: 25px; color: darkgreen"
            />
          </div>
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
    <div class="status-dropdown-wrap">
      <Dropdown trigger="click">
        <template #overlay>
          <Menu @click="handleMenuClick">
            <MenuItem key="1">
              <EditTwoTone twoToneColor="darkgreen" />
              Offen
            </MenuItem>
            <MenuItem key="2">
              <ClockCircleTwoTone twoToneColor="darkgreen" />
              In Bearbeitung
            </MenuItem>
            <MenuItem key="3">
              <CheckCircleTwoTone twoToneColor="darkgreen" />
              Gelöst
            </MenuItem>
          </Menu>
        </template>
        <template #default>
          <div class="status-dropdown">
            <Button>
              Status
              <DownOutlined />
            </Button>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="categroy-dropdown-wrap">
      <Dropdown trigger="click">
        <template #overlay>
          <Menu>
            <MenuItem key="1">
              <ToolTwoTone twoToneColor="darkgreen" />
              Wartung und Reperatur
            </MenuItem>
            <MenuItem key="2">
              <SettingTwoTone twoToneColor="darkgreen" />
              Reinigung
            </MenuItem>
            <MenuItem key="3">
              <HomeTwoTone twoToneColor="darkgreen" />
              Gemeinschaftseinrichtungen
            </MenuItem>
            <MenuItem key="4">
              <FileTextTwoTone twoToneColor="darkgreen" />
              Vertragsangelegenheiten
            </MenuItem>
            <MenuItem key="5">
              <FileTwoTone twoToneColor="darkgreen" />
              Verwaltung
            </MenuItem>
            <MenuItem key="6">
              <UnlockTwoTone twoToneColor="darkgreen" />
              Sicherheit
            </MenuItem>
            <MenuItem key="7">
              <MessageTwoTone twoToneColor="darkgreen" />
              Kommunikation
            </MenuItem>
          </Menu>
        </template>
        <template #default>
          <div class="category-dropdown">
            <Button>
              Kategorie
              <DownOutlined />
            </Button>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="reset">
      <Button> Filter zurücksetzen </Button>
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
        >
        <Form :model="form" :rules="rules" layout="vertical">
          <Row :gutter="16">
            <Col :span="12">
              <FormItem label="Mietvertragsnummer" name="mietNummer">
                <Input
                  v-model:value="form.mietNummer"
                  placeholder="Mietvertragsnummer eingeben"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="E-Mail" name="email">
                <Input
                  v-model:value="form.email"
                  style="width: 100%"
                  addon-after="@remsfal.de"
                  placeholder="E-Mail eingeben"
                />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col :span="12">
              <FormItem label="Katerogie" name="category">
                <Select
                  :model:value="form.category"
                  placeholder="Wähle eine Kategorie aus"
                >
                  <SelectOption value=""></SelectOption>
                  <SelectOption value="Wartung und Reperatur"
                    >Wartung und Reperatur</SelectOption
                  >
                  <SelectOption value="Reinigung">Reinugung</SelectOption>
                  <SelectOption value="Gemeinschaftseinrichtungen"
                    >Gemeinschaftseinrichtungen</SelectOption
                  >
                  <SelectOption value="Vertragsangelegenheiten"
                    >Vertragsangelegenheiten</SelectOption
                  >
                  <SelectOption value="Verwaltung">Verwaltung</SelectOption>
                  <SelectOption value="Sicherheit">Sicherheit</SelectOption>
                  <SelectOption value="Kommunikation"
                    >Kommunikation</SelectOption
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
            <Col :span="24">
              <FormItem label="Description" name="description">
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
              style="background-color: darkgreen"
              >Bestätigen</Button
            >
          </Space>
        </template>
      </Drawer>
    </div>
    <Table :columns="columns" :dataSource="data" class="custom-table"></Table>
  </main>
</template>

<style>
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150vh;
  top: 110px;
  background: rgb(235, 233, 233);
  border-radius: 20px;
  margin: -70px;
}
.custom-table {
  width: 200%;
  position: relative;
  top: -1370px;
  left: -1%;
}

.page-title {
  position: absolute;
  top: 120px;
  left: 10%;
  transform: translateX(-50%);
  font-size: 2.3vw;
  font-weight: bold;
  color: darkgreen;
}
.navigation-title {
  position: absolute;
  top: 28vh;
  left: 8.6%;
  transform: translateX(-50%);
  font-weight: bold;
  color: darkgreen;
}
.custom-search {
  position: absolute;
  top: 54.5vh;
  left: 12.3%;
  transform: translateX(-50%);
  font-size: 3vw;
  font-weight: bold;
  margin-bottom: 2vh;
  color: white;
}

.status-dropdown-wrap {
  position: absolute;
  top: 27.1vw;
  left: 21%;
}

.categroy-dropdown-wrap {
  position: absolute;
  top: 27.1vw;
  left: 26.5%;
}
.reset {
  position: absolute;
  top: 27.1vw;
  left: 85.8%;
}

.add-Ticket-Card {
  width: 150px;
  height: 150px;
  background-color: darkgreen;
  display: flex;
  top: -110vh;
  left: -1%;
  flex-direction: column;
  justify-content: space-between;
}
.open-Tickets-Card {
  width: 150px;
  height: 150px;
  background-color: white;
  display: flex;
  position: relative;
  top: -125.6vh;
  left: 9.5%;
  flex-direction: column;
  justify-content: space-between;
}
.own-Tickets-Card {
  width: 150px;
  height: 150px;
  background-color: white;
  display: flex;
  position: relative;
  top: -141.3vh;
  left: 20%;
  flex-direction: column;
  justify-content: space-between;
}
.archiv-Card {
  width: 150px;
  height: 150px;
  background-color: white;
  display: flex;
  position: relative;
  top: -157vh;
  left: 30.5%;
  flex-direction: column;
  justify-content: space-between;
}
</style>
