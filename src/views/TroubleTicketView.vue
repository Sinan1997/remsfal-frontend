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
  Modal,
  Input,
  InputSearch,
  DatePicker,
  type UploadChangeParam,
} from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { reactive, ref } from "vue";

const value = ref<string>("");
const modals = ref([false, false]);

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

import type { Dayjs } from "dayjs";
const value1 = ref<Dayjs>();
const value2 = ref<Dayjs>();

const showModal = (index: number) => {
  // Öffnet das entsprechende Modal basierend auf dem Index
  modals.value[index] = true;
};

const loading = ref<boolean>(false);

const handleOk = (index: number) => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    modals.value[index] = false;
  }, 2000);
};

const handleCancel = (index: number) => {
  modals.value[index] = false;
};

function handleDrop(e: DragEvent) {
  console.log(e);
}

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
  mietNummer: [
    { required: true, message: "Bitte geben Sie eine Mietnummer ein" },
  ],
  email: [{ required: true, message: "Bitte geben Sie eine E-Mail ein" }],
  category: [
    { required: true, message: "Bitte wählen sie eine Kategorie aus" },
  ],
  adresse: [{ required: true, message: "Bitte geben Sie eine Adresse ein" }],
  description: [
    { required: true, message: "Bitte beschreiben Sie das Anliegen" },
  ],
};
const fileList = ref([]);
</script>

<template>
  <main>
    <div class="container"></div>
    <h1 class="page-title">Online-Ticketsystem (Intern)</h1>
    <h3 class="navigation-title">
      Hier haben interne Mitarbeiter die Möglichkeit, ein Ticket mit Ihrem
      Anliegen zu erstellen.
    </h3>
    <h4 class="navigation-title2">
      Bitte wählen Sie zunächst einer der unten aufgeführten Anliegen aus:
    </h4>
    <div class="cards">
      <Row class="cards" :gutter="100">
        <Col :span="6">
          <Card
            class="cards-all"
            title="Störung des Arbeitsplatzes"
            :bordered="false"
            hoverable
            @click="showModal(0)"
          >
            <p>
              Für Probleme die an einem spezifischen Arbeitsplatz auftauchen.
            </p>
          </Card>
          <Modal
            v-model:open="modals[0]"
            width="1000px"
            title="Ticket erstellen - Störung des Arbeitsplatzes"
            @ok="handleOk(0)"
          >
            <Form :model="form" :rules="rules" layout="vertical">
              <Row :gutter="16">
                <Col :span="12">
                  <FormItem label="Arbeitsplatz-Nr" name="arbeitsplatz">
                    <Input
                      v-model:value="form.mietNummer"
                      placeholder="Arbeitsplatz-Nr bitte eingeben"
                      style="width: 60%"
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
                      <SelectOption value="Sanitärprobleme"
                        >Sanitärprobleme</SelectOption
                      >
                      <SelectOption value="Elektrische Probleme"
                        >Elektrische Probleme</SelectOption
                      >
                      <SelectOption
                        value="Heizung, Lüftung und Klimaanlage (HVAC)"
                        >Heizung, Lüftung und Klimaanlage (HVAC)</SelectOption
                      >
                      <SelectOption value="Schäden an Einrichtungen und Geräten"
                        >Schäden an Einrichtungen und Geräten</SelectOption
                      >
                      <SelectOption value="Türen, Fenster und Schlösser"
                        >Türen, Fenster und Schlösser</SelectOption
                      >
                      <SelectOption value="Böden und Wände"
                        >Böden und Wände</SelectOption
                      >
                      <SelectOption value="Gemeinschaftseinrichtungen"
                        >Gemeinschaftseinrichtungen</SelectOption
                      >
                      <SelectOption value="Garten- und Landschaftsbereich"
                        >Garten- und Landschaftsbereich</SelectOption
                      >
                      <SelectOption value="Sonstiges">Sonstiges</SelectOption>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col :span="12">
                  <FormItem
                    label="Wie sehr ist die Arbeit eingeschränkt?"
                    name="stufe"
                  >
                    <Select
                      :model:value="form.category"
                      placeholder="Wie sehr ist die Arbeit eingeschränkt?"
                    >
                      <SelectOption value="Keine"></SelectOption>
                      <SelectOption value="Nicht arbeitsfähig"></SelectOption>
                      <SelectOption value="Beeinträchtigt"></SelectOption>
                      <SelectOption
                        value="Eingeschränkt - jedoch Problemumgehung bekannt"
                      ></SelectOption>
                      <SelectOption value="Stört"></SelectOption>
                    </Select>
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem
                    label="In welcher Ebene ist das Unternehmen beeinträchtigt?"
                    name="ebene"
                  >
                    <Select
                      :model:value="form.category"
                      placeholder="In welcher Ebene ist das Unternehmen beeinträchtigt?"
                    >
                      <SelectOption value="0. Ebene"></SelectOption>
                      <SelectOption value="1. Ebene"></SelectOption>
                      <SelectOption value="2. Ebene"></SelectOption>
                    </Select>
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
            <template #footer>
              <Button key="back" @click="handleCancel(0)">Verlassen</Button>
              <Button
                key="submit"
                type="primary"
                :loading="loading"
                @click="handleOk(0)"
                style="background-color: #1e5f20"
                >Bestätigen</Button
              >
            </template>
          </Modal>
        </Col>
        <Col :span="6">
          <Card
            class="cards-all"
            title="Serviceanfrage"
            :bordered="false"
            hoverable
            @click="showModal(1)"
          >
            <p>
              Ihr Anliegen passt in keine der genannten Kategorien? Hier dürfen
              Sie Ihr Anliegen frei formulieren.
            </p>
          </Card>
          <Modal
            v-model:open="modals[1]"
            width="1000px"
            title="Ticket erstellen - Serviceanfrage"
            @ok="handleOk(0)"
          >
            <Form :model="form" :rules="rules" layout="vertical">
              <Row :gutter="16">
                <Col :span="24">
                  <FormItem
                    label="Bitte beschreiben Sie ihr Anliegen in einem kurzen Satz"
                    name="problem"
                  >
                    <Input
                      v-model:value="form.mietNummer"
                      placeholder="Anliegen beschreiben"
                      style="width: 60%"
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col :span="12">
                  <FormItem
                    label="Falls zutreffend, wählen Sie bitte den Breich aus, worum es geht:"
                    name="category"
                  >
                    <Select
                      :model:value="form.category"
                      placeholder="Wähle eine Kategorie aus"
                    >
                      <SelectOption value="Sanitärprobleme"
                        >Sanitärprobleme</SelectOption
                      >
                      <SelectOption value="Elektrische Probleme"
                        >Elektrische Probleme</SelectOption
                      >
                      <SelectOption
                        value="Heizung, Lüftung und Klimaanlage (HVAC)"
                        >Heizung, Lüftung und Klimaanlage (HVAC)</SelectOption
                      >
                      <SelectOption value="Schäden an Einrichtungen und Geräten"
                        >Schäden an Einrichtungen und Geräten</SelectOption
                      >
                      <SelectOption value="Türen, Fenster und Schlösser"
                        >Türen, Fenster und Schlösser</SelectOption
                      >
                      <SelectOption value="Böden und Wände"
                        >Böden und Wände</SelectOption
                      >
                      <SelectOption value="Gemeinschaftseinrichtungen"
                        >Gemeinschaftseinrichtungen</SelectOption
                      >
                      <SelectOption value="Garten- und Landschaftsbereich"
                        >Garten- und Landschaftsbereich</SelectOption
                      >
                      <SelectOption value="Sonstiges">Sonstiges</SelectOption>
                    </Select>
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem
                    label="Wie sehr ist die Arbeit eingeschränkt?"
                    name="stufe"
                  >
                    <Select
                      :model:value="form.category"
                      placeholder="Wie sehr ist die Arbeit eingeschränkt?"
                    >
                      <SelectOption value="Keine"></SelectOption>
                      <SelectOption value="Nicht arbeitsfähig"></SelectOption>
                      <SelectOption value="Beeinträchtigt"></SelectOption>
                      <SelectOption
                        value="Eingeschränkt - jedoch Problemumgehung bekannt"
                      ></SelectOption>
                      <SelectOption value="Stört"></SelectOption>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col :span="12">
                  <FormItem
                    label="In welcher Ebene ist das Unternehmen beeinträchtigt?"
                    name="ebene"
                  >
                    <Select
                      :model:value="form.category"
                      placeholder="In welcher Ebene ist das Unternehmen beeinträchtigt?"
                    >
                      <SelectOption value="0. Ebene"></SelectOption>
                      <SelectOption value="1. Ebene"></SelectOption>
                      <SelectOption value="2. Ebene"></SelectOption>
                    </Select>
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
              <Row :gutter="16">
                <Col :span="24">
                  <FormItem label="Fälligkeitsdatum" name="date"
                    ><DatePicker v-model:value="value1" />
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <template #footer>
              <Button key="back" @click="handleCancel(1)">Verlassen</Button>
              <Button
                key="submit"
                type="primary"
                :loading="loading"
                @click="handleOk(1)"
                style="background-color: #1e5f20"
                >Bestätigen</Button
              >
            </template>
          </Modal>
        </Col>
        <Col :span="6">
          <Card
            class="cards-all"
            title="Neue Hardware anfordern"
            :bordered="false"
            hoverable
            @click="showModal(2)"
          >
            <p>Zum Beispiel eine neue Maus oder einen Monitor.</p>
          </Card>
          <Modal
            v-model:open="modals[2]"
            width="1000px"
            title="Ticket erstellen - Neue Hardware anfordern"
            @ok="handleOk(0)"
          >
            <Form :model="form" :rules="rules" layout="vertical">
              <Row :gutter="16">
                <Col :span="12">
                  <FormItem label="Hardware" name="hardware">
                    <Select
                      :model:value="form.category"
                      placeholder="Hardware auswählen:"
                    >
                      <SelectOption value="Handy"></SelectOption>
                      <SelectOption value="Laptop"></SelectOption>
                      <SelectOption value="Laptop - Ladekabel"></SelectOption>
                      <SelectOption value="Handy - Ladekabel"></SelectOption>
                      <SelectOption value="Monitor"></SelectOption>
                      <SelectOption value="Kabelverlängerung"></SelectOption>
                      <SelectOption value="LAN-Kabel"></SelectOption>
                      <SelectOption value="Drucker"></SelectOption>
                      <SelectOption value="Tastatur"></SelectOption>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col :span="24">
                  <FormItem label="Warum brauchen Sie das?" name="description">
                    <Textarea
                      v-model:value="form.description"
                      :rows="4"
                      placeholder="Beschreiben Sie wofür die Hardware benötigt wird.."
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
              <Row :gutter="16">
                <Col :span="24">
                  <FormItem label="Fälligkeitsdatum" name="date"
                    ><DatePicker v-model:value="value2" />
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <template #footer>
              <Button key="back" @click="handleCancel(2)">Verlassen</Button>
              <Button
                key="submit"
                type="primary"
                :loading="loading"
                @click="handleOk(2)"
                style="background-color: #1e5f20"
                >Bestätigen</Button
              >
            </template>
          </Modal>
        </Col>
        <Col :span="6">
          <Card
            class="cards-all"
            title="Defekte Hardware"
            :bordered="false"
            hoverable
            @click="showModal(3)"
          >
            <p>
              Ein Gerät ist defekt. Der Laptop ist kaputt. Das Headset geht
              nicht mehr. Das Smartphone will nicht mehr.
            </p>
          </Card>
          <Modal
            v-model:open="modals[3]"
            width="1000px"
            title="Ticket erstellen - Defekte Hardware"
            @ok="handleOk(3)"
          >
            <Form :model="form" :rules="rules" layout="vertical">
              <Row :gutter="16">
                <Col :span="12">
                  <FormItem label="Defekte eigene Hardware" name="defectHard">
                    <Input
                      v-model:value="form.mietNummer"
                      placeholder="Suche nach Objekte.."
                      style="width: 60%"
                    />
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem label="Defekte Drucker" name="defectPrint">
                    <Input
                      v-model:value="form.mietNummer"
                      placeholder="Suche nach Objekte.."
                      style="width: 60%"
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
            <template #footer>
              <Button key="back" @click="handleCancel(3)">Verlassen</Button>
              <Button
                key="submit"
                type="primary"
                :loading="loading"
                @click="handleOk(3)"
                style="background-color: #1e5f20"
                >Bestätigen</Button
              >
            </template>
          </Modal>
        </Col>
      </Row>
    </div>
  </main>
</template>

<style>
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
.page-title {
  position: relative;
  top: -129vh;
  left: 47%;
  transform: translateX(-50%);
  font-weight: bold;
  color: #1e5f20;
}
.navigation-title {
  position: relative;
  top: -128vh;
  left: 47%;
  transform: translateX(-50%);
  font-weight: bold;
  color: #1e5f20;
}
.navigation-title2 {
  position: relative;
  top: -110vh;
  left: 47%;
  transform: translateX(-50%);
  color: #222222;
}
.cards {
  position: relative;
  padding: 20px;
  top: -50vh;
}
.cards-all {
  background-color: #1e5f20;
  color: white;
}
</style>
