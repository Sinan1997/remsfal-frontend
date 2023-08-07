import type {
  Person,
  Mieter,
  Mitarbeiter,
  Wohnung,
  WohnObjekt,
  WohnungsGesellschaft,
} from "./types";

export const wohnungsGesellschaft: WohnungsGesellschaft = {
  wohnGesellID: "WG-123",
  firmenName: "TestFirma",
  adresse: "Test2straße 2",
  telNummer: "123456789012",
  email: "testfirma@remsfal.de",
  wohnObjekte: [],
};

export const wohnObjekt: WohnObjekt = {
  objektID: "OB-123",
  adresse: "Teststraße 1-4",
  anzahlWohn: 10,
  fahrstuhl: true,
  baujahr: 2010,
  zustand: "gut",
  wohnungsGesellschaftID: wohnungsGesellschaft.wohnGesellID,
};

export const wohnung: Wohnung = {
  wohnungsID: "W-123",
  größe: 100,
  zimmer: 3,
  miete: 1100,
  zustand: "gut",
  adresse: "Teststraße 1",
  etage: 2,
  balkon: true,
  wohnObjektID: wohnObjekt.objektID,
};

export const mieter: Mieter[] = [
  {
    vorname: "Sabine",
    nachname: "Müller",
    geburtsDatum: new Date("1997-01-10"),
    adresse: "Musterstaße 1",
    stadt: "Berlin",
    plz: "10555",
    telNummer: "017612345678",
    email: "sabinemueller@remsfal.de",
    mietVertragsID: "MV-123",
    einzugDatum: new Date("2020-01-01"),
    kaution: 1500,
    wohnungsID: wohnung.wohnungsID,
  },
  {
    vorname: "Thomas",
    nachname: "Müller",
    geburtsDatum: new Date("1997-01-10"),
    adresse: "Musterstaße 2",
    stadt: "Berlin",
    plz: "10555",
    telNummer: "017612345699",
    email: "thomasmueller@remsfal.de",
    mietVertragsID: "MV-124",
    einzugDatum: new Date("2020-01-01"),
    kaution: 1500,
    wohnungsID: wohnung.wohnungsID,
  },
];

export const mitarbeiter: Mitarbeiter = {
  vorname: "Sabine",
  nachname: "Müller",
  geburtsDatum: new Date("1997-01-10"),
  adresse: "Musterstaße 1",
  telNummer: "017612345678",
  email: "sabinemueller@remsfal.de",
  personID: "PS-123",
  abteilung: "IT",
  position: "Software-Entwickler",
};
