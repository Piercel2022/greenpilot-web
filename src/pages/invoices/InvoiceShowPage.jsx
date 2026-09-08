
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  FileText,
  Pencil,
  ReceiptText,
  Trash2,
  UserRound,
} from "lucide-react";

import { getCustomers } from "../../services/customers";
import { getSites } from "../../services/sites";
import { getQuotes } from "../../services/quotes";
import { getJobs } from "../../services/jobs";
import { getInvoice } from "../../services/invoices";
import {
  deleteInvoice,
} from "../../services/invoices";
import { getInvoiceItems } from "../../services/invoiceItems";

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const formatMoney = (value) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(toNumber(value));

const formatDate = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 10);
  }

  return new Intl.DateTimeFormat("fr-FR").format(date);
};

const getCollection = (response, key) => {
  if (Array.isArray(response)) {
    return response;
  }

  return Array.isArray(response?.[key])
    ? response[key]
    : [];
};

const getCustomerName = (customer) => {
  if (!customer) {
    return "Client inconnu";
  }

  return (
    customer.company_name ||
    customer.name ||
    `${customer.first_name || ""} ${
      customer.last_name || ""
    }`.trim() ||
    customer.email ||
    customer.id ||
    "Client inconnu"
  );
};

const getSiteName = (site) => {
  if (!site) {
    return "—";
  }

  return site.name || site.address || site.id || "—";
};

const getQuoteLabel = (quote) => {
  if (!quote) {
    return "—";
  }

  if (quote.number && quote.title) {
    return `${quote.number} — ${quote.title}`;
  }

  return (
    quote.number ||
    quote.title ||
    quote.id ||
    "—"
  );
};

const getJobLabel = (job) => {
  if (!job) {
    return "—";
  }

  return job.title || job.id || "—";
};

const statusLabel = {
  issued: "Émise",
};

export default function InvoiceShowPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);

  const [customers, setCustomers] = useState([]);
  const [sites, setSites] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const [
          invoiceResponse,
          invoiceItemsResponse,
          customersResponse,
          sitesResponse,
          quotesResponse,
          jobsResponse,
        ] = await Promise.all([
          getInvoice(id),
          getInvoiceItems(),
          getCustomers(),
          getSites(),
          getQuotes(),
          getJobs(),
        ]);

        const invoiceData =
          invoiceResponse?.invoice ||
          invoiceResponse;

        if (!invoiceData?.id) {
          throw new Error(
            "Facture introuvable."
          );
        }

        setInvoice(invoiceData);

        const allInvoiceItems = getCollection(
          invoiceItemsResponse,
          "invoice_items"
        );

        setInvoiceItems(
          allInvoiceItems
            .filter(
              (item) =>
                String(item.invoice_id) ===
                String(invoiceData.id)
            )
            .sort(
              (a, b) =>
                toNumber(a.position) -
                toNumber(b.position)
            )
        );

        setCustomers(
          getCollection(
            customersResponse,
            "customers"
          )
        );

        setSites(
          getCollection(
            sitesResponse,
            "sites"
          )
        );

        setQuotes(
          getCollection(
            quotesResponse,
            "quotes"
          )
        );

        setJobs(
          getCollection(
            jobsResponse,
            "jobs"
          )
        );
      } catch (requestError) {
        console.error(requestError);

        setError(
          requestError?.message ||
            "Impossible de charger la facture."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const customer = useMemo(() => {
    if (!invoice?.customer_id) {
      return null;
    }

    return customers.find(
      (item) =>
        String(item.id) ===
        String(invoice.customer_id)
    );
  }, [customers, invoice]);

  const site = useMemo(() => {
    if (!invoice?.site_id) {
      return null;
    }

    return sites.find(
      (item) =>
        String(item.id) ===
        String(invoice.site_id)
    );
  }, [invoice, sites]);

  const quote = useMemo(() => {
    if (!invoice?.quote_id) {
      return null;
    }

    return quotes.find(
      (item) =>
        String(item.id) ===
        String(invoice.quote_id)
    );
  }, [invoice, quotes]);

  const job = useMemo(() => {
    if (!invoice?.job_id) {
      return null;
    }

    return jobs.find(
      (item) =>
        String(item.id) ===
        String(invoice.job_id)
    );
  }, [invoice, jobs]);

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
        <p className="text-sm text-slate-500">
          Chargement de la facture...
        </p>
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
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Retour aux factures
          </button>

          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
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
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/invoices")}
              className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Retour aux factures
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold text-slate-900">
                {invoice.number}
              </h1>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                {statusLabel[invoice.status] ||
                  invoice.status ||
                  "—"}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Détail de la facture
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/invoices/${invoice.id}/edit`
                )
              }
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Pencil size={16} />
              Modifier
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={16} />

              {deleting
                ? "Suppression..."
                : "Supprimer"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-slate-100 p-2">
                <FileText
                  size={20}
                  className="text-slate-700"
                />
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
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Numéro
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {invoice.number}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Date d'émission
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                  <CalendarDays size={15} />
                  {formatDate(
                    invoice.issue_date
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Échéance
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                  <CalendarDays size={15} />
                  {formatDate(
                    invoice.due_date
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Client
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                  <UserRound size={15} />
                  {getCustomerName(customer)}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Site
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {getSiteName(site)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Devis
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {getQuoteLabel(quote)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Job
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {getJobLabel(job)}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-slate-100 p-2">
                <CreditCard
                  size={20}
                  className="text-slate-700"
                />
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

                <span className="font-medium text-slate-700">
                  {formatMoney(
                    calculatedTotals.amountPaid
                  )}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-medium text-slate-700">
                    Reste dû
                  </span>

                  <span className="text-lg font-semibold text-slate-900">
                    {formatMoney(
                      calculatedTotals.amountDue
                    )}
                  </span>
                </div>
              </div>

              {invoice.payment_method && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Mode de paiement
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {invoice.payment_method}
                  </p>
                </div>
              )}

              {invoice.payment_reference && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Référence
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {invoice.payment_reference}
                  </p>
                </div>
              )}

              {invoice.paid_at && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Date de paiement
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {formatDate(invoice.paid_at)}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2">
              <ReceiptText
                size={20}
                className="text-slate-700"
              />
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

          {invoiceItems.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
              <p className="text-sm text-slate-500">
                Aucune ligne de facture.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-3 py-3 font-medium text-slate-500">
                      #
                    </th>

                    <th className="px-3 py-3 font-medium text-slate-500">
                      Description
                    </th>

                    <th className="px-3 py-3 font-medium text-slate-500">
                      Quantité
                    </th>

                    <th className="px-3 py-3 font-medium text-slate-500">
                      Unité
                    </th>

                    <th className="px-3 py-3 text-right font-medium text-slate-500">
                      Prix unitaire
                    </th>

                    <th className="px-3 py-3 text-right font-medium text-slate-500">
                      Remise
                    </th>

                    <th className="px-3 py-3 text-right font-medium text-slate-500">
                      TVA
                    </th>

                    <th className="px-3 py-3 text-right font-medium text-slate-500">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {invoiceItems.map(
                    (item, index) => (
                      <tr
                        key={item.id || index}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-3 py-4 text-slate-500">
                          {item.position ||
                            index + 1}
                        </td>

                        <td className="px-3 py-4">
                          <p className="font-medium text-slate-900">
                            {item.description}
                          </p>
                        </td>

                        <td className="px-3 py-4 text-slate-700">
                          {toNumber(
                            item.quantity
                          ).toLocaleString(
                            "fr-FR"
                          )}
                        </td>

                        <td className="px-3 py-4 text-slate-700">
                          {item.unit}
                        </td>

                        <td className="px-3 py-4 text-right text-slate-700">
                          {formatMoney(
                            item.unit_price
                          )}
                        </td>

                        <td className="px-3 py-4 text-right text-slate-700">
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

                        <td className="px-3 py-4 text-right text-slate-700">
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

                        <td className="px-3 py-4 text-right font-semibold text-slate-900">
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

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-slate-900">
              Notes
            </h2>

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

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-slate-900">
              Récapitulatif
            </h2>

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
                <div className="flex justify-between text-lg font-semibold text-slate-900">
                  <span>Total</span>

                  <span>
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

                <span>
                  {formatMoney(
                    calculatedTotals.amountPaid
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold text-slate-900">
                <span>Reste dû</span>

                <span>
                  {formatMoney(
                    calculatedTotals.amountDue
                  )}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}