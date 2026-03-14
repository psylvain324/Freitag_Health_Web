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

async function sendInsureRequestEmail(data: Record<string, unknown>): Promise<boolean> {
  if (!resend) {
    console.warn("[InsureRequest] Resend not configured - set RESEND_API_KEY");
    return false;
  }
  const entries = Object.entries(data).filter(([, v]) => v != null && v !== "");
  const rows = entries.map(([k, v]) => `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee"><strong>${String(k).replace(/</g, "&lt;")}</strong></td><td style="padding:6px 12px;border-bottom:1px solid #eee">${String(v).replace(/</g, "&lt;").replace(/\n/g, "<br>")}</td></tr>`).join("");
  const html = `
    <h2>New Insurance Quote Request</h2>
    <p><strong>From:</strong> ${(data["First Name"] as string) ?? ""} ${(data["Last Name"] as string) ?? ""} &lt;${(data["Email"] as string) ?? ""}&gt;</p>
    <table style="border-collapse:collapse;margin-top:16px;width:100%">${rows}</table>
  `;
  try {
    const { error } = await resend.emails.send({
      from: "Freitag Health Insurance Request <onboarding@resend.dev>",
      to: CONTACT_EMAILS,
      replyTo: (data["Email"] as string) || undefined,
      subject: `Insurance Quote Request: ${data["First Name"]} ${data["Last Name"]}`,
      html,
    });
    if (error) {
      console.error("[InsureRequest] Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[InsureRequest] Send failed:", err);
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
  insureRequest: router({
    submit: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email is required"),
          phone: z.string().min(1, "Phone is required"),
          state: z.string().optional(),
          numberOfPeople: z.string().optional(),
          tobaccoUse: z.string().optional(),
          preExistingConditions: z.string().optional(),
          preExistingDetails: z.string().optional(),
          currentInsurance: z.string().optional(),
          currentCarrier: z.string().optional(),
          currentPlanEndDate: z.string().optional(),
          desiredStartDate: z.string().optional(),
          additionalNotes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const labels: Record<string, string> = {
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          phone: "Phone",
          state: "State",
          numberOfPeople: "Number of People to Insure",
          tobaccoUse: "Tobacco Use (last 12 months)",
          preExistingConditions: "Pre-existing Conditions",
          preExistingDetails: "Pre-existing Details",
          currentInsurance: "Has Current Insurance",
          currentCarrier: "Current Carrier",
          currentPlanEndDate: "Current Plan End Date",
          desiredStartDate: "Desired Coverage Start Date",
          additionalNotes: "Additional Notes",
        };
        const data = Object.fromEntries(
          Object.entries(input).map(([k, v]) => [labels[k] ?? k, v])
        );
        const sent = await sendInsureRequestEmail(data);
        if (!sent) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to submit request. Please try again or call us at 727-249-3807.",
          });
        }
        return { success: true, message: "Thanks! We'll review your information and be in touch soon." };
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
