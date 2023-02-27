import { Model, hasMany, belongsTo } from "miragejs";

export default {
  user: Model.extend(),
  institution: Model.extend({
    coordinators: hasMany(),
    services: hasMany(),
  }),
  coordinator: Model.extend({
    institution: belongsTo(),
    mails: hasMany(),
    phone: hasMany(),
  }),
  mail: Model.extend({
    coordinator: belongsTo(),
  }),
  phone: Model.extend({
    coordinator: belongsTo(),
  }),
  service: Model.extend({
    institution: belongsTo(),
  }),
};
