import { v } from "convex/values"
import { mutation } from "./_generated/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Returns "created" | "already_subscribed" so the UI can show the right
// message without treating a repeat signup as an error. Subscribers are read
// in the Convex dashboard (Data > newsletterSubscribers).
export const subscribe = mutation({
  args: { email: v.string() },
  returns: v.union(v.literal("created"), v.literal("already_subscribed")),
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase()
    if (!EMAIL_RE.test(email)) throw new Error("Enter a valid email address")
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique()
    if (existing) return "already_subscribed"
    await ctx.db.insert("newsletterSubscribers", { email })
    return "created"
  },
})
