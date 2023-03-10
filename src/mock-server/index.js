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
      server.createList("read", 100);
      server.createList("plan", 100);
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
      this.post("/services", (schema, request) => {
        const newService = JSON.parse(request.requestBody);
        const createdService = schema.institutions.create(newService);
        return new Response(201, {}, createdService.attrs);
      });
      this.post("/service/:id/user", (schema, request) => {
        const newService = JSON.parse(request.requestBody);
        const createdService = schema.institutions.create(newService);
        return new Response(201, {}, createdService.attrs);
      });
      this.delete("/service/:id", (schema, request) => {
        const serviceId = request.params.id;
        schema.services.find(serviceId).destroy();
        return new Response(200);
      });

      this.get("/reads", (schema) => {
        return new Response(200, {}, schema.reads.all().models);
      });
      this.post("/reads", (schema, request) => {
        const newRead = JSON.parse(request.requestBody);
        const createdRead = schema.reads.create(newRead);
        return new Response(201, {}, createdRead.attrs);
      });

      this.get("/plans", (schema) => {
        return new Response(200, {}, schema.plans.all().models);
      });
      this.post("/plans", (schema, request) => {
        const newPlan = JSON.parse(request.requestBody);
        const createdPlan = schema.institutions.create(newPlan);
        return new Response(201, {}, createdPlan.attrs);
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
