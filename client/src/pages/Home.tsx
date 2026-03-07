import { useState } from "react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Users, TrendingUp, CheckCircle, ArrowRight, Target, Zap, Trophy, AlertCircle, Briefcase, DollarSign } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState("");
  const [contactForm, setContactForm] = useState({ firstName: "", lastName: "", email: "", message: "" });

  const submitContactMutation = trpc.contact.submitContact.useMutation({
    onSuccess: () => {
      setContactSubmitted(true);
      setContactForm({ firstName: "", lastName: "", email: "", message: "" });
      setContactError("");
    },
    onError: (err: Error) => {
      setContactError(err.message || "Failed to send message. Please try again.");
    },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError("");
    submitContactMutation.mutate(contactForm);
  };

  return (
    <div className="min-h-screen bg-background/96 text-foreground">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-14 md:pb-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <div className="inline-block mb-3">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                    bg-accent/10 border border-accent/10 text-accent
                    shadow-sm hover:bg-accent/20 hover:shadow-md
                    transition-all duration-200"
                >
                  <Trophy className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-semibold tracking-wide">Join a Winning Team</span>
                </div>
              </div>
              <h1 className="mb-4 leading-tight">
                Build Your Insurance <span className="gradient-text">Career With Us</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-5 leading-relaxed">
                Contact us to see if Health Insurance is the right career for you! Partner with a top-performing insurance leader and get the support, training, and compensation structure you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/apply" className="inline-block">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                    Start Your Application <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <a href="#benefits" className="inline-block">
                  <Button size="lg" variant="outline" className="w-full">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-accent/10 ring-1 ring-black/5">
                <img src="/images/Team_Home_1.avif" alt="Sales Team" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-5 md:py-6" aria-hidden><div className="section-separator" /></div>

      {/* About the Leader Section */}
      <section id="about" className="section-padding section-alt">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <img src="/images/Steph_FG.avif" alt="Stephanie Freitag" className="w-full h-auto object-cover" />
            </div>
            <div>
              <div className="mb-4">
                <div className="divider-accent mb-4" />
                <span className="text-sm font-semibold text-accent uppercase tracking-widest">About the Leader</span>
              </div>
              <h2 className="mb-6">Stephanie - Your Insurance Leadership Partner</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Stephanie has been one of the highest producers in one of the highest-producing offices in the country. As a consistently top agent, she brings proven expertise and a commitment to developing the next generation of insurance professionals.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Top Producer Status</h4>
                    <p className="text-sm text-muted-foreground">Consistently ranked among the highest-producing agents in the country</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">National Network Access</h4>
                    <p className="text-sm text-muted-foreground">Part of a national parent firm with extensive industry connections</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Proven Mentorship</h4>
                    <p className="text-sm text-muted-foreground">Dedicated to building and coaching successful teams</p>
                  </div>
                </div>
              </div>

              <a href="/apply" className="inline-block">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  View Full Credentials
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="py-5 md:py-6" aria-hidden><div className="section-separator" /></div>

      {/* Team Benefits Section */}
      <section id="benefits" className="section-padding">
        <div className="container">
          <div className="text-center mb-20">
            <div className="divider-accent mx-auto mb-4" />
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">Why Join Us</span>
            <h2 className="mt-4 mb-6">Four Pillars of Success</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to build a thriving insurance career with comprehensive training, unlimited earning potential, and a supportive community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: "Become a Domain Master",
                description: "Become an expert in everything sales, insurance, and health. We will give you the tools and knowledge you need to be a successful health insurance sales agent. As part of your training, you will gain the needed certifications as you grow and develop professionally. You will be surrounded by many highly knowledgeable leaders in the industry and build a skillset transferable to other places within the industry."
              },
              {
                icon: Users,
                title: "Be Part of an Extensive Network",
                description: "As a part of a national parent firm, you will have access to an extensive network of other sales agents, leaders, and industry leaders. You will be surrounded by many successful teams and individuals who will put you in the position to succeed. Working directly with one of the consistently top agents in the country."
              },
              {
                icon: TrendingUp,
                title: "Unlimited Earnings Potential",
                description: "There is no cap to your potential earnings - you get out exactly what you put in. With high commissions and a great bonus payout structure, you have the opportunity to make life-changing earnings for you and your family. If you aren't where you'd like to be at the current moment and the rising cost of living, then this opportunity could be for you."
              },
              {
                icon: Zap,
                title: "Mentality & Mindset Training",
                description: "We believe that the right mindset and 'Why' are key to success within the industry. Discover the ability to push yourself to achieve things you never thought possible within your career. We frequently run seminars, training, and other motivational extracurriculars to get you motivated and keep you there."
              }
            ].map((benefit, idx) => (
              <Card key={idx} className="card-hover border-border/80 bg-card/50 hover:border-accent/30">
                <CardHeader>
                  <benefit.icon className="w-10 h-10 text-accent mb-4" />
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="py-5 md:py-6" aria-hidden><div className="section-separator" /></div>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding section-alt">
        <div className="container">
          <div className="text-center mb-20">
            <div className="divider-accent mx-auto mb-4" />
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">Success Stories</span>
            <h2 className="mt-4 mb-6">Hear From Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from agents who have transformed their careers by joining our team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Senior Insurance Agent",
                testimonial: "Joining this team was the best decision for my career. The support and training have helped me triple my income in just two years.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Team Lead",
                testimonial: "The leadership here genuinely cares about their agents' success. I've grown from an individual contributor to leading a team of 8.",
                rating: 5
              },
              {
                name: "Jessica Martinez",
                role: "Insurance Agent",
                testimonial: "The compensation structure is fair and transparent. I love the flexibility and the collaborative culture. Highly recommend!",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="border-border/80 bg-card shadow-sm">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardDescription className="text-foreground mb-4 text-base leading-relaxed">
                    "{testimonial.testimonial}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="py-5 md:py-6" aria-hidden><div className="section-separator" /></div>

      {/* CTA Section - Ready to Transform + Positions Hiring */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-accent/[0.03] to-background">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="mb-6">Ready to Transform Your Career?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              If you are interested in a new career, contact us today! Let's discuss how we can help you achieve your goals and build a thriving insurance business.
            </p>
          </div>

          {/* Positions Hiring */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-10">
              <Briefcase className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">We're Hiring</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Assistant Position */}
              <Card className="card-hover border-border/80 bg-card/50 overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/Team_Home_1.avif"
                    alt="Assistant role - team collaboration"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-xl font-semibold">Assistant</h4>
                    <p className="text-sm text-muted-foreground">Support our team and grow your skills</p>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <ul className="space-y-3 mb-6">
                    {[
                      "Cold calling and lead outreach",
                      "Administrative support",
                      "Launch and manage ad campaigns",
                      "Assist with customer support",
                      "Organize meetings and schedules for leaders",
                    ].map((duty, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        {duty}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Sales Agent Position */}
              <Card className="card-hover border-border/80 bg-card/50 overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/Steph_FG.avif"
                    alt="Sales Agent - commission-based career"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 text-accent font-semibold text-sm mb-1">
                      <DollarSign className="w-4 h-4" />
                      Commission-Based
                    </div>
                    <h4 className="text-xl font-semibold">Sales Agent</h4>
                    <p className="text-sm text-muted-foreground">Unlimited earning potential</p>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <ul className="space-y-3 mb-6">
                    {[
                      "Commission pay — earn what you're worth",
                      "Full training and certification support",
                      "Field leads and make pitches",
                      "Close deals and grow your income",
                      "Provide ongoing customer support",
                      "Manage your own book of clients",
                      "Mentorship from top producers",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/apply" className="inline-block">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="py-5 md:py-6" aria-hidden><div className="section-separator" /></div>

      {/* Contact Us Section */}
      <section id="contact" className="section-padding section-alt">
        <div className="container">
          <div className="text-center mb-16">
            <div className="divider-accent mx-auto mb-4" />
            <h2>Get In Touch Today!</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Send us a message to schedule a health screening or career inquiry
            </p>
          </div>
          <div className="space-y-16">
            <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 md:px-8">
              <h3 className="text-xl font-semibold mb-6">Schedule A Call with me today!</h3>
              {contactSubmitted ? (
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
                  <CheckCircle className="w-14 h-14 text-accent mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Thanks for submitting!</p>
                  <p className="text-muted-foreground text-sm mb-6">
                    We&apos;ll get back to you shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setContactSubmitted(false)}
                    className="bg-accent/10 border-accent/20 hover:bg-accent/20"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5 w-full">
                  {contactError && (
                    <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{contactError}</p>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-firstName">First Name</Label>
                      <Input
                        id="contact-firstName"
                        value={contactForm.firstName}
                        onChange={(e) => setContactForm((p) => ({ ...p, firstName: e.target.value }))}
                        placeholder="First Name"
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-lastName">Last Name</Label>
                      <Input
                        id="contact-lastName"
                        value={contactForm.lastName}
                        onChange={(e) => setContactForm((p) => ({ ...p, lastName: e.target.value }))}
                        placeholder="Last Name"
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="Email"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Message"
                      className="mt-2 min-h-32"
                      required
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      disabled={submitContactMutation.isPending}
                      className="h-12 px-16 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {submitContactMutation.isPending ? "Sending..." : "Send"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
            <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start w-full max-w-7xl mx-auto px-4 md:px-8">
              <div className="md:col-span-2 relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 aspect-video min-h-[240px]">
                <iframe
                  src="https://www.google.com/maps?q=5701+E+Hillsborough+Ave+%231120,+Tampa,+FL+33610&output=embed"
                  title="Office Location - 5701 E Hillsborough Ave #1120, Tampa, FL 33610"
                  className="w-full h-full border-0 rounded-2xl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="md:col-span-3 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Address</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    5701 E Hillsborough Ave #1120<br />
                    Tampa, FL 33610
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>Phone:</strong> <a href="tel:727-249-3807" className="hover:text-accent transition">727-249-3807</a>
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> <a href="mailto:ssfreitaginsurance@gmail.com" className="hover:text-accent transition">ssfreitaginsurance@gmail.com</a>
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-14">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-8 mb-10 text-center md:px-[15%]">
            <div className="md:text-left md:w-1/3 md:min-w-0">
              <h4 className="font-semibold mb-3 text-sm">Contact</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>Email: ssfreitaginsurance@gmail.com</li>
                <li>Phone: 727-249-3807</li>
                <li>Address: 5701 E Hillsborough Ave #1120</li>
                <li>Tampa, FL 33610</li>
              </ul>
            </div>
            <div className="md:w-1/3 md:min-w-0">
              <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#about" className="text-muted-foreground hover:text-accent transition">My Story</a></li>
                <li><a href="#sales" className="text-muted-foreground hover:text-accent transition">Our Services</a></li>
                <li><a href="#benefits" className="text-muted-foreground hover:text-accent transition">Join Us</a></li>
                <li><a href="#testimonials" className="text-muted-foreground hover:text-accent transition">Success Stories</a></li>
                <li><Link href="/apply" className="text-muted-foreground hover:text-accent transition">Apply Now</Link></li>
              </ul>
            </div>
            <div className="md:text-right md:w-1/3 md:min-w-0">
              <h4 className="font-semibold mb-3 text-sm">Follow Us</h4>
              <ul className="space-y-1.5 text-xs inline-block">
                <li>
                  <a href="#" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition">
                    <img src="/images/LinkedIn_Logo.webp" alt="" className="h-5 w-5 object-contain" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition">
                    <img src="/images/Facebook_Icon.png" alt="" className="h-5 w-5 object-contain" />
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition">
                    <img src="/images/Instagram_Logo.jpeg" alt="" className="h-5 w-5 object-contain rounded-sm" />
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
            <p>&copy; 2026 Freitag Health Insurance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
