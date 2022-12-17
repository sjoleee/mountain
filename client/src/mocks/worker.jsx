import { setupWorker } from "msw";
import { handlers } from "@/mocks/handlers.jsx";

export const worker = setupWorker(...handlers);
