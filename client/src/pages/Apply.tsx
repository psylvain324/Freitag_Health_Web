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
import { CheckCircle, AlertCircle, Plus, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const POSITIONS = ["Assistant", "Agent"] as const;
const MARITAL_OPTIONS = ["Single", "Married", "Divorced", "Widowed", "Domestic Partnership"] as const;
const ELIGIBILITY_OPTIONS = ["U.S. Citizen", "Permanent Resident", "Work Authorization"] as const;
const EDUCATION_OPTIONS = [
  "High School",
  "Some College",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Other",
] as const;

const AVAILABILITY_OPTIONS = [
  "Full-time",
  "Part-time",
  "Weekdays",
  "Weekends",
  "Flexible",
] as const;

type EmploymentEntry = {
  employer: string;
  title: string;
  dates: string;
  duties: string;
};

type ReferenceEntry = {
  name: string;
  relationship: string;
  phone: string;
  email: string;
};

function formatApplicationMessage(data: ApplyFormData): string {
  const lines: string[] = [
    "=== JOB APPLICATION ===",
    "",
    `Position: ${data.position}`,
    "",
    "--- Personal Information ---",
    `Name: ${data.firstName} ${data.lastName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Address: ${data.address}`,
    `Age 19+: ${data.ageConfirmed ? "Yes" : "No"}`,
    `Marital Status: ${data.maritalStatus}`,
    `Work Eligibility: ${data.workEligibility}`,
    `Availability: ${data.availability}`,
    `Highest Education: ${data.education}`,
    "",
    "--- Employment History ---",
    ...data.employmentHistory.map(
      (e, i) =>
        `${i + 1}. ${e.employer} | ${e.title} | ${e.dates}\n   ${e.duties}`
    ),
    "",
    "--- References ---",
    ...data.references.map(
      (r, i) =>
        `${i + 1}. ${r.name} (${r.relationship}) | ${r.phone} | ${r.email}`
    ),
    "",
    "--- Documents ---",
    `Resume: ${data.resumeFile?.name ?? "Not provided"}`,
    `Cover Letter: ${data.coverLetterFile?.name ?? "Not provided"}`,
  ];
  return lines.join("\n");
}

type ApplyFormData = {
  position: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  ageConfirmed: boolean;
  maritalStatus: string;
  workEligibility: string;
  availability: string;
  education: string;
  employmentHistory: EmploymentEntry[];
  references: ReferenceEntry[];
  resumeFile: File | null;
  coverLetterFile: File | null;
};

const initialEmployment: EmploymentEntry = {
  employer: "",
  title: "",
  dates: "",
  duties: "",
};

const initialReference: ReferenceEntry = {
  name: "",
  relationship: "",
  phone: "",
  email: "",
};

export default function Apply() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ApplyFormData>({
    position: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    ageConfirmed: false,
    maritalStatus: "",
    workEligibility: "",
    availability: "",
    education: "",
    employmentHistory: [{ ...initialEmployment }],
    references: [{ ...initialReference }],
    resumeFile: null,
    coverLetterFile: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitMutation = trpc.contact.submitContact.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to submit application. Please try again.");
    },
  });

  const update = (updates: Partial<ApplyFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const addEmployment = () => {
    update({
      employmentHistory: [...formData.employmentHistory, { ...initialEmployment }],
    });
  };

  const removeEmployment = (i: number) => {
    if (formData.employmentHistory.length <= 1) return;
    update({
      employmentHistory: formData.employmentHistory.filter((_, idx) => idx !== i),
    });
  };

  const updateEmployment = (i: number, field: keyof EmploymentEntry, value: string) => {
    const next = [...formData.employmentHistory];
    next[i] = { ...next[i], [field]: value };
    update({ employmentHistory: next });
  };

  const addReference = () => {
    update({
      references: [...formData.references, { ...initialReference }],
    });
  };

  const removeReference = (i: number) => {
    if (formData.references.length <= 1) return;
    update({
      references: formData.references.filter((_, idx) => idx !== i),
    });
  };

  const updateReference = (i: number, field: keyof ReferenceEntry, value: string) => {
    const next = [...formData.references];
    next[i] = { ...next[i], [field]: value };
    update({ references: next });
  };

  const validateStep = (s: number): boolean => {
    setError("");
    if (s === 1) {
      const ok =
        formData.position &&
        formData.firstName &&
        formData.lastName &&
        formData.phone &&
        formData.email &&
        formData.address &&
        formData.ageConfirmed;
      if (!ok) {
        setError("Please complete all required fields and confirm you are 19 or older.");
        return false;
      }
    }
    if (s === 2) {
      const ok =
        formData.maritalStatus &&
        formData.workEligibility &&
        formData.availability &&
        formData.education;
      if (!ok) {
        setError("Please complete all required fields.");
        return false;
      }
    }
    if (s === 3) {
      const empOk = formData.employmentHistory.every(
        (e) => e.employer && e.title && e.dates
      );
      const refOk = formData.references.every(
        (r) => r.name && r.relationship && r.phone && r.email
      );
      if (!empOk || !refOk) {
        setError("Please complete all employment and reference fields.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(4, s + 1));
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setError("");
    const message = formatApplicationMessage(formData);
    await submitMutation.mutateAsync({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="flex items-center justify-center pt-32 pb-16 px-4">
          <Card className="max-w-md w-full border-border shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-accent" />
              </div>
              <CardTitle>Application Received</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Thank you for applying. Our team will review your application and
                contact you within a few business days.
              </p>
              <Link href="/">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Return to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container max-w-2xl pt-32 pb-20">
        <div className="text-center mb-10">
          <h1 className="mb-4">Apply for a Position</h1>
          <p className="text-lg text-muted-foreground">
            Join our team. Complete the application below.
          </p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full transition-colors min-w-[40px] ${
                      s <= step ? "bg-accent" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Step {step} of 4</span>
            </div>
            <CardTitle>
              {step === 1 && "Position & Contact"}
              {step === 2 && "Background & Availability"}
              {step === 3 && "Employment & References"}
              {step === 4 && "Documents & Submit"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label>Position Applying For *</Label>
                    <RadioGroup
                      value={formData.position}
                      onValueChange={(v) => update({ position: v })}
                      className="flex gap-6 mt-2"
                    >
                      {POSITIONS.map((p) => (
                        <div key={p} className="flex items-center gap-2">
                          <RadioGroupItem value={p} id={`pos-${p}`} />
                          <Label htmlFor={`pos-${p}`} className="font-normal cursor-pointer">
                            {p}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => update({ firstName: e.target.value })}
                        placeholder="John"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => update({ lastName: e.target.value })}
                        placeholder="Doe"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => update({ phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => update({ email: e.target.value })}
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Current Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => update({ address: e.target.value })}
                      placeholder="Street, City, State, ZIP"
                      className="mt-2 min-h-[80px]"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="ageConfirm"
                      checked={formData.ageConfirmed}
                      onCheckedChange={(c) => update({ ageConfirmed: !!c })}
                    />
                    <Label htmlFor="ageConfirm" className="font-normal cursor-pointer">
                      I confirm I am 19 years of age or older *
                    </Label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label>Marital Status *</Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(v) => update({ maritalStatus: v })}
                    >
                      <SelectTrigger className="mt-2 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {MARITAL_OPTIONS.map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Work Eligibility *</Label>
                    <Select
                      value={formData.workEligibility}
                      onValueChange={(v) => update({ workEligibility: v })}
                    >
                      <SelectTrigger className="mt-2 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {ELIGIBILITY_OPTIONS.map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Availability *</Label>
                    <Select
                      value={formData.availability}
                      onValueChange={(v) => update({ availability: v })}
                    >
                      <SelectTrigger className="mt-2 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABILITY_OPTIONS.map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Highest Level of Education *</Label>
                    <Select
                      value={formData.education}
                      onValueChange={(v) => update({ education: v })}
                    >
                      <SelectTrigger className="mt-2 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_OPTIONS.map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>Employment History *</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addEmployment}>
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {formData.employmentHistory.map((entry, i) => (
                        <div
                          key={i}
                          className="p-4 border border-border rounded-lg space-y-3 relative"
                        >
                          {formData.employmentHistory.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeEmployment(i)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Employer</Label>
                              <Input
                                value={entry.employer}
                                onChange={(e) =>
                                  updateEmployment(i, "employer", e.target.value)
                                }
                                placeholder="Company name"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Job Title</Label>
                              <Input
                                value={entry.title}
                                onChange={(e) =>
                                  updateEmployment(i, "title", e.target.value)
                                }
                                placeholder="Your title"
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs">Dates</Label>
                            <Input
                              value={entry.dates}
                              onChange={(e) =>
                                updateEmployment(i, "dates", e.target.value)
                              }
                              placeholder="e.g. Jan 2020 - Present"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Key Duties</Label>
                            <Textarea
                              value={entry.duties}
                              onChange={(e) =>
                                updateEmployment(i, "duties", e.target.value)
                              }
                              placeholder="Brief description"
                              className="mt-1 min-h-[60px]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>References *</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addReference}>
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {formData.references.map((ref, i) => (
                        <div
                          key={i}
                          className="p-4 border border-border rounded-lg space-y-3 relative"
                        >
                          {formData.references.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeReference(i)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Name</Label>
                              <Input
                                value={ref.name}
                                onChange={(e) =>
                                  updateReference(i, "name", e.target.value)
                                }
                                placeholder="Reference name"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Relationship</Label>
                              <Input
                                value={ref.relationship}
                                onChange={(e) =>
                                  updateReference(i, "relationship", e.target.value)
                                }
                                placeholder="e.g. Former Supervisor"
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Phone</Label>
                              <Input
                                type="tel"
                                value={ref.phone}
                                onChange={(e) =>
                                  updateReference(i, "phone", e.target.value)
                                }
                                placeholder="Phone number"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Email</Label>
                              <Input
                                type="email"
                                value={ref.email}
                                onChange={(e) =>
                                  updateReference(i, "email", e.target.value)
                                }
                                placeholder="Email"
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="resume">Resume (PDF, DOC, DOCX)</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        update({
                          resumeFile: e.target.files?.[0] ?? null,
                        })
                      }
                      className="mt-2"
                    />
                    {formData.resumeFile && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Selected: {formData.resumeFile.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="coverLetter">Cover Letter (optional)</Label>
                    <Input
                      id="coverLetter"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        update({
                          coverLetterFile: e.target.files?.[0] ?? null,
                        })
                      }
                      className="mt-2"
                    />
                    {formData.coverLetterFile && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Selected: {formData.coverLetterFile.name}
                      </p>
                    )}
                  </div>

                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Your application will be sent to our team. Resume and cover
                      letter filenames are included; file attachments require
                      backend integration to be stored.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                    Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
