import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveUser = mutation({
  args: {
    discordId: v.string(),
    isPremium: v.boolean(),
    experiationDatePremium: v.optional(v.number()),
    discordBotToken: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("discordId"), args.discordId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }

    return await ctx.db.insert("users", {
      discordId: args.discordId,
      isPremium: args.isPremium,
      experiationDatePremium: args.experiationDatePremium ?? 0,
      discordBotToken: args.discordBotToken,
    });
  },
});
