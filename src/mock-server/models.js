import { Model, hasMany, belongsTo } from "miragejs";

export default {
  user: Model.extend(),
  institution: Model.extend({
    coordinators: hasMany(),
    services: hasMany(),
  }),
  service: Model.extend({
    institution: belongsTo(),
  }),
  read: Model.extend({
    service: belongsTo(),
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
};
