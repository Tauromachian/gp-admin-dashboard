import { Factory } from "miragejs";

export default factories = {
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
    codigo_cliente(i) {
      return i;
    },
    name(i) {
      return `Some description ${i + 1}`;
    },
    crf(i) {
      return `Some province ${i + 1}`;
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
