
import { useState } from "react";
import { CheckCircle, Terminal, Users, Wrench } from "lucide-react";

const perks = [
  { icon: Terminal, title: "Access to Club Hardware Lab", desc: "Oscilloscopes, soldering stations, 3D printers, a full shelf of dev boards." },
  { icon: Users, title: "Mentorship Program", desc: "Get paired with an experienced member who's been where you are." },
  { icon: Wrench, title: "Free Workshop Entry", desc: "Every official club workshop is free for members — usually $30–60 outside." },
  { icon: CheckCircle, title: "GitHub Org & Discord Access", desc: "Collaborate on projects, see what's being built, jump in anywhere." },
];

export function JoinPage() {
  const [form, setForm] = useState({ name: "", email: "", major: "", experience: "", motivation: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="pt-28 pb-16 px-6"
        style={{ borderBottom: "1px solid rgba(0,212,255,0.1)" }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="mb-3 tracking-widest uppercase"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00d4ff" }}
          >
            — Apply
          </p>
          <h1
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "2.5rem", color: "#e8edf2", lineHeight: 1.1 }}
          >
            Join the Club
          </h1>
          <p className="mt-4 max-w-xl" style={{ color: "#6b7a8d", lineHeight: 1.7 }}>
            No prior experience required. We welcome everyone from curious beginners to seasoned embedded devs.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Perks */}
        <div>
          <h2
            className="mb-8"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.3rem", color: "#e8edf2" }}
          >
            What you get
          </h2>
          <div className="flex flex-col gap-5">
            {perks.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)", borderRadius: "4px", border: "1px solid rgba(0,212,255,0.2)" }}
                  >
                    <Icon size={16} style={{ color: "#00d4ff" }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.875rem", color: "#e8edf2", fontWeight: 700 }}>
                      {p.title}
                    </h3>
                    <p className="mt-1" style={{ fontSize: "0.825rem", color: "#6b7a8d", lineHeight: 1.6 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-12 p-6"
            style={{
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: "4px",
            }}
          >
            <p
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#00d4ff", marginBottom: "0.5rem" }}
            >
              Membership Fee
            </p>
            <p style={{ fontSize: "2rem", fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#e8edf2" }}>
              $0 / semester
            </p>
            <p className="mt-2" style={{ fontSize: "0.825rem", color: "#6b7a8d" }}>
              Covers lab materials, snacks at meetings, and the club's hardware fund. No fee in your first semester.
            </p>
          </div>
        </div>

        {/* Application form */}
        <div>
          {submitted ? (
            <div
              className="h-full flex flex-col items-center justify-center text-center p-10"
              style={{ background: "#0e1520", border: "1px solid rgba(0,212,255,0.25)", borderRadius: "4px" }}
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full mb-6"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.4)" }}
              >
                <CheckCircle size={28} style={{ color: "#00d4ff" }} />
              </div>
              <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.25rem", color: "#e8edf2", marginBottom: "0.75rem" }}>
                Application received!
              </h2>
              <p style={{ color: "#6b7a8d", lineHeight: 1.7 }}>
                We'll review your application and reach out to <strong style={{ color: "#e8edf2" }}>{form.email}</strong> within 5 business days. Check your spam folder too.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              style={{ background: "#0e1520", border: "1px solid rgba(0,212,255,0.12)", borderRadius: "4px", padding: "2rem" }}
            >
              <h2
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "1rem", color: "#e8edf2", marginBottom: "0.5rem" }}
              >
                Apply for membership
              </h2>

              {[
                { name: "name", label: "Full Name", type: "text", placeholder: "Ada Lovelace" },
                { name: "email", label: "Email Address", type: "email", placeholder: "ada@university.edu" },
                { name: "major", label: "Major / Program", type: "text", placeholder: "e.g. Computer Engineering" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7a8d", display: "block", marginBottom: "6px" }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      background: "#111827",
                      border: "1px solid rgba(0,212,255,0.15)",
                      borderRadius: "2px",
                      padding: "0.625rem 0.875rem",
                      color: "#e8edf2",
                      fontSize: "0.875rem",
                      outline: "none",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.15)")}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="experience"
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7a8d", display: "block", marginBottom: "6px" }}
                >
                  Experience Level
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    background: "#111827",
                    border: "1px solid rgba(0,212,255,0.15)",
                    borderRadius: "2px",
                    padding: "0.625rem 0.875rem",
                    color: form.experience ? "#e8edf2" : "#6b7a8d",
                    fontSize: "0.875rem",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  <option value="" disabled>Select your level</option>
                  <option value="beginner">Beginner — little to no hardware experience</option>
                  <option value="intermediate">Intermediate — built a few projects</option>
                  <option value="advanced">Advanced — comfortable with embedded systems</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="motivation"
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7a8d", display: "block", marginBottom: "6px" }}
                >
                  Why do you want to join? (2–3 sentences)
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={form.motivation}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us what excites you about IoT and what you'd like to build."
                  style={{
                    width: "100%",
                    background: "#111827",
                    border: "1px solid rgba(0,212,255,0.15)",
                    borderRadius: "2px",
                    padding: "0.625rem 0.875rem",
                    color: "#e8edf2",
                    fontSize: "0.875rem",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.6,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.15)")}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 transition-all duration-200 hover:brightness-110"
                style={{
                  background: "#00d4ff",
                  color: "#080c10",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  borderRadius: "2px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
