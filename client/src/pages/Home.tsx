import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, TrendingUp, CheckCircle, ArrowRight, Target, Zap } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar effects
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur shadow-sm" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold gradient-text">Freitag Health Insurance</div>
          <div className="hidden md:flex gap-1">
            <a href="#about" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-200">About</a>
            <a href="#sales" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-200">Our Services</a>
            <a href="#benefits" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-200">Why Join</a>
            <a href="#testimonials" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-200">Success Stories</a>
            <a href="#contact" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-200">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/QAp5dBwcR69Bs4yRELPLtH/tampa_skyline_hero_f0df03fc.webp')",
            opacity: 0.3
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-background pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full">
                <span className="text-sm font-semibold text-accent">Join a Winning Team</span>
              </div>
              <h1 className="mb-6 leading-tight">
                Build Your Insurance <span className="gradient-text">Career With Us</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Contact us to see if Health Insurance is the right career for you! Partner with a top-performing insurance leader and get the support, training, and compensation structure you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/apply" className="inline-block">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                    Start Your Application <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <a href="#benefits" className="inline-block">
                  <Button size="lg" variant="outline" className="w-full">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-2xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-accent/10 to-blue-500/10 rounded-2xl p-8 border border-accent/20">
                <img src="./images/Steph_FG.avif" alt="Tampa Skyline" className="w-full h-auto rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Leader Section */}
      <section id="about" className="section-padding bg-card/50 border-y border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-accent/5 to-blue-500/5 rounded-2xl p-8 border border-accent/20">
              <img src="./images/Steph_FG.avif" alt="Stephanie Freitag" className="w-full h-auto rounded-xl" />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <div className="divider-accent mb-4" />
                <span className="text-sm font-semibold text-accent uppercase tracking-wide">About the Leader</span>
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

      {/* Team Benefits Section */}
      <section id="benefits" className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <div className="divider-accent mx-auto mb-4" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">Why Join Us</span>
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
              <Card key={idx} className="card-hover border-accent/20 hover:border-accent/50 bg-card/50">
                <CardHeader>
                  <benefit.icon className="w-12 h-12 text-accent mb-4" />
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

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-card/50 border-y border-border">
        <div className="container">
          <div className="text-center mb-16">
            <div className="divider-accent mx-auto mb-4" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">Success Stories</span>
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
              <Card key={idx} className="border-accent/20 bg-background">
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

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
        <div className="container relative z-10 text-center">
          <h2 className="mb-6">Ready to Transform Your Career?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you are interested in a new career, contact us today! Let's discuss how we can help you achieve your goals and build a thriving insurance business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/apply" className="inline-block">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="section-padding bg-card/50 border-y border-border">
        <div className="container">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2>Get In Touch</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-3xl" />
            </div>
            <div>
              <div className="space-y-8">
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
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Freitag Health Insurance</h4>
              <p className="text-sm text-muted-foreground">Building successful careers in health insurance since 2010. Located in Tampa, Florida.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-muted-foreground hover:text-accent transition">About</a></li>
                <li><a href="#sales" className="text-muted-foreground hover:text-accent transition">Our Services</a></li>
                <li><a href="#benefits" className="text-muted-foreground hover:text-accent transition">Why Join</a></li>
                <li><a href="#testimonials" className="text-muted-foreground hover:text-accent transition">Success Stories</a></li>
                <li><a href="/apply" className="text-muted-foreground hover:text-accent transition">Apply Now</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: ssfreitaginsurance@gmail.com</li>
                <li>Phone: 727-249-3807</li>
                <li>Address: 5701 E Hillsborough Ave #1120</li>
                <li>Tampa, FL 33610</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-accent transition">LinkedIn</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent transition">Facebook</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent transition">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Freitag Health Insurance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
