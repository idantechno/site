import type { FC } from "react";
import { answerMockups } from "./answer";
import { automationMockups } from "./automation";
import { integrationMockups } from "./integration";
import { customMockups } from "./custom";

/** slug של כרטיסייה => מערך מוקאפים (רכיבים) שהיא עוברת ביניהם. */
export const MOCKUPS: Record<string, FC[]> = {
  answer: answerMockups,
  automation: automationMockups,
  integration: integrationMockups,
  custom: customMockups,
};
