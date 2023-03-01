import { Server, Response } from "miragejs";
import factories from "./factories";
import models from "./models";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    models,
    environment,
    factories,
    seeds(server) {
      server.createList("institution", 5);
      server.createList("service", 20);
    },
    routes() {
      this.post("/auth/login", () => {
        return new Response(200, {}, { token: "token" });
      });
      this.get("/institutions", (schema) => {
        const { models } = schema.institutions.all();
        const institutions = models.map((model) => {
          return model.attrs;
        });
        return new Response(200, {}, institutions);
      });
      this.post("/institutions", (schema, request) => {
        const institutionReq = request.requestBody;
        const institution = JSON.parse(institutionReq);
        const createdInstitution = schema.institutions.create(institution);
        return new Response(201, {}, createdInstitution.attrs);
      });
      this.patch("/institutions/:id", (schema, request) => {
        const institutionId = request.params.id;
        const institutionReq = request.requestBody;
        const newInstitutionData = JSON.parse(institutionReq);
        const institutionToUpdate = schema.institutions.find(institutionId);
        institutionToUpdate.update(newInstitutionData);
        return new Response(201, {}, institutionToUpdate.attrs);
      });
      this.delete("/institution/:id", (schema, request) => {
        const institutionId = request.params.id;
        const institution = schema.institutions.find(institutionId);
        institution.destroy();
        return new Response(200);
      });
      this.get("/institution/:id/coordinators", (schema, request) => {
        const institutionId = request.params.id;
        const institution = schema.institutions.find(institutionId);

        return new Response(200, {}, institution.coordinators);
      });
      this.get("/institution/:id/services", (schema, request) => {
        const institutionId = request.params.id;
        const institution = schema.institutions.find(institutionId);
        return new Response(200, {}, institution.services.models);
      });

      this.get("/services", (schema) => {
        return new Response(200, {}, schema.services.all().models);
      });
      this.get("/coordinator/:id/mails", (schema, request) => {
        const coordinatorId = request.params.id;
        const coordinator = schema.coordinators.find(coordinatorId);

        return new Response(200, {}, coordinator.mails);
      });
      this.get("/coordinator/:id/phones", (schema, request) => {
        const coordinatorId = request.params.id;
        const coordinator = schema.coordinators.find(coordinatorId);

        return new Response(200, {}, coordinator.phones);
      });
    },
  });

  return server;
}
