
export type Person = {
  vorname: string;
  nachname: string;
  geburtsDatum: Date;
  adresse: string;
  telNummer: string;
  email: string;
};

export type Mieter = Person & {
  mietVertragsID: string;
  einzugDatum?: Date;
  auszugDatum?: Date;
  kaution?: Number;
  wohnungsID?: string;
  stadt: string;
  plz: string;
};

export type Mitarbeiter = Person & {
  personID: string;
  abteilung?: string;
  position?: string;
};

export type Wohnung = {
  wohnungsID: string;
  größe: Number;
  zimmer: Number;
  miete: Number;
  zustand: string;
  adresse: string;
  etage: Number;
  balkon: Boolean;
  wohnObjektID: string;
};

export type WohnObjekt = {
  objektID: string;
  adresse: string;
  anzahlWohn: Number;
  fahrstuhl: Boolean;
  baujahr: Number;
  zustand: string;
  wohnungsGesellschaftID: string;
};

export type WohnungsGesellschaft = {
  wohnGesellID: string;
  firmenName: string;
  adresse: string;
  telNummer: string;
  email: string;
  wohnObjekte: WohnObjekt[];
};

export type standardTicket = {
  status?: string;
  bearbeiter?: string,
  initiator?: string;
  mietVetragsNummer: string;
  email: string;
  kategorie: [];
  adresse: string;
  beschreibung: string;
  erstellungsDatum: Date;
}
