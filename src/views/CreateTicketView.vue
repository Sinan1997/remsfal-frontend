<script setup lang="ts">
import {
  Button,
  Card,
  Input,
  Form,
  Row,
  Col,
  FormItem,
  Space,
  Select,
  Textarea,
  UploadDragger,
  message,
  CardMeta,
  AutoComplete,
  Modal,
  type UploadChangeParam,
} from "ant-design-vue";
import { reactive, ref } from "vue";
import { mieter, mitarbeiter } from "@/data/testData";
import { stufe } from "@/data/formCategorys";
import {
  wartungReparatur,
  reinigung,
  gemeinEinrichtung,
  vertrag,
  verwaltung,
  sicherheit,
  kommuni,
} from "@/data/formCategorys";

const modals = ref([false, false]);
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

const form = reactive({
  empty: "",
  mietNummer: "",
  email: "",
  category: "",
  adress: "",
  description: "",
  status: "",
});

const showModal = (index: number) => {
  // open modal based on index
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
      <h1 class="page-title">Ticket erstellen</h1>
      <h3 class="description">
        Hier haben Sie die Möglichkeit, ein neues spezifisches Ticket zu
        erstellen. Unser Team steht Ihnen gerne zur Verfügung, um Ihnen bei
        Fragen, Anliegen oder technischen Problemen zu helfen. Bitte wählen Sie
        einer der Kategorien aus und füllen sie das automatisch geöffnete
        Formular aus. Geben Sie so viele Detals wie möglich in der Beschreibung
        an, um die Anfrage effizient bearbeiten zu können.
      </h3>
      <h5 class="navigation-title">Online-Ticketsystem/Ticket erstellen</h5>
      <div class="cards">
        <Card hoverable style="width: 240px" @click="showModal(0)">
          <template #cover>
            <img alt="example" src="/reparatur.png" />
          </template>
          <CardMeta title="Wartung und Reparatur">
            <template #description>Ticket erstellen</template>
          </CardMeta>
        </Card>
        <Modal
          v-model:open="modals[0]"
          width="1000px"
          title="Ticket erstellen - Wartung und Reparatur"
          @ok="handleOk(0)"
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
                <FormItem label="Katerogie" name="category">
                  <Select
                    :model:value="form.category"
                    placeholder="Wähle eine Kategorie aus"
                    :options="wartungReparatur.map((cat) => ({ value: cat }))"
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
                <FormItem label="Beschreibung" name="Beschreibung">
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
        <Card hoverable style="width: 240px" @click="showModal(1)">
          <template #cover>
            <img alt="example" src="/reinigung.png" />
          </template>
          <CardMeta title="Reinigung">
            <template #description>Ticket erstellen</template>
          </CardMeta>
        </Card>
        <Modal
          v-model:open="modals[1]"
          width="1000px"
          title="Ticket erstellen - Reinigung"
          @ok="handleOk(1)"
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
                <FormItem label="Katerogie" name="category">
                  <Select
                    :model:value="form.category"
                    placeholder="Wähle eine Kategorie aus"
                    :options="reinigung.map((cat) => ({ value: cat }))"
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
        <Card hoverable style="width: 240px" @click="showModal(2)">
          <template #cover>
            <img alt="example" src="/einrichtung.png" />
          </template>
          <CardMeta title="Gemeinschaftseinrichtungen">
            <template #description>Ticket erstellen</template>
          </CardMeta>
        </Card>
        <Modal
          v-model:open="modals[2]"
          width="1000px"
          title="Ticket erstellen - Gemeinschaftseinrichtungen"
          @ok="handleOk(2)"
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
                <FormItem label="Katerogie" name="category">
                  <Select
                    :model:value="form.category"
                    placeholder="Wähle eine Kategorie aus"
                    :options="gemeinEinrichtung.map((cat) => ({ value: cat }))"
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
        <Card hoverable style="width: 240px" @click="showModal(3)">
          <template #cover>
            <img alt="example" src="/vertrag.png" />
          </template>
          <CardMeta title="Vertragsangelegenheiten">
            <template #description>Ticket erstellen</template>
          </CardMeta>
        </Card>
        <Modal
          v-model:open="modals[3]"
          width="1000px"
          title="Ticket erstellen - Vertragsangelegenheiten"
          @ok="handleOk(3)"
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
                <FormItem label="Katerogie" name="category">
                  <Select
                    :model:value="form.category"
                    placeholder="Wähle eine Kategorie aus"
                    :options="vertrag.map((cat) => ({ value: cat }))"
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
        <Card hoverable style="width: 240px" @click="showModal(4)">
          <template #cover>
            <img alt="example" src="/verwaltung.png" />
          </template>
          <CardMeta title="Verwaltung">
            <template #description>Ticket erstellen</template>
          </CardMeta>
        </Card>
        <Modal
          v-model:open="modals[4]"
          width="1000px"
          title="Ticket erstellen - Verwaltung"
          @ok="handleOk(4)"
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
                <FormItem label="Katerogie" name="category">
                  <Select
                    :model:value="form.category"
                    placeholder="Wähle eine Kategorie aus"
                    :options="verwaltung.map((cat) => ({ value: cat }))"
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
            <Button key="back" @click="handleCancel(4)">Verlassen</Button>
            <Button
              key="submit"
              type="primary"
              :loading="loading"
              @click="handleOk(4)"
              style="background-color: #1e5f20"
              >Bestätigen</Button
            >
          </template>
        </Modal>
        <Card hoverable style="width: 240px" @click="showModal(5)">
          <template #cover>
            <img alt="example" src="/sicherheit.png" />
          </template>
          <CardMeta title="Sicherheit">
            <template #description>Ticket erstellen</template>
          </CardMeta>
        </Card>
        <Modal
          v-model:open="modals[5]"
          width="1000px"
          title="Ticket erstellen - Sicherheit"
          @ok="handleOk(5)"
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
                <FormItem label="Katerogie" name="category">
                  <Select
                    :model:value="form.category"
                    placeholder="Wähle eine Kategorie aus"
                    :options="sicherheit.map((cat) => ({ value: cat }))"
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
            <Button key="back" @click="handleCancel(5)">Verlassen</Button>
            <Button
              key="submit"
              type="primary"
              :loading="loading"
              @click="handleOk(5)"
              style="background-color: #1e5f20"
              >Bestätigen</Button
            >
          </template>
        </Modal>
        <Card hoverable style="width: 240px" @click="showModal(6)">
          <template #cover>
            <img alt="example" src="/kommunikation.png" />
          </template>
          <CardMeta title="Kommunikation">
            <template #description>Ticket erstellen</template>
          </CardMeta>
        </Card>
      </div>
      <Modal
        v-model:open="modals[6]"
        width="1000px"
        title="Ticket erstellen - Kommunikation"
        @ok="handleOk(6)"
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
                  :options="kommuni.map((cat) => ({ value: cat }))"
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
          <Button key="back" @click="handleCancel(6)">Verlassen</Button>
          <Button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk(6)"
            style="background-color: #1e5f20"
            >Bestätigen</Button
          >
        </template>
      </Modal>
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
  top: 20px;
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
  top: 30vh;
  margin-left: -5px;
  font-weight: bold;
  width: 100%;
  color: #1e5f20;
}
.cards {
  display: flex;
  margin-top: 290px;
  gap: 15px;
  margin-left: -1px;
}

@media (max-width: 768px) {
  .container {
    padding: 20px 3%;
    width: 100%;
  }
  .page-title {
    font-size: 4.5vw;
    top: 5%;
  }
  .navigation-title {
    font-size: 4vw;
    top: 8vh;
  }
  .cards {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
