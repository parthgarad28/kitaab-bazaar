import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  Award,
  Phone,
  MapPin,
  Mail,
  CheckCircle2,
  Sparkles,
  Target,
  Heart,
  MessageCircle,
} from "lucide-react";

const PHONE = "+91 98765 43210";
const WHATSAPP = "919876543210";
const ADDRESS = "Near Kranti Chowk, Aurangabad, Maharashtra 431001";

const LandingPage = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const learn = [
    { icon: BookOpen, title: "Complete 10th Syllabus", desc: "Full coverage of Maharashtra Board Sanskrit textbook — every chapter, every shloka." },
    { icon: Sparkles, title: "Easy Grammar (Vyakaran)", desc: "Sandhi, Samaas, Kaarak, Vibhakti — explained in simple Marathi & English." },
    { icon: Target, title: "Translation Tricks", desc: "Step-by-step methods for Sanskrit to Marathi/English translation that actually work." },
    { icon: Award, title: "Board Paper Pattern", desc: "Solve previous years, sample papers, and master the exact marking scheme." },
    { icon: GraduationCap, title: "Shlokas & Subhashitas", desc: "Memorise with meaning — pronunciation, context, and exam-ready answers." },
    { icon: CheckCircle2, title: "Weekly Tests & Revision", desc: "Regular tests, doubt-clearing sessions, and personal feedback for every student." },
  ];

  const why = [
    { icon: Award, title: "15+ Years of Teaching", desc: "Sulbha Ma'am has guided hundreds of 10th students to score 90+ in Sanskrit." },
    { icon: Users, title: "Small Batches", desc: "Maximum 15 students per batch — every doubt is heard, every student is known." },
    { icon: Heart, title: "Patient & Friendly", desc: "A warm classroom where students feel free to ask anything, any number of times." },
    { icon: Target, title: "Result Focused", desc: "Structured tests, regular parent updates, and a clear path to top marks." },
  ];

  const batches = [
    { name: "Morning Batch", time: "7:00 AM – 8:30 AM", days: "Mon, Wed, Fri", seats: "Limited seats" },
    { name: "Evening Batch", time: "5:00 PM – 6:30 PM", days: "Tue, Thu, Sat", seats: "Filling fast" },
    { name: "Sunday Crash Course", time: "9:00 AM – 12:00 PM", days: "Sundays only", seats: "Pre-board revision" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/85 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-base sm:text-lg font-extrabold leading-tight text-left">
              Sulbha's <span className="text-gradient">Sanskrit Classes</span>
            </span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {[
              { id: "about", label: "About" },
              { id: "learn", label: "Syllabus" },
              { id: "batches", label: "Batches" },
              { id: "why", label: "Why Us" },
              { id: "contact", label: "Contact" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
          <Button size="sm" className="gradient-primary text-primary-foreground border-0 font-bold" onClick={() => scrollTo("contact")}>
            Enquire
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative overflow-hidden gradient-hero py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
        <div className="container relative grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/20 backdrop-blur px-3 py-1 text-xs font-bold text-primary-foreground mb-4">
              <Sparkles className="h-3.5 w-3.5" /> 10th Std • Maharashtra Board
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-primary-foreground leading-tight mb-4 animate-fade-in">
              Score High in Sanskrit. <br />
              <span className="text-primary-foreground/90">The Easy Way.</span>
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/90 mb-6 max-w-lg mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Specialised coaching for Class 10 students in Aurangabad — by Sulbha Ma'am, with 15+ years of board-exam experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" variant="secondary" className="font-bold gap-2 shadow-elevated text-foreground" onClick={() => scrollTo("contact")}>
                <Phone className="h-4 w-4" /> Book a Free Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold gap-2 border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:text-primary-foreground"
                onClick={() => scrollTo("batches")}
              >
                View Batches
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-sm text-primary-foreground/90">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> 500+ Students Taught</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> 90+ Avg Score</span>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-primary-foreground/20 to-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/30 p-8 flex flex-col items-center justify-center text-center shadow-elevated animate-float">
              <div className="text-7xl mb-3">📖</div>
              <p className="text-2xl font-black text-primary-foreground mb-1">संस्कृत</p>
              <p className="text-primary-foreground/80 font-semibold">सरलं • सुलभं • सुस्पष्टम्</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Teacher */}
      <section id="about" className="container py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2">
            <div className="aspect-square max-w-xs mx-auto rounded-3xl bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center shadow-card border border-primary/20">
              <div className="text-center p-8">
                <div className="text-8xl mb-3">👩‍🏫</div>
                <p className="text-xl font-black text-foreground">Sulbha Ma'am</p>
                <p className="text-sm text-muted-foreground">M.A. Sanskrit, B.Ed.</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <span className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold mb-3">
              Meet Your Teacher
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Making Sanskrit Simple for <span className="text-gradient">Every Student</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sulbha Ma'am is a passionate Sanskrit teacher with over <strong className="text-foreground">15 years of experience</strong> coaching Maharashtra Board 10th-standard students in Aurangabad. Her teaching style breaks down even the toughest grammar into easy, memorable steps.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether your child finds Sanskrit difficult or wants to top the board exam, her structured method, weekly tests, and personal attention have helped hundreds of students score <strong className="text-foreground">90+ marks</strong>.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { num: "15+", label: "Years Teaching" },
                { num: "500+", label: "Students Coached" },
                { num: "90+", label: "Average Score" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-card border border-border p-4 text-center shadow-card">
                  <p className="text-2xl font-black text-gradient">{s.num}</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section id="learn" className="bg-secondary/40 py-16 md:py-24 border-y border-border">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold mb-3">
              10th Std Syllabus
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              What You Will Learn
            </h2>
            <p className="text-muted-foreground">
              Complete board-aligned coverage designed to maximise your marks in the SSC Sanskrit paper.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {learn.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batches */}
      <section id="batches" className="container py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold mb-3">
            Schedule
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Batch Details</h2>
          <p className="text-muted-foreground">
            Choose a batch that fits your school timings. New batches start every June.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {batches.map((b, i) => (
            <div
              key={i}
              className="relative rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-elevated transition-all"
            >
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-bold mb-4">
                <Clock className="h-3.5 w-3.5" /> {b.days}
              </div>
              <h3 className="text-xl font-extrabold mb-1">{b.name}</h3>
              <p className="text-2xl font-black text-gradient mb-3">{b.time}</p>
              <p className="text-sm text-muted-foreground mb-5">{b.seats}</p>
              <Button className="w-full gradient-primary text-primary-foreground border-0 font-bold" onClick={() => scrollTo("contact")}>
                Enrol Now
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-accent/50 border border-primary/20 p-5 text-center">
          <p className="text-sm text-foreground">
            <strong>Personal/Home Tuitions also available</strong> on request. Reasonable fees, sibling discounts offered.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="bg-secondary/40 py-16 md:py-24 border-y border-border">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              Why Parents & Students Trust Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {why.map((item, i) => (
              <div key={i} className="flex gap-4 rounded-2xl bg-card border border-border p-6 shadow-card">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-primary">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          <div>
            <span className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold mb-3">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              Ready to <span className="text-gradient">Score Top Marks?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Call us, message on WhatsApp, or visit the classroom for a free demo session. We'd love to meet you.
            </p>
            <div className="space-y-4">
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary transition-colors">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Call Us</p>
                  <p className="text-sm text-muted-foreground">{PHONE}</p>
                </div>
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary transition-colors">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">{PHONE}</p>
                </div>
              </a>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Visit Us</p>
                  <p className="text-sm text-muted-foreground">{ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>

          <form
            className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-card space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              toast.success("Thank you! We'll get back to you within 24 hours.");
              form.reset();
            }}
          >
            <h3 className="text-xl font-extrabold mb-2">Book a Free Demo</h3>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Student Name</label>
              <input required className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Full name" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Parent's Phone</label>
              <input required type="tel" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="10-digit mobile number" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Preferred Batch</label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Morning (7:00 AM)</option>
                <option>Evening (5:00 PM)</option>
                <option>Sunday Crash Course</option>
                <option>Home Tuition</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Message (optional)</label>
              <textarea rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Anything you'd like to share..." />
            </div>
            <Button type="submit" size="lg" className="w-full gradient-primary text-primary-foreground border-0 font-bold">
              Request Demo Class
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-extrabold">
              Sulbha's <span className="text-gradient">Sanskrit Classes</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{ADDRESS}</p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sulbha's Sanskrit Classes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
