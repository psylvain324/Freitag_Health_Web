import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const CONTACT_EMAILS = ["ssfreitaginsurance@gmail.com", "TravelVision3024@gmail.com"];

async function sendContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}): Promise<boolean> {
  if (!resend) {
    console.warn("[Contact] Resend not configured - set RESEND_API_KEY");
    return false;
  }
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${data.firstName} ${data.lastName} &lt;${data.email}&gt;</p>
    <p><strong>Message:</strong></p>
    <p>${(data.message || "").replace(/\n/g, "<br>")}</p>
  `;
  try {
    const { error } = await resend.emails.send({
      from: "Freitag Health Contact <onboarding@resend.dev>",
      to: CONTACT_EMAILS,
      replyTo: data.email,
      subject: `Contact Form: ${data.firstName} ${data.lastName}`,
      html,
    });
    if (error) {
      console.error("[Contact] Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Contact] Send failed:", err);
    return false;
  }
}

const t = initTRPC.create({
  transformer: superjson,
});
const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  contact: router({
    submitContact: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email is required"),
          message: z.string().min(1, "Message is required"),
        })
      )
      .mutation(async ({ input }) => {
        const sent = await sendContactEmail(input);
        if (!sent) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "Failed to send message. Please try again or email us directly.",
          });
        }
        return { success: true, message: "Thanks for submitting!" };
      }),
  }),
});

export type AppRouter = typeof appRouter;

export default async (req: Request) => {
  // Netlify may rewrite to /.netlify/functions/trpc - ensure request URL has correct path for tRPC
  const url = new URL(req.url);
  const path = url.pathname;
  const endpoint = path.startsWith("/.netlify/functions/trpc")
    ? "/.netlify/functions/trpc"
    : "/api/trpc";

  return fetchRequestHandler({
    endpoint,
    req,
    router: appRouter,
    createContext: () => ({}),
  });
};
