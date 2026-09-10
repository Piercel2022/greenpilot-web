import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Euro,
  FileText,
  MapPin,
  TrendingUp,
} from "lucide-react";

function ResultSection() {
  return (
    <section className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Une seule vision de votre activité
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              De la première demande à la rentabilité, tout est connecté.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              GreenPilot relie vos clients, vos devis, vos équipes, vos
              chantiers et votre facturation pour vous permettre de piloter
              votre activité avec une vision claire, au même endroit.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Vue d'ensemble
                </span>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Activité du mois
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      28 450 €
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +12,4 %
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-slate-500">
                        Interventions
                      </p>
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                    </div>

                    <p className="mt-3 text-xl font-bold text-slate-900">
                      42
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      cette semaine
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-slate-500">
                        Devis en cours
                      </p>
                      <FileText className="h-4 w-4 text-slate-400" />
                    </div>

                    <p className="mt-3 text-xl font-bold text-slate-900">
                      8 920 €
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      à relancer
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Activité terrain
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Interventions du jour
                      </p>
                    </div>

                    <MapPin className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">
                            Entretien résidence Martin
                          </p>
                          <p className="text-xs text-slate-500">
                            Équipe 01 · Terminé
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 text-xs font-medium text-slate-500">
                        09:30
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                          <MapPin className="h-4 w-4 text-slate-500" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">
                            Taille de haie · Dupont
                          </p>
                          <p className="text-xs text-slate-500">
                            Équipe 02 · En cours
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 text-xs font-medium text-slate-500">
                        14:00
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                      <Euro className="h-4 w-4 text-emerald-400" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Facturation à venir
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-white">
                        6 240 €
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-emerald-100/60 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultSection;
