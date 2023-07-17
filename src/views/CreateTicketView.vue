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
  Modal,
  type UploadChangeParam,
} from "ant-design-vue";

import { reactive, ref } from "vue";
import type { Rule } from "ant-design-vue/es/form";
const open = ref<boolean>(false);
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
</script>

<template>
  <main>
    <div class="container"></div>
    <h1 class="page-title">Ticket erstellen</h1>
    <Card
      class="reparatur"
      hoverable
      style="width: 240px"
      @click="showModal(0)"
    >
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
      <Form :model="form" :rules="rules" layout="vertical">
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="Mietvertragsnummer" name="mietNummer">
              <Input
                v-model:value="form.mietNummer"
                placeholder="Mietvertragsnummer eingeben"
                style="width: 60%"
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
                <SelectOption value="Sanitärprobleme"
                  >Sanitärprobleme</SelectOption
                >
                <SelectOption value="Elektrische Probleme"
                  >Elektrische Probleme</SelectOption
                >
                <SelectOption value="Heizung, Lüftung und Klimaanlage (HVAC)"
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
                Unterstützung für Einzel- oder Massen-Uploads. Streng verbieten
                von Hochladen von Unternehmensdaten oder anderen Banddateien
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
    <Card
      class="reinigung"
      hoverable
      style="width: 240px"
      @click="showModal(1)"
    >
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
      <Form :model="form" :rules="rules" layout="vertical">
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="Mietvertragsnummer" name="mietNummer">
              <Input
                v-model:value="form.mietNummer"
                placeholder="Mietvertragsnummer eingeben"
                style="width: 60%"
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
                <SelectOption value="Allgemeine Reinigung"
                  >Allgemeine Reinigung</SelectOption
                >
                <SelectOption value="Treppenhausreinigung"
                  >Treppenhausreinigung</SelectOption
                >
                <SelectOption value="Sanitärreinigung"
                  >Sanitärreinigung</SelectOption
                >
                <SelectOption value="Außenreinigung"
                  >Außenreinigung</SelectOption
                >
                <SelectOption value="Spezialreinigung"
                  >Spezialreinigung</SelectOption
                >
                <SelectOption value="Sonstiges">Sonstiges</SelectOption>
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
                Unterstützung für Einzel- oder Massen-Uploads. Streng verbieten
                von Hochladen von Unternehmensdaten oder anderen Banddateien
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
    <Card
      class="einrichtung"
      hoverable
      style="width: 240px"
      @click="showModal(2)"
    >
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
      <Form :model="form" :rules="rules" layout="vertical">
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="Mietvertragsnummer" name="mietNummer">
              <Input
                v-model:value="form.mietNummer"
                placeholder="Mietvertragsnummer eingeben"
                style="width: 60%"
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
                <SelectOption value="Aufzüge">Aufzüge</SelectOption>
                <SelectOption value="Treppenhäuser">Treppenhäuser</SelectOption>
                <SelectOption value="Beleuchtung">Beleuchtung</SelectOption>
                <SelectOption value="Müllentsorgung"
                  >Müllentsorgung</SelectOption
                >
                <SelectOption value="Gemeinschaftswaschräume"
                  >Gemeinschaftswaschräume</SelectOption
                >
                <SelectOption value="Fahrradabstellplätze"
                  >Fahrradabstellplätze</SelectOption
                >
                <SelectOption value="Spielplätze oder Freizeiteinrichtungen"
                  >Spielplätze oder Freizeiteinrichtungen</SelectOption
                >
                <SelectOption value="Parkplätze">Parkplätze</SelectOption>
                <SelectOption value="Sonstiges">Sonstiges</SelectOption>
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
                Unterstützung für Einzel- oder Massen-Uploads. Streng verbieten
                von Hochladen von Unternehmensdaten oder anderen Banddateien
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
    <Card class="vertrag" hoverable style="width: 240px" @click="showModal(3)">
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
      <Form :model="form" :rules="rules" layout="vertical">
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="Mietvertragsnummer" name="mietNummer">
              <Input
                v-model:value="form.mietNummer"
                placeholder="Mietvertragsnummer eingeben"
                style="width: 60%"
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
                <SelectOption value="Mietverträge">Mietverträge</SelectOption>
                <SelectOption value="Nebenkostenabrechnung"
                  >Nebenkostenabrechnung</SelectOption
                >
                <SelectOption value="Vertragsänderungen"
                  >Vertragsänderungen</SelectOption
                >
                <SelectOption value="Kündigungen">Kündigungen</SelectOption>
                <SelectOption value="Mieterrechte und -pflichten"
                  >Mieterrechte und -pflichten</SelectOption
                >
                <SelectOption value="Mietzahlungen">Mietzahlungen</SelectOption>
                <SelectOption value="Versicherungen"
                  >Versicherungen</SelectOption
                >
                <SelectOption value="Sonstiges">Sonstiges</SelectOption>
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
                Unterstützung für Einzel- oder Massen-Uploads. Streng verbieten
                von Hochladen von Unternehmensdaten oder anderen Banddateien
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
    <Card
      class="verwaltung"
      hoverable
      style="width: 240px"
      @click="showModal(4)"
    >
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
      <Form :model="form" :rules="rules" layout="vertical">
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="Mietvertragsnummer" name="mietNummer">
              <Input
                v-model:value="form.mietNummer"
                placeholder="Mietvertragsnummer eingeben"
                style="width: 60%"
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
                <SelectOption value="Allgemeine Verwaltung"
                  >Allgemeine Verwaltung</SelectOption
                >
                <SelectOption value="Vertragsverwaltung"
                  >Vertragsverwaltung</SelectOption
                >
                <SelectOption value="Finanzverwaltung"
                  >Finanzverwaltung</SelectOption
                >
                <SelectOption value="Dokumentenverwaltung"
                  >Dokumentenverwaltung</SelectOption
                >
                <SelectOption value="Beschwerdemanagement"
                  >Beschwerdemanagement</SelectOption
                >
                <SelectOption value="Sonstiges">Sonstiges</SelectOption>
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
                Unterstützung für Einzel- oder Massen-Uploads. Streng verbieten
                von Hochladen von Unternehmensdaten oder anderen Banddateien
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
    <Card
      class="sicherheit"
      hoverable
      style="width: 240px"
      @click="showModal(5)"
    >
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
      <Form :model="form" :rules="rules" layout="vertical">
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="Mietvertragsnummer" name="mietNummer">
              <Input
                v-model:value="form.mietNummer"
                placeholder="Mietvertragsnummer eingeben"
                style="width: 60%"
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
                <SelectOption value="Zugangskontrolle"
                  >Zugangskontrolle</SelectOption
                >
                <SelectOption value="Überwachungssysteme"
                  >Überwachungssysteme</SelectOption
                >
                <SelectOption value="Notfallpläne">Notfallpläne</SelectOption>
                <SelectOption value="Brandschutz">Brandschutz</SelectOption>
                <SelectOption value="Sicherheitsrisiken"
                  >Sicherheitsrisiken</SelectOption
                >
                <SelectOption value="Verlust oder Diebstahl"
                  >Verlust oder Diebstahl</SelectOption
                >
                <SelectOption value="Sonstiges">Sonstiges</SelectOption>
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
                Unterstützung für Einzel- oder Massen-Uploads. Streng verbieten
                von Hochladen von Unternehmensdaten oder anderen Banddateien
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
    <Card
      class="kommunikation"
      hoverable
      style="width: 240px"
      @click="showModal(6)"
    >
      <template #cover>
        <img alt="example" src="/kommunikation.png" />
      </template>
      <CardMeta title="Kommunikation">
        <template #description>Ticket erstellen</template>
      </CardMeta>
    </Card>
    <Modal
      v-model:open="modals[6]"
      width="1000px"
      title="Ticket erstellen - Kommunikation"
      @ok="handleOk(6)"
    >
      <Form :model="form" :rules="rules" layout="vertical">
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="Mietvertragsnummer" name="mietNummer">
              <Input
                v-model:value="form.mietNummer"
                placeholder="Mietvertragsnummer eingeben"
                style="width: 60%"
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
                <SelectOption value="Anfragen und Informationen"
                  >Anfragen und Informationen</SelectOption
                >
                <SelectOption value="Beschwerden und Feedback"
                  >Beschwerden und Feedback</SelectOption
                >
                <SelectOption value="Notfallkommunikation"
                  >Notfallkommunikation</SelectOption
                >
                <SelectOption value="Sonstiges">Sonstiges</SelectOption>
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
                Unterstützung für Einzel- oder Massen-Uploads. Streng verbieten
                von Hochladen von Unternehmensdaten oder anderen Banddateien
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
  position: absolute;
  top: 120px;
  left: 12%;
  transform: translateX(-50%);
  font-size: 2.3vw;
  font-weight: bold;
  color: #1e5f20;
}
.reparatur {
  position: absolute;
  top: 290px;
  left: 11%;
  transform: translateX(-50%);
  color: #1e5f20;
}
.reinigung {
  position: absolute;
  top: 290px;
  left: 27%;
  transform: translateX(-50%);
  color: #1e5f20;
}
.einrichtung {
  position: absolute;
  top: 290px;
  left: 43%;
  transform: translateX(-50%);
  color: #1e5f20;
}
.vertrag {
  position: absolute;
  top: 290px;
  left: 59%;
  transform: translateX(-50%);
  color: #1e5f20;
}
.verwaltung {
  position: absolute;
  top: 290px;
  left: 75%;
  transform: translateX(-50%);
  color: #1e5f20;
}
.sicherheit {
  position: absolute;
  top: 700px;
  left: 11%;
  transform: translateX(-50%);
  color: #1e5f20;
}
.kommunikation {
  position: absolute;
  top: 700px;
  left: 27%;
  transform: translateX(-50%);
  color: #1e5f20;
}
</style>
