import type { TableColumnType } from "ant-design-vue";
import { v4 as uuidv4 } from "uuid";
import {
  mieter,
  mitarbeiter,
  wohnung,
  wohnObjekt,
  wohnungsGesellschaft,
} from "./testData";

type TableDataType = {
  key: string;
  id: string;
  status?: string;
  category: string;
  description: string;
  place?: string;
  reviser?: string;
  initiator?: string;
  ticketDate?: string;
};

const formattedID = () => {
  return "RE-" + uuidv4().split("-")[3];
};

export const ticketStatus: string[] = ["Offen", "In Bearbeitung", "Gelöst"];

export const ticketCategory: string[] = [
  "Wartung und Reparatur",
  "Reinigung",
  "Gemeinschaftseinrichtungen",
  "Vertragsangelegenheiten",
  "Verwaltung",
  "Sicherheit",
  "Kommunikation",
];

const columns: TableColumnType<TableDataType>[] = [
  {
    title: "Ticket",
    dataIndex: "id",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Kategorie",
    dataIndex: "category",
  },
  {
    title: "Beschreibung",
    dataIndex: "description",
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
    title: "Erstellungsdatum",
    dataIndex: "ticketDate",
  },
];
const data: TableDataType[] = [
  {
    key: uuidv4(),
    id: formattedID(),
    status: ticketStatus[0],
    category: ticketCategory[0],
    description: "Test Data",
    place: wohnung.adresse,
    reviser: mitarbeiter.vorname + " " + mitarbeiter.nachname,
    initiator: mitarbeiter.vorname + " " + mitarbeiter.nachname,
    ticketDate: "10.10.2023",
  },
  {
    key: uuidv4(),
    id: formattedID(),
    status: ticketStatus[2],
    category: ticketCategory[2],
    description: "Test Data",
    place: "Teststraße 2",
    reviser: "Thomas Müller",
    initiator: "Sebastian Becker",
    ticketDate: "10.10.2023",
  },
  {
    key: uuidv4(),
    id: formattedID(),
    status: ticketStatus[0],
    category: ticketCategory[5],
    description: "Test Data",
    place: "Teststraße 2",
    reviser: "Bastian Müller",
    initiator: "Mario Brühl",
    ticketDate: "10.10.2023",
  },
  {
    key: uuidv4(),
    id: formattedID(),
    status: ticketStatus[1],
    category: ticketCategory[3],
    description: "Test Data",
    place: "Teststraße 2",
    reviser: "Peter Müller",
    initiator: "Phil Nebel",
    ticketDate: "10.10.2023",
  },
  {
    key: uuidv4(),
    id: formattedID(),
    status: ticketStatus[1],
    category: ticketCategory[1],
    description: "Test Data",
    place: "Teststraße 2",
    reviser: "Nadja Rof",
    initiator: "Phil Nebel",
    ticketDate: "10.10.2023",
  },
  {
    key: uuidv4(),
    id: formattedID(),
    status: ticketStatus[1],
    category: ticketCategory[6],
    description: "Test Data",
    place: "Teststraße 2",
    reviser: "Peter Mayer",
    initiator: "Phil Nebel",
    ticketDate: "10.10.2023",
  },
];

export { data, columns };
