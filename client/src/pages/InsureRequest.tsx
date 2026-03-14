import { useState } from "react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, AlertCircle, Shield } from "lucide-react";
import { trpc } from "@/lib/trpc";

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming",
];

const COVERAGE_START_OPTIONS = [
  "As soon as possible",
  "Within 30 days",
  "Within 60 days",
  "Within 90 days",
  "Specific date (specify in notes)",
];

type InsureRequestFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  numberOfPeople: string;
  tobaccoUse: string;
  preExistingConditions: string;
  preExistingDetails: string;
  currentInsurance: string;
  currentCarrier: string;
  currentPlanEndDate: string;
  desiredStartDate: string;
  additionalNotes: string;
  privacyConsent: boolean;
};

const initialFormData: InsureRequestFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  state: "",
  numberOfPeople: "1",
  tobaccoUse: "",
  preExistingConditions: "",
  preExistingDetails: "",
  currentInsurance: "",
  currentCarrier: "",
  currentPlanEndDate: "",
  desiredStartDate: "",
  additionalNotes: "",
  privacyConsent: false,
};

export default function InsureRequest() {
  const [formData, setFormData] = useState<InsureRequestFormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitMutation = trpc.insureRequest.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData(initialFormData);
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to submit. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.privacyConsent) {
      setError("Please acknowledge the privacy notice to continue.");
      return;
    }
    submitMutation.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      state: formData.state,
      numberOfPeople: formData.numberOfPeople,
      tobaccoUse: formData.tobaccoUse,
      preExistingConditions: formData.preExistingConditions,
      preExistingDetails: formData.preExistingDetails || undefined,
      currentInsurance: formData.currentInsurance,
      currentCarrier: formData.currentCarrier || undefined,
      currentPlanEndDate: formData.currentPlanEndDate || undefined,
      desiredStartDate: formData.desiredStartDate,
      additionalNotes: formData.additionalNotes || undefined,
    });
  };

  const update = (k: keyof InsureRequestFormData, v: string | boolean) =>
    setFormData((d) => ({ ...d, [k]: v }));

  if (submitted) {
    return (
      <div className="min-h-screen bg-background/96 text-foreground">
        <SiteHeader />
        <section className="pt-24 md:pt-32 pb-16">
          <div className="container max-w-xl">
            <Card className="border-accent/20 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">Thank You</CardTitle>
                <p className="text-muted-foreground">
                  Your information has been received. A licensed advisor will review your request
                  and contact you within 1–2 business days to discuss your options.
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Link href="/insure">
                  <Button variant="outline" className="w-full">Back to Insurance</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/96 text-foreground">
      <SiteHeader />
      <section className="pt-24 md:pt-32 pb-16">
        <div className="container max-w-2xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-4">
              <Shield className="h-4 w-4" />
              Step 1 of 2 — Quick intake
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Free Quote
            </h1>
            <p className="text-muted-foreground">
              Share a few details so we can match you with the best rates. This typically takes under 3 minutes.
            </p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle>Contact & coverage details</CardTitle>
              <p className="text-sm text-muted-foreground">
                All information is kept confidential and used only to provide quotes.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      placeholder="Jane"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      placeholder="Smith"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jane@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State of residence *</Label>
                  <Select value={formData.state} onValueChange={(v) => update("state", v)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Number of people to insure *</Label>
                  <Select value={formData.numberOfPeople} onValueChange={(v) => update("numberOfPeople", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} {n === 1 ? "person" : "people"}
                        </SelectItem>
                      ))}
                      <SelectItem value="9+">9 or more</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tobacco use (in last 12 months) *</Label>
                  <RadioGroup
                    value={formData.tobaccoUse}
                    onValueChange={(v) => update("tobaccoUse", v)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="tobacco-no" />
                      <Label htmlFor="tobacco-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="tobacco-yes" />
                      <Label htmlFor="tobacco-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Pre-existing conditions? *</Label>
                  <RadioGroup
                    value={formData.preExistingConditions}
                    onValueChange={(v) => update("preExistingConditions", v)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pex-no" />
                      <Label htmlFor="pex-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pex-yes" />
                      <Label htmlFor="pex-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                  </RadioGroup>
                  {formData.preExistingConditions === "yes" && (
                    <Textarea
                      placeholder="Please describe (kept confidential, used only for quoting)"
                      value={formData.preExistingDetails}
                      onChange={(e) => update("preExistingDetails", e.target.value)}
                      className="mt-2"
                      rows={3}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Do you currently have health insurance? *</Label>
                  <RadioGroup
                    value={formData.currentInsurance}
                    onValueChange={(v) => update("currentInsurance", v)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="curr-no" />
                      <Label htmlFor="curr-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="curr-yes" />
                      <Label htmlFor="curr-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                  </RadioGroup>
                  {formData.currentInsurance === "yes" && (
                    <div className="space-y-2 mt-2">
                      <Input
                        placeholder="Current carrier (e.g., UnitedHealthcare)"
                        value={formData.currentCarrier}
                        onChange={(e) => update("currentCarrier", e.target.value)}
                      />
                      <Input
                        type="date"
                        placeholder="Plan end date"
                        value={formData.currentPlanEndDate}
                        onChange={(e) => update("currentPlanEndDate", e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>When do you want coverage to start? *</Label>
                  <Select value={formData.desiredStartDate} onValueChange={(v) => update("desiredStartDate", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {COVERAGE_START_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional notes</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Anything else we should know (e.g., specific coverage needs, preferred start date)"
                    value={formData.additionalNotes}
                    onChange={(e) => update("additionalNotes", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacyConsent"
                    checked={formData.privacyConsent}
                    onCheckedChange={(c) => update("privacyConsent", !!c)}
                  />
                  <Label htmlFor="privacyConsent" className="text-sm text-muted-foreground font-normal cursor-pointer leading-relaxed">
                    By submitting, I consent to be contacted by Freitag Health Insurance and its partners regarding health insurance quotes.
                    My information will be used solely for this purpose in accordance with applicable privacy laws.
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? "Submitting…" : "Submit — Get My Quote"}
                  </Button>
                  <Link href="/insure">
                    <Button type="button" variant="outline">Cancel</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
