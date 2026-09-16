import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  CalendarPlus,
  Loader2,
  RefreshCw,
  Wrench,
} from "lucide-react";

import JobForm from "./JobForm";
import { getCustomers } from "../../services/customers";
import { getSites } from "../../services/sites";
import { createJob } from "../../services/jobs";

function extractCollection(data, key) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.[key])) {
    return data[key];
  }

  return [];
}

function getErrorMessage(error, fallback) {
  const errors = error?.response?.data?.errors;

  if (Array.isArray(errors)) {
    return errors.join(", ");
  }

  if (typeof errors === "string") {
    return errors;
  }

  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  return error?.message || fallback;
}

export default function JobFormPage() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [sites, setSites] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadFormData = async () => {
      setLoading(true);
      setError("");

      try {
        const [customersData, sitesData] = await Promise.all([
          getCustomers(),
          getSites(),
        ]);

        if (!mounted) return;

        setCustomers(extractCollection(customersData, "customers"));
        setSites(extractCollection(sitesData, "sites"));
      } catch (loadError) {
        if (!mounted) return;

        setError(
          getErrorMessage(
            loadError,
            "Impossible de charger les données nécessaires à la création de l’intervention."
          )
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadFormData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (jobData) => {
    setSubmitting(true);
    setError("");

    try {
      await createJob(jobData);
      navigate("/jobs");
    } catch (submitError) {
      const message = getErrorMessage(
        submitError,
        "Impossible de créer l’intervention."
      );

      setError(message);
      throw submitError;
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/jobs");
  };

  const handleBack = () => {
    navigate("/jobs");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            aria-label="Retour aux interventions"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                <CalendarPlus className="h-5 w-5" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
                Interventions
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              Nouvelle intervention
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Planifiez une nouvelle intervention pour un client et son site.
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700 shadow-sm"
        >
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <AlertCircle className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-red-800">
              Impossible de préparer l’intervention
            </p>

            <p className="mt-0.5 leading-5 text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-amber-50/70 via-white to-white px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                <Wrench className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Préparation du formulaire
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Récupération des clients et des sites disponibles
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-h-[240px] flex-col items-center justify-center px-6 py-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-700">
              Chargement des données...
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Clients et sites en cours de récupération
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-amber-50/60 via-white to-white px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                <Wrench className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Détails de l’intervention
                </p>

                <p className="text-xs text-slate-500">
                  Renseignez les informations nécessaires à la planification.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <JobForm
              customers={customers}
              sites={sites}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitting={submitting}
              submitLabel={
                submitting ? "Création en cours..." : "Créer l’intervention"
              }
            />
          </div>
        </div>
      )}

      {/* Loading / submitting hint */}
      {submitting && (
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-500" />
          Enregistrement de l’intervention...
        </div>
      )}
    </div>
  );
}