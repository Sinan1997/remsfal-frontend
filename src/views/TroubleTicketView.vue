<script setup lang="ts">
import {
  Button,
  Card,
  Form,
  Row,
  Col,
  FormItem,
  Select,
  Textarea,
  UploadDragger,
  message,
  Modal,
  Input,
  DatePicker,
  type UploadChangeParam,
} from "ant-design-vue";

import { reactive, ref } from "vue";
import type { Dayjs } from "dayjs";
import {
  arbeitsplatzIntern,
  serviceIntern,
  hardware,
} from "@/data/formCategorys";

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

const fileList = ref([]);
</script>

<template>
  <main>
    <div class="container">
      <h1 class="page-title">Online-Ticketsystem (Intern)</h1>
      <h3 class="description">
        Willkommen zur internen Ticket-Erstellung! Diese Seite ermöglicht es
        unseren Mitarbeitern, Support-Tickets für interne Anliegen, technische
        Herausforderungen oder andere betriebliche Angelegenheiten zu erstellen.
        Bitte wähle eine Kategorie und nutzen Sie das Formular aus , um ein
        neues Ticket zu erfassen. Unsere Support-Abteilung steht Ihnen zur
        Verfügung, um Ihnen bei der Lösung von Problemen oder der Beantwortung
        von Fragen zu helfen.
      </h3>
      <h5 class="navigation-title">
        Online-Ticketsystem(Intern)/Internes Ticket erstellen
      </h5>
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
              <Form :model="form" layout="vertical">
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
                        :options="
                          arbeitsplatzIntern.map((cat) => ({ value: cat }))
                        "
                      >
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
                        Klicken oder ziehen Sie die Datei in diesen Bereich um
                        sie hochzuladen
                      </p>
                      <p class="ant-upload-hint">
                        Unterstützung für Einzel- oder Massen-Uploads. Streng
                        verbieten von Hochladen von Unternehmensdaten oder
                        anderen Banddateien
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
                Ihr Anliegen passt in keine der genannten Kategorien? Hier
                dürfen Sie Ihr Anliegen frei formulieren.
              </p>
            </Card>
            <Modal
              v-model:open="modals[1]"
              width="1000px"
              title="Ticket erstellen - Serviceanfrage"
              @ok="handleOk(0)"
            >
              <Form :model="form" layout="vertical">
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
                        :options="serviceIntern.map((cat) => ({ value: cat }))"
                      >
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
                        Klicken oder ziehen Sie die Datei in diesen Bereich um
                        sie hochzuladen
                      </p>
                      <p class="ant-upload-hint">
                        Unterstützung für Einzel- oder Massen-Uploads. Streng
                        verbieten von Hochladen von Unternehmensdaten oder
                        anderen Banddateien
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
              <Form :model="form" layout="vertical">
                <Row :gutter="16">
                  <Col :span="12">
                    <FormItem label="Hardware" name="hardware">
                      <Select
                        :model:value="form.category"
                        placeholder="Hardware auswählen:"
                        :options="hardware.map((cat) => ({ value: cat }))"
                      >
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row :gutter="16">
                  <Col :span="24">
                    <FormItem
                      label="Warum brauchen Sie das?"
                      name="description"
                    >
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
                        Klicken oder ziehen Sie die Datei in diesen Bereich um
                        sie hochzuladen
                      </p>
                      <p class="ant-upload-hint">
                        Unterstützung für Einzel- oder Massen-Uploads. Streng
                        verbieten von Hochladen von Unternehmensdaten oder
                        anderen Banddateien
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
              <Form :model="form" layout="vertical">
                <Row :gutter="16">
                  <Col :span="12">
                    <FormItem label="Defekte eigene Hardware" name="defectHard">
                      <Input
                        v-model:value="form.mietNummer"
                        placeholder="Gebe deine defekte Hardware ein.."
                        style="width: 60%"
                      />
                    </FormItem>
                  </Col>
                  <Col :span="12">
                    <FormItem label="Defekte Drucker" name="defectPrint">
                      <Input
                        v-model:value="form.mietNummer"
                        placeholder="DruckerID eingeben.."
                        style="width: 60%"
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
                        Klicken oder ziehen Sie die Datei in diesen Bereich um
                        sie hochzuladen
                      </p>
                      <p class="ant-upload-hint">
                        Unterstützung für Einzel- oder Massen-Uploads. Streng
                        verbieten von Hochladen von Unternehmensdaten oder
                        anderen Banddateien
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

.cards {
  display: flex;
  margin-top: 220px;
  gap: 10px;
  margin-left: -1px;
  justify-content: center;
}
.cards-all {
  background-color: #1e5f20;
  color: white;
  justify-content: center;
}

@media (max-width: 768px) {
  .container {
    padding: 20px 3%;
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
    margin-top: 150px;
    gap: 10px;
  }
}
</style>
