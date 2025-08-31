import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    discordId: v.string(),
    isPremium: v.boolean(),
    experiationDatePremium: v.optional(v.number()),
    discordBotToken: v.string(),
  }),
});
