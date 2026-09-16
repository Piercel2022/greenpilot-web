
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  FileText,
  MapPin,
  NotebookPen,
  Pencil,
  Plus,
  Receipt,
  ReceiptText,
  Save,
  Tag,
  Trash2,
  UserRound,
  Wallet,
} from "lucide-react";

import { getCustomers } from "../../services/customers";
import { getSites } from "../../services/sites";
import { getQuotes } from "../../services/quotes";
import { getJobs } from "../../services/jobs";
import { getServiceItems } from "../../services/service_items";
import {
  createInvoice,
  getInvoice,
  updateInvoice,
} from "../../services/invoices";
import {
  createInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
} from "../../services/invoiceItems";

const emptyLine = (position = 1) => ({
  id: null,
  service_item_id: "",
  description: "",
  quantity: 1,
  unit: "",
  unit_price: 0,
  discount_percentage: 0,
  tax_rate: 20,
  subtotal: 0,
  tax_amount: 0,
  total_amount: 0,
  position,
});

const initialForm = {
  customer_id: "",
  site_id: "",
  quote_id: "",
  job_id: "",
  number: "",
  status: "issued",
  issue_date: new Date().toISOString().slice(0, 10),
  due_date: "",
  subtotal: 0,
  discount_amount: 0,
  tax_amount: 0,
  total_amount: 0,
  amount_paid: 0,
  amount_due: 0,
  paid_at: "",
  payment_method: "",
  payment_reference: "",
  notes: "",
};

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const roundMoney = (value) =>
  Math.round((toNumber(value) + Number.EPSILON) * 100) / 100;

const formatDate = (value) => {
  if (!value) return "";

  return String(value).slice(0, 10);
};

const formatMoney = (value) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(toNumber(value));

const getCollection = (response, key) => {
  if (Array.isArray(response)) {
    return response;
  }

  return Array.isArray(response?.[key])
    ? response[key]
    : [];
};

const getCustomerName = (customer) =>
  customer.company_name ||
  customer.name ||
  `${customer.first_name || ""} ${
    customer.last_name || ""
  }`.trim() ||
  customer.email ||
  customer.id;

function InvoiceFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [lines, setLines] = useState([emptyLine()]);

  const [customers, setCustomers] = useState([]);
  const [sites, setSites] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [serviceItems, setServiceItems] = useState([]);

  const [existingInvoiceItemIds, setExistingInvoiceItemIds] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const [
          customersResponse,
          sitesResponse,
          quotesResponse,
          jobsResponse,
          serviceItemsResponse,
        ] = await Promise.all([
          getCustomers(),
          getSites(),
          getQuotes(),
          getJobs(),
          getServiceItems(),
        ]);

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

        setServiceItems(
          getCollection(
            serviceItemsResponse,
            "service_items"
          )
        );

        if (isEdit) {
          const invoiceResponse = await getInvoice(id);

          const invoice =
            invoiceResponse?.invoice ||
            invoiceResponse;

          setForm({
            customer_id:
              invoice.customer_id || "",
            site_id: invoice.site_id || "",
            quote_id: invoice.quote_id || "",
            job_id: invoice.job_id || "",
            number: invoice.number || "",
            status:
              invoice.status || "issued",
            issue_date: formatDate(
              invoice.issue_date
            ),
            due_date: formatDate(
              invoice.due_date
            ),
            subtotal: toNumber(
              invoice.subtotal
            ),
            discount_amount: toNumber(
              invoice.discount_amount
            ),
            tax_amount: toNumber(
              invoice.tax_amount
            ),
            total_amount: toNumber(
              invoice.total_amount
            ),
            amount_paid: toNumber(
              invoice.amount_paid
            ),
            amount_due: toNumber(
              invoice.amount_due
            ),
            paid_at: formatDate(
              invoice.paid_at
            ),
            payment_method:
              invoice.payment_method || "",
            payment_reference:
              invoice.payment_reference || "",
            notes: invoice.notes || "",
          });

          const invoiceItems = Array.isArray(
            invoice.invoice_items
          )
            ? invoice.invoice_items
            : [];

          setExistingInvoiceItemIds(
            invoiceItems
              .map((item) => item.id)
              .filter(Boolean)
          );

          if (invoiceItems.length > 0) {
            setLines(
              invoiceItems.map((item, index) => ({
                id: item.id || null,
                service_item_id:
                  item.service_item_id || "",
                description:
                  item.description || "",
                quantity: toNumber(
                  item.quantity
                ),
                unit: item.unit || "",
                unit_price: toNumber(
                  item.unit_price
                ),
                discount_percentage:
                  toNumber(
                    item.discount_percentage
                  ),
                tax_rate: toNumber(
                  item.tax_rate
                ),
                subtotal: toNumber(
                  item.subtotal
                ),
                tax_amount: toNumber(
                  item.tax_amount
                ),
                total_amount: toNumber(
                  item.total_amount
                ),
                position:
                  item.position ||
                  index + 1,
              }))
            );
          }
        }
      } catch (requestError) {
        console.error(requestError);

        setError(
          "Impossible de charger les données nécessaires au formulaire."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isEdit]);

  const filteredSites = useMemo(() => {
    if (!form.customer_id) {
      return sites;
    }

    return sites.filter(
      (site) =>
        String(site.customer_id) ===
        String(form.customer_id)
    );
  }, [form.customer_id, sites]);

  const filteredQuotes = useMemo(() => {
    if (!form.customer_id) {
      return quotes;
    }

    return quotes.filter(
      (quote) =>
        String(quote.customer_id) ===
        String(form.customer_id)
    );
  }, [form.customer_id, quotes]);

  const filteredJobs = useMemo(() => {
    if (!form.customer_id) {
      return jobs;
    }

    return jobs.filter(
      (job) =>
        String(job.customer_id) ===
        String(form.customer_id)
    );
  }, [form.customer_id, jobs]);

  const calculateLine = (line) => {
    const quantity = toNumber(
      line.quantity
    );

    const unitPrice = toNumber(
      line.unit_price
    );

    const discountPercentage = Math.min(
      Math.max(
        toNumber(
          line.discount_percentage
        ),
        0
      ),
      100
    );

    const taxRate = Math.min(
      Math.max(toNumber(line.tax_rate), 0),
      100
    );

    const gross = roundMoney(
      quantity * unitPrice
    );

    const discount = roundMoney(
      gross *
        (discountPercentage / 100)
    );

    const subtotal = roundMoney(
      gross - discount
    );

    const taxAmount = roundMoney(
      subtotal * (taxRate / 100)
    );

    const totalAmount = roundMoney(
      subtotal + taxAmount
    );

    return {
      ...line,
      quantity,
      unit_price: unitPrice,
      discount_percentage:
        discountPercentage,
      tax_rate: taxRate,
      subtotal,
      tax_amount: taxAmount,
      total_amount: totalAmount,
    };
  };

  const calculatedLines = useMemo(
    () => lines.map(calculateLine),
    [lines]
  );

  const totals = useMemo(() => {
    const grossSubtotal = roundMoney(
      calculatedLines.reduce(
        (sum, line) =>
          sum + toNumber(line.subtotal),
        0
      )
    );

    const invoiceDiscount = Math.min(
      Math.max(
        toNumber(form.discount_amount),
        0
      ),
      grossSubtotal
    );

    const taxableSubtotal = roundMoney(
      grossSubtotal - invoiceDiscount
    );

    const lineTaxAmount = roundMoney(
      calculatedLines.reduce(
        (sum, line) =>
          sum + toNumber(line.tax_amount),
        0
      )
    );

    const taxReductionRatio =
      grossSubtotal > 0
        ? invoiceDiscount / grossSubtotal
        : 0;

    const taxAmount = roundMoney(
      lineTaxAmount *
        (1 - taxReductionRatio)
    );

    const totalAmount = roundMoney(
      taxableSubtotal + taxAmount
    );

    const amountPaid = Math.min(
      Math.max(
        roundMoney(form.amount_paid),
        0
      ),
      totalAmount
    );

    const amountDue = roundMoney(
      Math.max(
        totalAmount - amountPaid,
        0
      )
    );

    return {
      grossSubtotal,
      invoiceDiscount,
      taxableSubtotal,
      taxAmount,
      totalAmount,
      amountPaid,
      amountDue,
    };
  }, [
    calculatedLines,
    form.discount_amount,
    form.amount_paid,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "customer_id") {
      setForm((current) => ({
        ...current,
        customer_id: value,
        site_id: "",
        quote_id: "",
        job_id: "",
      }));

      return;
    }

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLineChange = (
    index,
    field,
    value
  ) => {
    setLines((current) =>
      current.map((line, lineIndex) => {
        if (lineIndex !== index) {
          return line;
        }

        const updatedLine = {
          ...line,
          [field]: value,
        };

        if (
          field ===
          "service_item_id"
        ) {
          const serviceItem =
            serviceItems.find(
              (item) =>
                String(item.id) ===
                String(value)
            );

          if (serviceItem) {
            updatedLine.description =
              serviceItem.name ||
              updatedLine.description;

            updatedLine.unit =
              serviceItem.unit || "";

            updatedLine.unit_price =
              toNumber(
                serviceItem.default_unit_price
              );

            updatedLine.quantity =
              toNumber(
                serviceItem.default_quantity ||
                  1
              );
          }
        }

        return calculateLine(
          updatedLine
        );
      })
    );
  };

  const addLine = () => {
    setLines((current) => [
      ...current,
      emptyLine(current.length + 1),
    ]);
  };

  const removeLine = (index) => {
    setLines((current) => {
      if (current.length === 1) {
        return [emptyLine(1)];
      }

      return current
        .filter(
          (_, lineIndex) =>
            lineIndex !== index
        )
        .map((line, lineIndex) => ({
          ...line,
          position: lineIndex + 1,
        }));
    });
  };

  const validateForm = () => {
    if (!form.customer_id) {
      return "Veuillez sélectionner un client.";
    }

    if (!form.number.trim()) {
      return "Le numéro de facture est obligatoire.";
    }

    if (!form.issue_date) {
      return "La date d'émission est obligatoire.";
    }

    if (calculatedLines.length === 0) {
      return "La facture doit contenir au moins une ligne.";
    }

    const invalidLine =
      calculatedLines.find(
        (line) =>
          !line.description.trim() ||
          !line.unit.trim() ||
          line.quantity <= 0 ||
          line.unit_price < 0
      );

    if (invalidLine) {
      return "Chaque ligne doit avoir une description, une unité, une quantité positive et un prix valide.";
    }

    return "";
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");

    try {
      const invoicePayload = {
        customer_id:
          form.customer_id || null,
        site_id:
          form.site_id || null,
        quote_id:
          form.quote_id || null,
        job_id:
          form.job_id || null,
        number: form.number.trim(),
        status: form.status,
        issue_date: form.issue_date,
        due_date:
          form.due_date || null,
        subtotal:
          totals.taxableSubtotal,
        discount_amount:
          totals.invoiceDiscount,
        tax_amount:
          totals.taxAmount,
        total_amount:
          totals.totalAmount,
        amount_paid:
          totals.amountPaid,
        amount_due:
          totals.amountDue,
        paid_at:
          form.paid_at || null,
        payment_method:
          form.payment_method || null,
        payment_reference:
          form.payment_reference || null,
        notes:
          form.notes || null,
      };

      let savedInvoice;

      if (isEdit) {
        savedInvoice =
          await updateInvoice(
            id,
            invoicePayload
          );
      } else {
        savedInvoice =
          await createInvoice(
            invoicePayload
          );
      }

      const invoice =
        savedInvoice?.invoice ||
        savedInvoice;

      const invoiceId =
        invoice?.id || id;

      if (!invoiceId) {
        throw new Error(
          "La facture a été enregistrée mais son identifiant est introuvable."
        );
      }

      if (
        isEdit &&
        existingInvoiceItemIds.length >
          0
      ) {
        const existingLines =
          calculatedLines.filter(
            (line) => line.id
          );

        for (
          const [
            index,
            line,
          ] of existingLines.entries()
        ) {
          await updateInvoiceItem(
            line.id,
            {
              invoice_id:
                invoiceId,
              service_item_id:
                line.service_item_id ||
                null,
              description:
                line.description.trim(),
              unit:
                line.unit.trim(),
              quantity:
                line.quantity,
              unit_price:
                line.unit_price,
              discount_percentage:
                line.discount_percentage,
              tax_rate:
                line.tax_rate,
              subtotal:
                line.subtotal,
              tax_amount:
                line.tax_amount,
              total_amount:
                line.total_amount,
              position:
                -(index + 1),
            }
          );
        }
      }

      if (isEdit) {
        const currentLineIds =
          new Set(
            calculatedLines
              .map((line) => line.id)
              .filter(Boolean)
          );

        const removedIds =
          existingInvoiceItemIds.filter(
            (existingId) =>
              !currentLineIds.has(
                existingId
              )
          );

        for (
          const removedId of removedIds
        ) {
          await deleteInvoiceItem(
            removedId
          );
        }
      }

      for (const line of calculatedLines) {
        const linePayload = {
          invoice_id: invoiceId,
          service_item_id:
            line.service_item_id ||
            null,
          description:
            line.description.trim(),
          unit: line.unit.trim(),
          quantity: line.quantity,
          unit_price:
            line.unit_price,
          discount_percentage:
            line.discount_percentage,
          tax_rate: line.tax_rate,
          subtotal: line.subtotal,
          tax_amount:
            line.tax_amount,
          total_amount:
            line.total_amount,
          position:
            line.position,
        };

        if (line.id) {
          await updateInvoiceItem(
            line.id,
            linePayload
          );
        } else {
          await createInvoiceItem(
            linePayload
          );
        }
      }

      navigate(
        `/invoices/${invoiceId}`
      );
    } catch (requestError) {
      console.error(requestError);

      const messages =
        requestError?.response?.data
          ?.messages;

      setError(
        Array.isArray(messages)
          ? messages.join(", ")
          : requestError?.message ||
              "Impossible d'enregistrer la facture."
      );
    } finally {
      setSaving(false);
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
              Chargement du formulaire…
            </p>
          </div>
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
              onClick={() =>
                navigate("/invoices")
              }
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux factures
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <Receipt className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {isEdit
                    ? "Modifier la facture"
                    : "Nouvelle facture"}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  {isEdit
                    ? "Mettez à jour les informations et les lignes de facturation."
                    : "Créez une facture et ses lignes de facturation."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <Receipt className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* General information */}
          <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Informations générales
                </h2>

                <p className="text-sm text-slate-500">
                  Client, références et dates de la facture
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* Customer */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <UserRound className="h-4 w-4 text-sky-500" />
                  Client *
                </label>

                <select
                  name="customer_id"
                  value={form.customer_id}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                >
                  <option value="">
                    Sélectionner un client
                  </option>

                  {customers.map(
                    (customer) => (
                      <option
                        key={customer.id}
                        value={customer.id}
                      >
                        {getCustomerName(
                          customer
                        )}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Site */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  Site
                </label>

                <select
                  name="site_id"
                  value={form.site_id}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                >
                  <option value="">
                    Aucun site
                  </option>

                  {filteredSites.map(
                    (site) => (
                      <option
                        key={site.id}
                        value={site.id}
                      >
                        {site.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Quote */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <FileText className="h-4 w-4 text-violet-500" />
                  Devis
                </label>

                <select
                  name="quote_id"
                  value={form.quote_id}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                >
                  <option value="">
                    Aucun devis
                  </option>

                  {filteredQuotes.map(
                    (quote) => (
                      <option
                        key={quote.id}
                        value={quote.id}
                      >
                        {quote.number} —{" "}
                        {quote.title}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Job */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <ClipboardList className="h-4 w-4 text-orange-500" />
                  Job
                </label>

                <select
                  name="job_id"
                  value={form.job_id}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                >
                  <option value="">
                    Aucun job
                  </option>

                  {filteredJobs.map(
                    (job) => (
                      <option
                        key={job.id}
                        value={job.id}
                      >
                        {job.title}
                        {job.scheduled_date
                          ? ` — ${formatDate(
                              job.scheduled_date
                            )}`
                          : ""}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Number */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <ReceiptText className="h-4 w-4 text-emerald-500" />
                  Numéro *
                </label>

                <input
                  type="text"
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  required
                  placeholder="INV-2026-0003"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Statut
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                >
                  <option value="issued">
                    Émise
                  </option>
                </select>
              </div>

              {/* Issue date */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <CalendarDays className="h-4 w-4 text-emerald-500" />
                  Date d'émission *
                </label>

                <input
                  type="date"
                  name="issue_date"
                  value={form.issue_date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                />
              </div>

              {/* Due date */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <CalendarDays className="h-4 w-4 text-amber-500" />
                  Date d'échéance
                </label>

                <input
                  type="date"
                  name="due_date"
                  value={form.due_date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-50"
                />
              </div>
            </div>
          </section>

          {/* Invoice lines */}
          <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <ReceiptText className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Lignes de facture
                  </h2>

                  <p className="text-sm text-slate-500">
                    Ajoutez les prestations facturées.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={addLine}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4" />
                Ajouter une ligne
              </button>
            </div>

            <div className="space-y-4 p-6">
              {calculatedLines.map(
                (line, index) => (
                  <div
                    key={
                      line.id ||
                      `new-${index}`
                    }
                    className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5 transition hover:border-emerald-200"
                  >
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700">
                          {index + 1}
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            Ligne {index + 1}
                          </h3>

                          <p className="text-xs text-slate-500">
                            Prestation et calcul de facturation
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeLine(index)
                        }
                        className="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </button>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                      {/* Service item */}
                      <div className="lg:col-span-2">
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <Tag className="h-4 w-4 text-emerald-500" />
                          Prestation
                        </label>

                        <select
                          value={
                            line.service_item_id
                          }
                          onChange={(
                            event
                          ) =>
                            handleLineChange(
                              index,
                              "service_item_id",
                              event.target
                                .value
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                        >
                          <option value="">
                            Saisie libre / aucune prestation
                          </option>

                          {serviceItems.map(
                            (
                              serviceItem
                            ) => (
                              <option
                                key={
                                  serviceItem.id
                                }
                                value={
                                  serviceItem.id
                                }
                              >
                                {serviceItem.code
                                  ? `${serviceItem.code} — `
                                  : ""}
                                {
                                  serviceItem.name
                                }
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      {/* Description */}
                      <div className="lg:col-span-2">
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <Pencil className="h-4 w-4 text-slate-400" />
                          Description *
                        </label>

                        <input
                          type="text"
                          value={
                            line.description
                          }
                          onChange={(
                            event
                          ) =>
                            handleLineChange(
                              index,
                              "description",
                              event.target
                                .value
                            )
                          }
                          required
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                        />
                      </div>

                      {/* Quantity */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                          Quantité
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={
                            line.quantity
                          }
                          onChange={(
                            event
                          ) =>
                            handleLineChange(
                              index,
                              "quantity",
                              event.target
                                .value
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                        />
                      </div>

                      {/* Unit */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                          Unité *
                        </label>

                        <input
                          type="text"
                          value={line.unit}
                          onChange={(
                            event
                          ) =>
                            handleLineChange(
                              index,
                              "unit",
                              event.target
                                .value
                            )
                          }
                          required
                          placeholder="m², h, forfait..."
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                        />
                      </div>

                      {/* Unit price */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <CircleDollarSign className="h-4 w-4 text-emerald-500" />
                          Prix unitaire
                        </label>

                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={
                              line.unit_price
                            }
                            onChange={(
                              event
                            ) =>
                              handleLineChange(
                                index,
                                "unit_price",
                                event.target
                                  .value
                              )
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                          />

                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                            €
                          </span>
                        </div>
                      </div>

                      {/* Discount */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <Tag className="h-4 w-4 text-amber-500" />
                          Remise %
                        </label>

                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={
                              line.discount_percentage
                            }
                            onChange={(
                              event
                            ) =>
                              handleLineChange(
                                index,
                                "discount_percentage",
                                event.target
                                  .value
                              )
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-50"
                          />

                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                            %
                          </span>
                        </div>
                      </div>

                      {/* Tax */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <CircleDollarSign className="h-4 w-4 text-violet-500" />
                          TVA %
                        </label>

                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={
                              line.tax_rate
                            }
                            onChange={(
                              event
                            ) =>
                              handleLineChange(
                                index,
                                "tax_rate",
                                event.target
                                  .value
                              )
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
                          />

                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                            %
                          </span>
                        </div>
                      </div>

                      {/* Calculated subtotal */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-500">
                          Sous-total
                        </label>

                        <div className="flex h-[42px] items-center rounded-xl border border-emerald-100 bg-emerald-50 px-3 text-sm font-semibold text-emerald-700">
                          {formatMoney(
                            line.subtotal
                          )}
                        </div>
                      </div>

                      {/* Calculated tax */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-500">
                          TVA
                        </label>

                        <div className="flex h-[42px] items-center rounded-xl border border-violet-100 bg-violet-50 px-3 text-sm font-semibold text-violet-700">
                          {formatMoney(
                            line.tax_amount
                          )}
                        </div>
                      </div>

                      {/* Calculated total */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-500">
                          Total ligne
                        </label>

                        <div className="flex h-[42px] items-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-sm font-bold text-emerald-700">
                          {formatMoney(
                            line.total_amount
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Payment & totals */}
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Paiement
                  </h2>

                  <p className="text-sm text-slate-500">
                    Informations relatives au règlement
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Wallet className="h-4 w-4 text-emerald-500" />
                    Montant payé
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="amount_paid"
                      value={
                        form.amount_paid
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                      €
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <CreditCard className="h-4 w-4 text-slate-400" />
                    Mode de paiement
                  </label>

                  <input
                    type="text"
                    name="payment_method"
                    value={
                      form.payment_method
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Virement, CB, chèque..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <ReceiptText className="h-4 w-4 text-slate-400" />
                    Référence de paiement
                  </label>

                  <input
                    type="text"
                    name="payment_reference"
                    value={
                      form.payment_reference
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <CalendarDays className="h-4 w-4 text-emerald-500" />
                    Date de paiement
                  </label>

                  <input
                    type="date"
                    name="paid_at"
                    value={
                      form.paid_at
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                  />
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <Receipt className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Totaux
                  </h2>

                  <p className="text-sm text-slate-500">
                    Synthèse financière de la facture
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
                      totals.grossSubtotal
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <label
                    htmlFor="discount_amount"
                    className="flex items-center gap-1.5 text-slate-500"
                  >
                    <Tag className="h-4 w-4 text-amber-500" />
                    Remise facture
                  </label>

                  <div className="relative">
                    <input
                      id="discount_amount"
                      type="number"
                      min="0"
                      step="0.01"
                      name="discount_amount"
                      value={
                        form.discount_amount
                      }
                      onChange={
                        handleChange
                      }
                      className="w-32 rounded-xl border border-amber-200 bg-amber-50/50 px-3 py-2 pr-8 text-right text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-50"
                    />

                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                      €
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Base taxable
                  </span>

                  <span className="font-medium text-slate-700">
                    {formatMoney(
                      totals.taxableSubtotal
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    TVA
                  </span>

                  <span className="font-medium text-violet-600">
                    {formatMoney(
                      totals.taxAmount
                    )}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>

                    <span className="text-emerald-700">
                      {formatMoney(
                        totals.totalAmount
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
                      totals.amountPaid
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
                        totals.amountDue <=
                        0
                          ? "inline-flex items-center gap-1.5 text-emerald-600"
                          : "text-amber-700"
                      }
                    >
                      {totals.amountDue <=
                        0 && (
                        <CheckCircle2 className="h-4 w-4" />
                      )}

                      {formatMoney(
                        totals.amountDue
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <NotebookPen className="h-5 w-5 text-slate-600" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Notes
                </h2>

                <p className="text-sm text-slate-500">
                  Informations complémentaires à afficher sur la facture
                </p>
              </div>
            </div>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Informations complémentaires..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
            />
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                navigate("/invoices")
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Annuler
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="h-4 w-4" />

              {saving
                ? "Enregistrement…"
                : isEdit
                  ? "Enregistrer les modifications"
                  : "Créer la facture"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceFormPage;