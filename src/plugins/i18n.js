import { createI18n } from "vue-i18n";
import es from "@/lang/es.json";
import en from "@/lang/en.json";

const i18n = createI18n({
  locale: "es",
  messages: {
    es,
    en,
  },
});

export default i18n;
