import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Nouvelle intervention
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Planifiez une nouvelle intervention pour un client et son site.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-center">
            <div className="text-sm text-slate-500">
              Chargement des clients et des sites...
            </div>
          </div>
        </div>
      ) : (
        <JobForm
          customers={customers}
          sites={sites}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitting={submitting}
          submitLabel="Créer l’intervention"
        />
      )}
    </div>
  );
}