import type { Locale } from "@/i18n/config";
import { disciplines as disciplinesEn } from "./disciplines";
import { disciplines as disciplinesEs } from "./disciplines.es";
import { education as educationEn, jobs as jobsEn } from "./experience";
import { education as educationEs, jobs as jobsEs } from "./experience.es";

// Long-form content per language. The English files stay the source of truth for shapes and stacks.
export const getJobs = (locale: Locale) => (locale === "es" ? jobsEs : jobsEn);
export const getEducation = (locale: Locale) => (locale === "es" ? educationEs : educationEn);
export const getDisciplines = (locale: Locale) => (locale === "es" ? disciplinesEs : disciplinesEn);
