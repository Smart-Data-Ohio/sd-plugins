import type { SlideTemplate } from "../types.js";
import { coverTemplate } from "./cover.js";
import { agendaTemplate } from "./agenda.js";
import { sectionDividerTemplate } from "./section-divider.js";
import { contentBulletsTemplate } from "./content-bullets.js";
import { twoColumnTemplate } from "./two-column.js";
import { teamTemplate } from "./team.js";
import { timelineTemplate } from "./timeline.js";
import { architectureTemplate } from "./architecture.js";
import { investmentTemplate } from "./investment.js";
import { differentiatorsTemplate } from "./differentiators.js";
import { nextStepsTemplate } from "./next-steps.js";
import { thankYouTemplate } from "./thank-you.js";

const templates: SlideTemplate[] = [
  coverTemplate,
  agendaTemplate,
  sectionDividerTemplate,
  contentBulletsTemplate,
  twoColumnTemplate,
  teamTemplate,
  timelineTemplate,
  architectureTemplate,
  investmentTemplate,
  differentiatorsTemplate,
  nextStepsTemplate,
  thankYouTemplate,
];

const templateMap = new Map(templates.map((t) => [t.id, t]));

export function getAllTemplates(): SlideTemplate[] {
  return templates;
}

export function getTemplate(id: string): SlideTemplate | undefined {
  return templateMap.get(id);
}
