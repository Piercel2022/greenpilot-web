import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Landmark,
  Pencil,
  Receipt,
  ReceiptText,
  Trash2,
  UserRound,
} from "lucide-react";

import { getCustomers } from "../../services/customers";
import { getSites } from "../../services/sites";
import { getQuotes } from "../../services/quotes";
import { getJobs } from "../../services/jobs";
import {
  deleteInvoice,
  downloadInvoicePdf,
  getInvoice,
} from "../../services/invoices";
import { getInvoiceItems } from "../../services/invoiceItems";

function extractCollection(data, key) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.[key])) {
    return data[key];
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function toNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function formatMoney(value) {
  return `${toNumber(value).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
}

function formatDate(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("fr-FR");
}

function getCustomerName(customer) {
  if (!customer) {
    return "—";
  }

  if (customer.name) {
    return customer.name;
  }

  if (customer.company_name) {
    return customer.company_name;
  }

  const fullName = [
    customer.first_name,
    customer.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  return fullName || "—";
}

function getSiteName(site) {
  return site?.name || "—";
}

function getQuoteLabel(quote) {
  if (!quote) {
    return "—";
  }

  return (
    quote.number ||
    quote.reference ||
    quote.title ||
    `Devis #${quote.id}`
  );
}

function getJobLabel(job) {
  if (!job) {
    return "—";
  }

  return (
    job.title ||
    job.name ||
    job.reference ||
    `Job #${job.id}`
  );
}

const statusLabel = {
  draft: "Brouillon",
  issued: "Émise",
  sent: "Envoyée",
  paid: "Payée",
  overdue: "En retard",
  cancelled: "Annulée",
};

export default function InvoiceShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sites, setSites] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const [
          invoiceData,
          invoiceItemsData,
          customersData,
          sitesData,
          quotesData,
          jobsData,
        ] = await Promise.all([
          getInvoice(id),
          getInvoiceItems(),
          getCustomers(),
          getSites(),
          getQuotes(),
          getJobs(),
        ]);

        if (cancelled) {
          return;
        }

        setInvoice(invoiceData);

        const allInvoiceItems = extractCollection(
          invoiceItemsData,
          "invoice_items"
        );

        setInvoiceItems(
          allInvoiceItems
            .filter(
              (item) =>
                String(item.invoice_id) === String(id)
            )
            .sort(
              (a, b) =>
                toNumber(a.position) -
                toNumber(b.position)
            )
        );

        setCustomers(
          extractCollection(
            customersData,
            "customers"
          )
        );

        setSites(
          extractCollection(
            sitesData,
            "sites"
          )
        );

        setQuotes(
          extractCollection(
            quotesData,
            "quotes"
          )
        );

        setJobs(
          extractCollection(
            jobsData,
            "jobs"
          )
        );
      } catch (requestError) {
        console.error(requestError);

        const messages =
          requestError?.response?.data?.messages;

        setError(
          Array.isArray(messages)
            ? messages.join(", ")
            : "Impossible de charger la facture."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const customer = useMemo(
    () =>
      customers.find(
        (item) =>
          String(item.id) ===
          String(invoice?.customer_id)
      ),
    [customers, invoice]
  );

  const site = useMemo(
    () =>
      sites.find(
        (item) =>
          String(item.id) ===
          String(invoice?.site_id)
      ),
    [sites, invoice]
  );

  const quote = useMemo(
    () =>
      quotes.find(
        (item) =>
          String(item.id) ===
          String(invoice?.quote_id)
      ),
    [quotes, invoice]
  );

  const job = useMemo(
    () =>
      jobs.find(
        (item) =>
          String(item.id) ===
          String(invoice?.job_id)
      ),
    [jobs, invoice]
  );

  const calculatedTotals = useMemo(() => {
    const subtotal = invoiceItems.reduce(
      (sum, item) =>
        sum + toNumber(item.subtotal),
      0
    );

    const taxAmount = invoiceItems.reduce(
      (sum, item) =>
        sum + toNumber(item.tax_amount),
      0
    );

    const lineTotal = invoiceItems.reduce(
      (sum, item) =>
        sum + toNumber(item.total_amount),
      0
    );

    return {
      subtotal: toNumber(
        invoice?.subtotal ?? subtotal
      ),
      discountAmount: toNumber(
        invoice?.discount_amount
      ),
      taxAmount: toNumber(
        invoice?.tax_amount ?? taxAmount
      ),
      totalAmount: toNumber(
        invoice?.total_amount ?? lineTotal
      ),
      amountPaid: toNumber(
        invoice?.amount_paid
      ),
      amountDue: toNumber(
        invoice?.amount_due
      ),
    };
  }, [invoice, invoiceItems]);

  const isPaid = calculatedTotals.amountDue <= 0;

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    setError("");

    try {
      const blob = await downloadInvoicePdf(id);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `facture-${
        invoice.number || invoice.id
      }.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (requestError) {
      console.error(requestError);

      setError(
        "Impossible de télécharger la facture PDF."
      );
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer la facture ${
        invoice?.number || ""
      } ?`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      await deleteInvoice(id);

      navigate("/invoices");
    } catch (requestError) {
      console.error(requestError);

      const messages =
        requestError?.response?.data?.messages;

      setError(
        Array.isArray(messages)
          ? messages.join(", ")
          : "Impossible de supprimer la facture."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mx-auto flex min-h-[300px] max-w-7xl items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
              <Receipt className="h-6 w-6 text-emerald-600" />
            </div>

            <p className="text-sm font-medium text-slate-500">
              Chargement de la facture…
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !invoice) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => navigate("/invoices")}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux factures
          </button>

          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            <Receipt className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-slate-500">
            Facture introuvable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/invoices")}
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux factures
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <Receipt className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">
                    {invoice.number}
                  </h1>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />

                    {statusLabel[invoice.status] ||
                      invoice.status ||
                      "—"}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Détail de la facture
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Download
                className={`h-4 w-4 ${
                  downloadingPdf
                    ? "animate-pulse"
                    : ""
                }`}
              />

              {downloadingPdf
                ? "Téléchargement…"
                : "Télécharger le PDF"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/invoices/${invoice.id}/edit`
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
            >
              <Pencil className="h-4 w-4" />
              Modifier
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />

              {deleting
                ? "Suppression…"
                : "Supprimer"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <Receipt className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Overview */}
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Informations générales
                </h2>

                <p className="text-sm text-slate-500">
                  Références et dates de la facture
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Numéro
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <ReceiptText className="h-4 w-4 text-emerald-500" />
                  {invoice.number}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Date d'émission
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                  <CalendarDays className="h-4 w-4 text-emerald-500" />
                  {formatDate(invoice.issue_date)}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Échéance
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                  <CalendarDays className="h-4 w-4 text-amber-500" />
                  {formatDate(invoice.due_date)}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Client
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                  <UserRound className="h-4 w-4 text-sky-500" />
                  {getCustomerName(customer)}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Site
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                  <Landmark className="h-4 w-4 text-emerald-500" />
                  {getSiteName(site)}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Devis
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                  <FileText className="h-4 w-4 text-violet-500" />
                  {getQuoteLabel(quote)}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Job
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                  <ReceiptText className="h-4 w-4 text-orange-500" />
                  {getJobLabel(job)}
                </div>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <CreditCard className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Paiement
                </h2>

                <p className="text-sm text-slate-500">
                  État du règlement
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-slate-500">
                  Total
                </span>

                <span className="font-semibold text-slate-900">
                  {formatMoney(
                    calculatedTotals.totalAmount
                  )}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-slate-500">
                  Montant payé
                </span>

                <span className="font-medium text-emerald-600">
                  {formatMoney(
                    calculatedTotals.amountPaid
                  )}
                </span>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-amber-800">
                    Reste dû
                  </span>

                  <span
                    className={
                      isPaid
                        ? "inline-flex items-center gap-1.5 text-lg font-bold text-emerald-600"
                        : "text-lg font-bold text-amber-700"
                    }
                  >
                    {isPaid && (
                      <CheckCircle2 className="h-5 w-5" />
                    )}

                    {formatMoney(
                      calculatedTotals.amountDue
                    )}
                  </span>
                </div>
              </div>

              {invoice.payment_method && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Mode de paiement
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                    <CreditCard className="h-4 w-4 text-slate-400" />
                    {invoice.payment_method}
                  </div>
                </div>
              )}

              {invoice.payment_reference && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Référence
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {invoice.payment_reference}
                  </p>
                </div>
              )}

              {invoice.paid_at && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Date de paiement
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {formatDate(invoice.paid_at)}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Invoice items */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <ReceiptText className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Lignes de facture
                </h2>

                <p className="text-sm text-slate-500">
                  Prestations facturées
                </p>
              </div>
            </div>
          </div>

          {invoiceItems.length === 0 ? (
            <div className="m-6 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/30 p-8 text-center">
              <ReceiptText className="mx-auto h-8 w-8 text-emerald-400" />

              <p className="mt-3 text-sm font-medium text-slate-600">
                Aucune ligne de facture.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      #
                    </th>

                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Description
                    </th>

                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Quantité
                    </th>

                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Unité
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Prix unitaire
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Remise
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      TVA
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {invoiceItems.map(
                    (item, index) => (
                      <tr
                        key={item.id || index}
                        className="transition hover:bg-emerald-50/30"
                      >
                        <td className="px-4 py-4 font-medium text-slate-400">
                          {item.position ||
                            index + 1}
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-900">
                            {item.description}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-slate-700">
                          {toNumber(
                            item.quantity
                          ).toLocaleString(
                            "fr-FR"
                          )}
                        </td>

                        <td className="px-4 py-4 text-slate-700">
                          {item.unit || "—"}
                        </td>

                        <td className="px-4 py-4 text-right text-slate-700">
                          {formatMoney(
                            item.unit_price
                          )}
                        </td>

                        <td className="px-4 py-4 text-right text-slate-700">
                          {toNumber(
                            item.discount_percentage
                          ).toLocaleString(
                            "fr-FR",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                          %
                        </td>

                        <td className="px-4 py-4 text-right text-slate-700">
                          {toNumber(
                            item.tax_rate
                          ).toLocaleString(
                            "fr-FR",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                          %
                        </td>

                        <td className="px-4 py-4 text-right font-semibold text-emerald-700">
                          {formatMoney(
                            item.total_amount
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Notes & totals */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <FileText className="h-5 w-5 text-slate-600" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Notes
                </h2>

                <p className="text-sm text-slate-500">
                  Informations complémentaires
                </p>
              </div>
            </div>

            {invoice.notes ? (
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                {invoice.notes}
              </p>
            ) : (
              <p className="text-sm text-slate-400">
                Aucune note.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <Receipt className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Récapitulatif
                </h2>

                <p className="text-sm text-slate-500">
                  Synthèse financière
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Sous-total
                </span>

                <span className="font-medium text-slate-700">
                  {formatMoney(
                    calculatedTotals.subtotal
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Remise
                </span>

                <span className="font-medium text-slate-700">
                  -{" "}
                  {formatMoney(
                    calculatedTotals.discountAmount
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  TVA
                </span>

                <span className="font-medium text-slate-700">
                  {formatMoney(
                    calculatedTotals.taxAmount
                  )}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>

                  <span className="text-emerald-700">
                    {formatMoney(
                      calculatedTotals.totalAmount
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Payé
                </span>

                <span className="font-medium text-emerald-600">
                  {formatMoney(
                    calculatedTotals.amountPaid
                  )}
                </span>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3">
                <div className="flex items-center justify-between text-base font-bold">
                  <span className="text-amber-800">
                    Reste dû
                  </span>

                  <span
                    className={
                      isPaid
                        ? "inline-flex items-center gap-1.5 text-emerald-600"
                        : "text-amber-700"
                    }
                  >
                    {isPaid && (
                      <CheckCircle2 className="h-4 w-4" />
                    )}

                    {formatMoney(
                      calculatedTotals.amountDue
                    )}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}