import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Headphones,
  Leaf,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { createContactRequest } from "../services/contact";

const requestTypes = [
  "Découvrir GreenPilot",
  "Demander une démonstration",
  "Poser une question",
  "Informations tarifaires",
  "Support",
  "Autre",
];

const reasons = [
  {
    icon: Sparkles,
    title: "Découvrir GreenPilot",
    description:
      "Découvrez comment centraliser la gestion de votre entreprise du paysage et de l’environnement.",
  },
  {
    icon: ArrowRight,
    title: "Demander une démonstration",
    description:
      "Voyez concrètement comment GreenPilot peut simplifier vos clients, devis, chantiers, équipes et factures.",
  },
  {
    icon: MessageSquare,
    title: "Une question ?",
    description:
      "Vous souhaitez en savoir plus sur une fonctionnalité, l’accompagnement ou le fonctionnement de GreenPilot ?",
  },
];

const faqs = [
  {
    question: "À qui s’adresse UseGreenPilot ?",
    answer:
      "GreenPilot est conçu pour les entreprises du paysage, des espaces verts et de l’environnement qui souhaitent centraliser leur gestion.",
  },
  {
    question: "Puis-je demander une démonstration ?",
    answer:
      "Oui. Vous pouvez nous contacter pour découvrir la plateforme et comprendre comment elle peut répondre aux besoins de votre entreprise.",
  },
  {
    question: "Dois-je créer un compte pour contacter GreenPilot ?",
    answer:
      "Non. Vous pouvez nous envoyer votre demande directement depuis cette page.",
  },
  {
    question: "Je suis déjà client GreenPilot, comment obtenir de l’aide ?",
    answer:
      "Si vous utilisez déjà GreenPilot, vous pouvez accéder à votre espace pour retrouver les fonctionnalités et ressources liées à votre compte.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone: "",
    request_type: "Découvrir GreenPilot",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  setSubmitting(true);
  setError("");

  try {
    await createContactRequest(form);

    setSubmitted(true);

    setForm({
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      phone: "",
      request_type: "Découvrir GreenPilot",
      message: "",
    });
  } catch (err) {
    console.error("Contact request error:", err);

    const messages = err.response?.data?.messages;

    if (Array.isArray(messages) && messages.length > 0) {
      setError(messages.join(" "));
    } else {
      setError(
        "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer."
      );
    }
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
              <Leaf className="h-4 w-4" />
              UseGreenPilot
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Parlons de votre entreprise
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Une question, une demande de démonstration ou simplement envie
              d’en savoir plus sur GreenPilot ? Notre équipe est là pour vous
              répondre.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                Demander une démonstration
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="#contact-info"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="bg-slate-50 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Parlons-nous
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Comment pouvons-nous vous aider ?
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Choisissez le sujet qui correspond le mieux à votre besoin.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {reason.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact-form" className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Votre demande
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Échangeons autour de votre activité
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              GreenPilot a été pensé pour rapprocher le bureau, le terrain et
              la gestion de votre entreprise.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Clients et sites centralisés",
                "Devis et facturation simplifiés",
                "Planning et interventions mieux organisés",
                "Équipes et terrain connectés",
                "Suivi de la rentabilité",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div
              id="contact-info"
              className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">
                Vous préférez nous contacter directement ?
              </h3>

              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="h-5 w-5 text-emerald-600" />
                  <span>contact@usegreenpilot.pro</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  <span>Contactez-nous pour être rappelé</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
            {submitted ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  Merci pour votre message
                </h3>

                <p className="mt-3 max-w-md leading-7 text-slate-600">
                  Votre demande a bien été prise en compte. Nous reviendrons
                  vers vous prochainement.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Envoyez-nous votre demande
                  </h2>

                  <p className="mt-2 text-slate-600">
                    Quelques informations suffisent pour commencer.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Prénom *
                      </label>

                      <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        required
                        value={form.first_name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="Jean"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="last_name"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Nom *
                      </label>

                      <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        required
                        value={form.last_name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Email professionnel *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="jean@entreprise.fr"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="company"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Entreprise *
                      </label>

                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={form.company}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="Mon entreprise"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Téléphone
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="06 00 00 00 00"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="request_type"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Votre demande *
                    </label>

                    <select
                      id="request_type"
                      name="request_type"
                      required
                      value={form.request_type}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    >
                      {requestTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Votre message *
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="Expliquez-nous votre besoin..."
                    />
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                    <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <p className="text-sm leading-6 text-slate-600">
                      Nous vous répondons dans les meilleurs délais pendant
                      les jours ouvrés.
                    </p>
                  </div>
                  {error && ( <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {error}
                    </div>
                    )}

                  <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60">
                       {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
                       {!submitting && <Send className="h-5 w-5" />}
                   </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Existing customer */}
      <section className="bg-slate-950 px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Headphones className="h-5 w-5 text-emerald-400" />
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Déjà client ?
              </p>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Vous utilisez déjà GreenPilot ?
            </h2>

            <p className="mt-3 max-w-xl text-slate-400">
              Accédez directement à votre espace pour retrouver vos données et
              gérer votre activité.
            </p>
          </div>

          <a
            href="/login"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Accéder à mon espace
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Questions fréquentes
            </h2>
          </div>

          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-6">
                <summary className="cursor-pointer list-none pr-8 font-semibold text-slate-900 marker:hidden">
                  {faq.question}
                </summary>

                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}