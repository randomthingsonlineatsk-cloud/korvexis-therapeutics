import { v } from "convex/values"
import { mutation } from "./_generated/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Public contact form. Messages are read in the Convex dashboard
// (Data > contactMessages); there is no in-app admin page.
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    organization: v.optional(v.string()),
    topic: v.union(v.literal("Media inquiry"), v.literal("Investor inquiry"), v.literal("Careers"), v.literal("General")),
    message: v.string(),
  },
  returns: v.id("contactMessages"),
  handler: async (ctx, args) => {
    const name = args.name.trim()
    const email = args.email.trim()
    const message = args.message.trim()
    if (!name) throw new Error("Name is required")
    if (!EMAIL_RE.test(email)) throw new Error("Enter a valid email address")
    if (message.length < 10) throw new Error("Message is too short")
    return await ctx.db.insert("contactMessages", {
      name,
      email,
      organization: args.organization?.trim() || undefined,
      topic: args.topic,
      message,
      handled: false,
    })
  },
})
