import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";

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

const getCollection = (response, key) => {
  if (Array.isArray(response)) {
    return response;
  }

  return Array.isArray(response?.[key]) ? response[key] : [];
};

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

  const [existingInvoiceItemIds, setExistingInvoiceItemIds] = useState(
    []
  );

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

        setCustomers(getCollection(customersResponse, "customers"));
        setSites(getCollection(sitesResponse, "sites"));
        setQuotes(getCollection(quotesResponse, "quotes"));
        setJobs(getCollection(jobsResponse, "jobs"));
        setServiceItems(
          getCollection(serviceItemsResponse, "service_items")
        );

        if (isEdit) {
          const invoiceResponse = await getInvoice(id);
          const invoice =
            invoiceResponse?.invoice || invoiceResponse;

          setForm({
            customer_id: invoice.customer_id || "",
            site_id: invoice.site_id || "",
            quote_id: invoice.quote_id || "",
            job_id: invoice.job_id || "",
            number: invoice.number || "",
            status: invoice.status || "issued",
            issue_date: formatDate(invoice.issue_date),
            due_date: formatDate(invoice.due_date),
            subtotal: toNumber(invoice.subtotal),
            discount_amount: toNumber(invoice.discount_amount),
            tax_amount: toNumber(invoice.tax_amount),
            total_amount: toNumber(invoice.total_amount),
            amount_paid: toNumber(invoice.amount_paid),
            amount_due: toNumber(invoice.amount_due),
            paid_at: formatDate(invoice.paid_at),
            payment_method: invoice.payment_method || "",
            payment_reference: invoice.payment_reference || "",
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
                service_item_id: item.service_item_id || "",
                description: item.description || "",
                quantity: toNumber(item.quantity),
                unit: item.unit || "",
                unit_price: toNumber(item.unit_price),
                discount_percentage: toNumber(
                  item.discount_percentage
                ),
                tax_rate: toNumber(item.tax_rate),
                subtotal: toNumber(item.subtotal),
                tax_amount: toNumber(item.tax_amount),
                total_amount: toNumber(item.total_amount),
                position: item.position || index + 1,
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
        String(site.customer_id) === String(form.customer_id)
    );
  }, [form.customer_id, sites]);

  const filteredQuotes = useMemo(() => {
    if (!form.customer_id) {
      return quotes;
    }

    return quotes.filter(
      (quote) =>
        String(quote.customer_id) === String(form.customer_id)
    );
  }, [form.customer_id, quotes]);

  const filteredJobs = useMemo(() => {
    if (!form.customer_id) {
      return jobs;
    }

    return jobs.filter(
      (job) =>
        String(job.customer_id) === String(form.customer_id)
    );
  }, [form.customer_id, jobs]);

  const calculateLine = (line) => {
    const quantity = toNumber(line.quantity);
    const unitPrice = toNumber(line.unit_price);
    const discountPercentage = Math.min(
      Math.max(toNumber(line.discount_percentage), 0),
      100
    );
    const taxRate = Math.min(
      Math.max(toNumber(line.tax_rate), 0),
      100
    );

    const gross = roundMoney(quantity * unitPrice);

    const discount = roundMoney(
      gross * (discountPercentage / 100)
    );

    const subtotal = roundMoney(gross - discount);

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
      discount_percentage: discountPercentage,
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
        (sum, line) => sum + toNumber(line.subtotal),
        0
      )
    );

    const invoiceDiscount = Math.min(
      Math.max(toNumber(form.discount_amount), 0),
      grossSubtotal
    );

    const taxableSubtotal = roundMoney(
      grossSubtotal - invoiceDiscount
    );

    /*
     * Les InvoiceItems calculent leur TVA individuellement.
     * Pour éviter une incohérence, nous conservons ici la TVA
     * issue des lignes puis réduisons proportionnellement la TVA
     * lorsque la remise globale est appliquée.
     */
    const lineTaxAmount = roundMoney(
      calculatedLines.reduce(
        (sum, line) => sum + toNumber(line.tax_amount),
        0
      )
    );

    const taxReductionRatio =
      grossSubtotal > 0
        ? invoiceDiscount / grossSubtotal
        : 0;

    const taxAmount = roundMoney(
      lineTaxAmount * (1 - taxReductionRatio)
    );

    const totalAmount = roundMoney(
      taxableSubtotal + taxAmount
    );

    const amountPaid = Math.min(
      Math.max(roundMoney(form.amount_paid), 0),
      totalAmount
    );

    const amountDue = roundMoney(
      Math.max(totalAmount - amountPaid, 0)
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
  }, [calculatedLines, form.discount_amount, form.amount_paid]);

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

  const handleLineChange = (index, field, value) => {
    setLines((current) =>
      current.map((line, lineIndex) => {
        if (lineIndex !== index) {
          return line;
        }

        const updatedLine = {
          ...line,
          [field]: value,
        };

        if (field === "service_item_id") {
          const serviceItem = serviceItems.find(
            (item) =>
              String(item.id) === String(value)
          );

          if (serviceItem) {
            updatedLine.description =
              serviceItem.name || updatedLine.description;

            updatedLine.unit = serviceItem.unit || "";

            updatedLine.unit_price = toNumber(
              serviceItem.default_unit_price
            );

            updatedLine.quantity = toNumber(
              serviceItem.default_quantity || 1
            );
          }
        }

        return calculateLine(updatedLine);
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
        .filter((_, lineIndex) => lineIndex !== index)
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

    const invalidLine = calculatedLines.find(
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");

    try {
      const invoicePayload = {
        customer_id: form.customer_id || null,
        site_id: form.site_id || null,
        quote_id: form.quote_id || null,
        job_id: form.job_id || null,
        number: form.number.trim(),
        status: form.status,
        issue_date: form.issue_date,
        due_date: form.due_date || null,
        subtotal: totals.taxableSubtotal,
        discount_amount: totals.invoiceDiscount,
        tax_amount: totals.taxAmount,
        total_amount: totals.totalAmount,
        amount_paid: totals.amountPaid,
        amount_due: totals.amountDue,
        paid_at: form.paid_at || null,
        payment_method: form.payment_method || null,
        payment_reference: form.payment_reference || null,
        notes: form.notes || null,
      };

      let savedInvoice;

      if (isEdit) {
        savedInvoice = await updateInvoice(id, invoicePayload);
      } else {
        savedInvoice = await createInvoice(invoicePayload);
      }

      const invoice = savedInvoice?.invoice || savedInvoice;
      const invoiceId = invoice?.id || id;

      if (!invoiceId) {
        throw new Error(
          "La facture a été enregistrée mais son identifiant est introuvable."
        );
      }

      /*
       * Les positions des InvoiceItems sont uniques par facture.
       *
       * Exemple :
       *   ligne A -> position 1
       *   ligne B -> position 2
       *
       * Si A est supprimée, B devient position 1 côté frontend.
       * Mais A existe encore en base au moment du PATCH de B.
       *
       * Pour éviter toute collision, les lignes existantes passent
       * d'abord par des positions temporaires uniques.
       */
      if (isEdit && existingInvoiceItemIds.length > 0) {
        const existingLines = calculatedLines.filter((line) => line.id);

        for (const [index, line] of existingLines.entries()) {
          await updateInvoiceItem(line.id, {
            invoice_id: invoiceId,
            service_item_id: line.service_item_id || null,
            description: line.description.trim(),
            unit: line.unit.trim(),
            quantity: line.quantity,
            unit_price: line.unit_price,
            discount_percentage: line.discount_percentage,
            tax_rate: line.tax_rate,
            subtotal: line.subtotal,
            tax_amount: line.tax_amount,
            total_amount: line.total_amount,
            position: -(index + 1),
          });
        }
      }

      const savedLineIds = new Set();

      /*
       * Les lignes supprimées sont supprimées après le passage
       * en positions temporaires, mais avant l'attribution des
       * positions finales.
       */
      if (isEdit) {
        const currentLineIds = new Set(
          calculatedLines.map((line) => line.id).filter(Boolean)
        );

        const removedIds = existingInvoiceItemIds.filter(
          (existingId) => !currentLineIds.has(existingId)
        );

        for (const removedId of removedIds) {
          await deleteInvoiceItem(removedId);
        }
      }

      /*
       * Maintenant que les anciennes positions ne peuvent plus
       * entrer en conflit, on applique les positions finales.
       *
       * Les nouvelles lignes sont créées directement avec leur
       * position finale.
       */
      for (const line of calculatedLines) {
        const linePayload = {
          invoice_id: invoiceId,
          service_item_id: line.service_item_id || null,
          description: line.description.trim(),
          unit: line.unit.trim(),
          quantity: line.quantity,
          unit_price: line.unit_price,
          discount_percentage: line.discount_percentage,
          tax_rate: line.tax_rate,
          subtotal: line.subtotal,
          tax_amount: line.tax_amount,
          total_amount: line.total_amount,
          position: line.position,
        };

        if (line.id) {
          await updateInvoiceItem(line.id, linePayload);
          savedLineIds.add(line.id);
        } else {
          const createdItem = await createInvoiceItem(linePayload);

          const createdId =
            createdItem?.invoice_item?.id || createdItem?.id;

          if (createdId) {
            savedLineIds.add(createdId);
          }
        }
      }

      navigate(`/invoices/${invoiceId}`);
    } catch (requestError) {
      console.error(requestError);

      const messages = requestError?.response?.data?.messages;

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
        <p className="text-sm text-slate-500">
          Chargement du formulaire...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/invoices")}
              className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Retour aux factures
            </button>

            <h1 className="text-2xl font-semibold text-slate-900">
              {isEdit
                ? "Modifier la facture"
                : "Nouvelle facture"}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Créez une facture et ses lignes de facturation.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Informations générales
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Client *
                </label>

                <select
                  name="customer_id"
                  value={form.customer_id}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="">
                    Sélectionner un client
                  </option>

                  {customers.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.company_name ||
                        customer.name ||
                        `${customer.first_name || ""} ${
                          customer.last_name || ""
                        }`.trim() ||
                        customer.email ||
                        customer.id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Site
                </label>

                <select
                  name="site_id"
                  value={form.site_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="">Aucun site</option>

                  {filteredSites.map((site) => (
                    <option
                      key={site.id}
                      value={site.id}
                    >
                      {site.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Devis
                </label>

                <select
                  name="quote_id"
                  value={form.quote_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="">Aucun devis</option>

                  {filteredQuotes.map((quote) => (
                    <option
                      key={quote.id}
                      value={quote.id}
                    >
                      {quote.number} — {quote.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Job
                </label>

                <select
                  name="job_id"
                  value={form.job_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="">Aucun job</option>

                  {filteredJobs.map((job) => (
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
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Numéro *
                </label>

                <input
                  type="text"
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  required
                  placeholder="INV-2026-0003"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Statut
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="issued">Émise</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Date d'émission *
                </label>

                <input
                  type="date"
                  name="issue_date"
                  value={form.issue_date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Date d'échéance
                </label>

                <input
                  type="date"
                  name="due_date"
                  value={form.due_date}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Lignes de facture
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Ajoutez les prestations facturées.
                </p>
              </div>

              <button
                type="button"
                onClick={addLine}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                <Plus size={16} />
                Ajouter une ligne
              </button>
            </div>

            <div className="space-y-4">
              {calculatedLines.map((line, index) => (
                <div
                  key={line.id || `new-${index}`}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-slate-900">
                      Ligne {index + 1}
                    </h3>

                    <button
                      type="button"
                      onClick={() => removeLine(index)}
                      className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Prestation
                      </label>

                      <select
                        value={line.service_item_id}
                        onChange={(event) =>
                          handleLineChange(
                            index,
                            "service_item_id",
                            event.target.value
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      >
                        <option value="">
                          Saisie libre / aucune prestation
                        </option>

                        {serviceItems.map(
                          (serviceItem) => (
                            <option
                              key={serviceItem.id}
                              value={serviceItem.id}
                            >
                              {serviceItem.code
                                ? `${serviceItem.code} — `
                                : ""}
                              {serviceItem.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="lg:col-span-2">
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Description *
                      </label>

                      <input
                        type="text"
                        value={line.description}
                        onChange={(event) =>
                          handleLineChange(
                            index,
                            "description",
                            event.target.value
                          )
                        }
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Quantité
                      </label>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={line.quantity}
                        onChange={(event) =>
                          handleLineChange(
                            index,
                            "quantity",
                            event.target.value
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Unité *
                      </label>

                      <input
                        type="text"
                        value={line.unit}
                        onChange={(event) =>
                          handleLineChange(
                            index,
                            "unit",
                            event.target.value
                          )
                        }
                        required
                        placeholder="m², h, forfait..."
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Prix unitaire
                      </label>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={line.unit_price}
                        onChange={(event) =>
                          handleLineChange(
                            index,
                            "unit_price",
                            event.target.value
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Remise %
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={line.discount_percentage}
                        onChange={(event) =>
                          handleLineChange(
                            index,
                            "discount_percentage",
                            event.target.value
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        TVA %
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={line.tax_rate}
                        onChange={(event) =>
                          handleLineChange(
                            index,
                            "tax_rate",
                            event.target.value
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Sous-total
                      </label>

                      <input
                        type="text"
                        value={`${line.subtotal.toFixed(
                          2
                        )} €`}
                        readOnly
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        TVA
                      </label>

                      <input
                        type="text"
                        value={`${line.tax_amount.toFixed(
                          2
                        )} €`}
                        readOnly
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Total
                      </label>

                      <input
                        type="text"
                        value={`${line.total_amount.toFixed(
                          2
                        )} €`}
                        readOnly
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Paiement
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Montant payé
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="amount_paid"
                    value={form.amount_paid}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Mode de paiement
                  </label>

                  <input
                    type="text"
                    name="payment_method"
                    value={form.payment_method}
                    onChange={handleChange}
                    placeholder="Virement, CB, chèque..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Référence de paiement
                  </label>

                  <input
                    type="text"
                    name="payment_reference"
                    value={form.payment_reference}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Date de paiement
                  </label>

                  <input
                    type="date"
                    name="paid_at"
                    value={form.paid_at}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Totaux
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Sous-total
                  </span>

                  <span className="font-medium">
                    {totals.grossSubtotal.toFixed(2)} €
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label
                    htmlFor="discount_amount"
                    className="text-slate-500"
                  >
                    Remise facture
                  </label>

                  <input
                    id="discount_amount"
                    type="number"
                    min="0"
                    step="0.01"
                    name="discount_amount"
                    value={form.discount_amount}
                    onChange={handleChange}
                    className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-right text-sm"
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Base taxable
                  </span>

                  <span className="font-medium">
                    {totals.taxableSubtotal.toFixed(2)} €
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    TVA
                  </span>

                  <span className="font-medium">
                    {totals.taxAmount.toFixed(2)} €
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>

                    <span>
                      {totals.totalAmount.toFixed(2)} €
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Payé
                  </span>

                  <span>
                    {totals.amountPaid.toFixed(2)} €
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-slate-900">
                  <span>Reste dû</span>

                  <span>
                    {totals.amountDue.toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Notes
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Informations complémentaires..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </section>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/invoices")}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />

              {saving
                ? "Enregistrement..."
                : isEdit
                  ? "Enregistrer les modifications"
                  : "Créer la facture"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} export default InvoiceFormPage;