import { initAppApi } from "./appApi";

export class RequestHeader {
  static accessToken = "";

  static setAccessToken(accessToken) {
    this.accessToken = accessToken;
    initAppApi(this.applicationJson());
  }

  static applicationJson() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  static textCsv() {
    return {
      "Content-Type": "text/csv",
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  static multipartFormData() {
    return {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${this.accessToken}`,
    };
  }
}
