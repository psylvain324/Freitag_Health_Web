import { useState } from "react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    state: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitLeadMutation = trpc.leads.submitLead.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        experience: "",
        state: "",
        message: ""
      });
      setStep(1);
    },
    onError: (err: any) => {
      setError(err.message || "Failed to submit form. Please try again.");
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name as keyof typeof formData]: value }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setError("Please fill in all required fields");
        return;
      }
      setError("");
      setStep(2);
    } else if (step === 2) {
      if (!formData.phone || !formData.experience || !formData.state) {
        setError("Please fill in all required fields");
        return;
      }
      setError("");
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.experience || !formData.state) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    await submitLeadMutation.mutateAsync(formData);
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
            <CardTitle>Thank You!</CardTitle>
            <CardDescription>Your application has been received</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              We're excited about your interest in joining our team. Our leadership will review your application and contact you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => setSubmitted(false)}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Submit Another Application
              </Button>
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  Return to Home
                </Button>
              </Link>
            </div>
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
        <div className="text-center mb-14">
          <h1 className="mb-4">Join Our Elite Team</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Take the first step towards a rewarding career in insurance. Complete this quick application to get started.
          </p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      s <= step ? "bg-accent" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Step {step} of 3</span>
            </div>
            <CardTitle>
              {step === 1 && "Personal Information"}
              {step === 2 && "Professional Background"}
              {step === 3 && "Tell Us More"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Professional Background */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Insurance Experience *</Label>
                    <Select value={formData.experience} onValueChange={(value: string) => handleSelectChange("experience", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="state">State/Region *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="California"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Additional Information */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="message">Why are you interested in joining our team? *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your goals and what you're looking for in a team..."
                      className="mt-2 min-h-32"
                    />
                  </div>
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Next Steps:</strong> After submitting this form, a member of our team will contact you within 24 hours to schedule a confidential consultation.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                className="flex-1"
              >
                Back
              </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={submitLeadMutation.isPending}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {submitLeadMutation.isPending ? "Submitting..." : "Submit Application"}
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
