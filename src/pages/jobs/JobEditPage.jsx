import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";

import JobForm from "./JobForm";
import { getCustomers } from "../../services/customers";
import { getSites } from "../../services/sites";
import { getJob, updateJob } from "../../services/jobs";

function extractCollection(data, key) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
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

function extractDate(dateTime) {
  if (!dateTime) return "";

  return String(dateTime).slice(0, 10);
}

function extractTime(dateTime) {
  if (!dateTime) return "";

  const value = String(dateTime);
  const timePart = value.includes("T")
    ? value.split("T")[1]
    : value.split(" ")[1];

  return timePart ? timePart.slice(0, 5) : "";
}

function buildInitialValues(job) {
  return {
    customer_id: job.customer_id || "",
    site_id: job.site_id || "",
    title: job.title || "",
    description: job.description || "",
    job_type: job.job_type || "",
    status: job.status || "planned",
    priority: job.priority || "normal",
    scheduled_date: extractDate(job.scheduled_date),
    scheduled_start_at: extractTime(job.scheduled_start_at),
    scheduled_end_at: extractTime(job.scheduled_end_at),
    estimated_duration_minutes:
      job.estimated_duration_minutes ?? "",
    address: job.address || "",
    latitude: job.latitude ?? "",
    longitude: job.longitude ?? "",
    customer_notes: job.customer_notes || "",
    internal_notes: job.internal_notes || "",
    weather_notes: job.weather_notes || "",
    weather_risk: job.weather_risk || "unknown",
  };
}

 function JobEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
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
        const [jobData, customersData, sitesData] = await Promise.all([
          getJob(id),
          getCustomers(),
          getSites(),
        ]);

        if (!mounted) return;

        setJob(jobData?.job || jobData);
        setCustomers(extractCollection(customersData, "customers"));
        setSites(extractCollection(sitesData, "sites"));
      } catch (loadError) {
        if (!mounted) return;

        setError(
          getErrorMessage(
            loadError,
            "Impossible de charger l’intervention.",
          ),
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
  }, [id]);

  const handleSubmit = async (jobData) => {
    setSubmitting(true);
    setError("");

    try {
      await updateJob(id, jobData);
      navigate(`/jobs/${id}`);
    } catch (submitError) {
      const message = getErrorMessage(
        submitError,
        "Impossible de modifier l’intervention.",
      );

      setError(message);
      throw submitError;
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/jobs/${id}`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate(`/jobs/${id}`)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l’intervention
        </button>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="mx-auto h-6 w-6 animate-spin text-slate-400" />

              <p className="mt-3 text-sm text-slate-500">
                Chargement de l’intervention...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/jobs")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au planning
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-700">
            {error || "Intervention introuvable."}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            <RefreshCw className="h-4 w-4" />
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate(`/jobs/${id}`)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l’intervention
        </button>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
          Modifier l’intervention
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Modifiez les informations de l’intervention puis enregistrez les
          changements.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <JobForm
        customers={customers}
        sites={sites}
        initialValues={buildInitialValues(job)}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitting={submitting}
        submitLabel="Enregistrer les modifications"
      />
    </div>
  );
}
export default JobEditPage;