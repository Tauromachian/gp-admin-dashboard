import { Factory } from "miragejs";

export default {
  user: Factory.extend({
    username(i) {
      return `User ${i + 1}`;
    },
    email(i) {
      return `Email ${i + 1}`;
    },
    password(i) {
      return `Password ${i + 1}`;
    },
  }),
  institution: Factory.extend({
    name(i) {
      return `Institution ${i + 1}`;
    },
    description(i) {
      return `Some description ${i + 1}`;
    },
    province(i) {
      return `Some province ${i + 1}`;
    },
    representative(i) {
      return `Representative ${i + 1}`;
    },
    organism(i) {
      return `Organism ${i + 1}`;
    },
    afterCreate(institution, server) {
      server.createList("coordinator", 5, { institution });
      server.createList("service", 5, { institution });
    },
  }),
  service: Factory.extend({
    name(i) {
      return `Some name ${i + 1}`;
    },
    codcli() {
      return Math.floor(Math.random() * 100);
    },
    meter_no(i) {
      return Math.floor(Math.random() * 10000);
    },
    demanda(i) {
      return `Demanda ${i + 1}`;
    },
    exclusivo() {
      return !!Math.floor(Math.random() * 2);
    },
    crf(i) {
      return `Some province ${i + 1}`;
    },
    metraje(i) {
      return `Metrage ${i}`;
    },
    capacidad() {
      return Math.floor(Math.random() * 10000);
    },
  }),
  read: Factory.extend({
    T1IAE(i) {
      return Math.floor(Math.random() * 10000);
    },
    T2IAE(i) {
      return Math.floor(Math.random() * 10000);
    },
    T3IAE(i) {
      return Math.floor(Math.random() * 10000);
    },
    TIRE(i) {
      return Math.floor(Math.random() * 10000);
    },
    T1IMAXD(i) {
      return Math.floor(Math.random() * 10000);
    },
    T2IMAXD(i) {
      return Math.floor(Math.random() * 10000);
    },
    T3IMAXD(i) {
      return Math.floor(Math.random() * 10000);
    },
    date() {
      return new Date();
    },
  }),
  plan: Factory.extend({
    year() {
      return new Date().getFullYear();
    },
    january(i) {
      return Math.floor(Math.random() * 10000);
    },
    february(i) {
      return Math.floor(Math.random() * 10000);
    },
    march(i) {
      return Math.floor(Math.random() * 10000);
    },
  }),
  coordinator: Factory.extend({
    name(i) {
      return `Coordinator name ${i}`;
    },
    charge(i) {
      return `Coordinator name ${i}`;
    },
    afterCreate(coordinator, server) {
      server.createList("mail", 5, { coordinator });
      server.createList("phone", 5, { coordinator });
    },
  }),
  mail: Factory.extend({
    name(i) {
      return `Some mail ${i}`;
    },
  }),
  phone: Factory.extend({
    name(i) {
      return `Some phone ${i}`;
    },
  }),
};
