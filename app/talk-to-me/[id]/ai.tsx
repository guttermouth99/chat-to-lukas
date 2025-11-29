import { createAI } from "@ai-sdk/rsc";
import {
  ServerMessage,
  ClientMessage,
  continueConversation,
} from "./actions";

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});

