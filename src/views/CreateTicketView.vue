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
  CardMeta,
  Modal,
} from "ant-design-vue";
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
import { ref } from "vue";
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
</script>

<template>
  <main>
    <div class="container"></div>
    <h1 class="page-title">Ticket erstellen</h1>
    <Card class="reparatur" hoverable style="width: 240px" @click="showModal">
      <template #cover>
        <img alt="example" src="/reparatur.png" />
      </template>
      <CardMeta title="Wartung und Reparatur">
        <template #description>Ticket erstellen</template>
      </CardMeta>
    </Card>
    <Modal
      v-model:open="open"
      width="1000px"
      title="Basic Modal"
      @ok="handleOk"
    ></Modal>
    <Card class="reinigung" hoverable style="width: 240px">
      <template #cover>
        <img alt="example" src="/reinigung.png" />
      </template>
      <CardMeta title="Reinigung">
        <template #description>Ticket erstellen</template>
      </CardMeta>
    </Card>
    <Card class="einrichtung" hoverable style="width: 240px">
      <template #cover>
        <img alt="example" src="/einrichtung.png" />
      </template>
      <CardMeta title="Gemeinschaftseinrichtungen">
        <template #description>Ticket erstellen</template>
      </CardMeta>
    </Card>
    <Card class="vertrag" hoverable style="width: 240px">
      <template #cover>
        <img alt="example" src="/vertrag.png" />
      </template>
      <CardMeta title="Vertragsangelegenheiten">
        <template #description>Ticket erstellen</template>
      </CardMeta>
    </Card>
    <Card class="verwaltung" hoverable style="width: 240px">
      <template #cover>
        <img alt="example" src="/verwaltung.png" />
      </template>
      <CardMeta title="Verwaltung">
        <template #description>Ticket erstellen</template>
      </CardMeta>
    </Card>
    <Card class="sicherheit" hoverable style="width: 240px">
      <template #cover>
        <img alt="example" src="/sicherheit.png" />
      </template>
      <CardMeta title="Sicherheit">
        <template #description>Ticket erstellen</template>
      </CardMeta>
    </Card>
    <Card class="kommunikation" hoverable style="width: 240px">
      <template #cover>
        <img alt="example" src="/kommunikation.png" />
      </template>
      <CardMeta title="Kommunikation">
        <template #description>Ticket erstellen</template>
      </CardMeta>
    </Card>
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
