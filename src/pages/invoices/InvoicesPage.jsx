import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CircleCheck,
  CircleDollarSign,
  Edit,
  Eye,
  FileText,
  Plus,
  Receipt,
  Search,
  Trash2,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteInvoice, getInvoices } from "../../services/invoices";

const STATUS_LABELS = {
  issued: "Émise",
};

const formatDate = (value) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
};

const formatAmount = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value));
};

const getCustomerName = (invoice) => {
  if (invoice.customer?.name) {
    return invoice.customer.name;
  }

  if (invoice.customer?.company_name) {
    return invoice.customer.company_name;
  }

  if (invoice.customer_name) {
    return invoice.customer_name;
  }

  return invoice.customer_id || "Client";
};

export default function InvoicesPage() {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;

    const fetchInvoices = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getInvoices();

        if (!cancelled) {
          setInvoices(
            Array.isArray(data) ? data : data.invoices || []
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.error ||
              "Impossible de charger les factures."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchInvoices();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredInvoices = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const customerName = getCustomerName(invoice).toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        invoice.number?.toLowerCase().includes(normalizedSearch) ||
        customerName.includes(normalizedSearch) ||
        invoice.status?.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  const totalAmount = useMemo(
    () =>
      invoices.reduce(
        (sum, invoice) =>
          sum + Number(invoice.total_amount || 0),
        0
      ),
    [invoices]
  );

  const totalPaid = useMemo(
    () =>
      invoices.reduce(
        (sum, invoice) =>
          sum + Number(invoice.amount_paid || 0),
        0
      ),
    [invoices]
  );

  const totalDue = useMemo(
    () =>
      invoices.reduce(
        (sum, invoice) =>
          sum + Number(invoice.amount_due || 0),
        0
      ),
    [invoices]
  );

  const handleDelete = async (invoice) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer la facture "${invoice.number}" ?`
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteInvoice(invoice.id);

      setInvoices((current) =>
        current.filter((item) => item.id !== invoice.id)
      );
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Impossible de supprimer cette facture."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <Receipt className="h-5 w-5 text-emerald-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Facturation
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Gérez vos factures, paiements et montants restant dus.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/invoices/new")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Nouvelle facture
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <CircleDollarSign className="mt-0.5 h-5 w-5 shrink-0" />

          <span>{error}</span>
        </div>
      )}

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total facturé
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatAmount(totalAmount)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <Receipt className="h-5 w-5 text-emerald-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Montant total des factures
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total encaissé
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatAmount(totalPaid)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
              <Wallet className="h-5 w-5 text-green-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Paiements déjà reçus
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Reste à encaisser
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatAmount(totalDue)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <CircleDollarSign className="h-5 w-5 text-amber-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Montants encore dus
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher une facture ou un client..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
          >
            <option value="all">Tous les statuts</option>
            <option value="issued">Émise</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <Receipt className="h-6 w-6 text-emerald-600" />
              </div>

              <p className="text-sm font-medium text-slate-500">
                Chargement des factures…
              </p>
            </div>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
              <FileText className="h-7 w-7 text-emerald-500" />
            </div>

            <h2 className="mt-4 text-base font-semibold text-slate-900">
              Aucune facture trouvée
            </h2>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              Modifiez votre recherche ou créez une nouvelle facture.
            </p>

            <button
              type="button"
              onClick={() => navigate("/invoices/new")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              Nouvelle facture
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1050px] divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Facture
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Client
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Émission
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Échéance
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Reste dû
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Statut
                  </th>

                  <th className="sticky right-0 z-20 bg-slate-50 px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 shadow-[-8px_0_12px_-12px_rgba(15,23,42,0.35)]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredInvoices.map((invoice) => {
                  const amountDue = Number(
                    invoice.amount_due || 0
                  );

                  return (
                    <tr
                      key={invoice.id}
                      className="group transition hover:bg-emerald-50/30"
                    >
                      {/* Invoice */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                            <FileText className="h-4 w-4 text-emerald-600" />
                          </div>

                          <p className="text-sm font-semibold text-slate-900">
                            {invoice.number}
                          </p>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                        {getCustomerName(invoice)}
                      </td>

                      {/* Issue date */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <CalendarDays className="h-4 w-4 text-slate-400" />

                          {formatDate(invoice.issue_date)}
                        </div>
                      </td>

                      {/* Due date */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                        {formatDate(invoice.due_date)}
                      </td>

                      {/* Total */}
                      <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-semibold text-slate-900">
                        {formatAmount(invoice.total_amount)}
                      </td>

                      {/* Amount due */}
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <span
                          className={
                            amountDue > 0
                              ? "text-sm font-semibold text-amber-600"
                              : "inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600"
                          }
                        >
                          {amountDue <= 0 && (
                            <CircleCheck className="h-4 w-4" />
                          )}

                          {formatAmount(invoice.amount_due)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          <CircleCheck className="h-3.5 w-3.5" />

                          {STATUS_LABELS[invoice.status] ||
                            invoice.status ||
                            "—"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="sticky right-0 z-10 whitespace-nowrap bg-white px-5 py-4 text-right shadow-[-8px_0_12px_-12px_rgba(15,23,42,0.35)] group-hover:bg-emerald-50/30">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/invoices/${invoice.id}`
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-sky-50 hover:text-sky-600"
                            title="Voir la facture"
                            aria-label={`Voir la facture ${invoice.number}`}
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/invoices/${invoice.id}/edit`
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                            title="Modifier la facture"
                            aria-label={`Modifier la facture ${invoice.number}`}
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(invoice)}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            title="Supprimer la facture"
                            aria-label={`Supprimer la facture ${invoice.number}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Result count */}
      {!loading && filteredInvoices.length > 0 && (
        <p className="text-sm text-slate-500">
          {filteredInvoices.length} facture
          {filteredInvoices.length > 1 ? "s" : ""} affichée
          {filteredInvoices.length > 1 ? "s" : ""}.
        </p>
      )}
    </div>
  );
}