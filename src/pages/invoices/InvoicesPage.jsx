
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Edit,
  Eye,
  FileText,
  Plus,
  Search,
  Trash2,
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
          setInvoices(Array.isArray(data) ? data : data.invoices || []);
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
        statusFilter === "all" || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  const totalAmount = useMemo(
    () =>
      invoices.reduce(
        (sum, invoice) => sum + Number(invoice.total_amount || 0),
        0
      ),
    [invoices]
  );

  const totalPaid = useMemo(
    () =>
      invoices.reduce(
        (sum, invoice) => sum + Number(invoice.amount_paid || 0),
        0
      ),
    [invoices]
  );

  const totalDue = useMemo(
    () =>
      invoices.reduce(
        (sum, invoice) => sum + Number(invoice.amount_due || 0),
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
        <div>
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-gray-600" />

            <h1 className="text-2xl font-bold text-gray-900">
              Facturation
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Gérez vos factures, paiements et montants restant dus.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/invoices/new")}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Nouvelle facture
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total facturé</p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatAmount(totalAmount)}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total encaissé</p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatAmount(totalPaid)}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Reste à encaisser</p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatAmount(totalDue)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher une facture ou un client..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="issued">Émise</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-gray-500">
              Chargement des factures…
            </p>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <FileText className="h-10 w-10 text-gray-300" />

            <h2 className="mt-4 text-base font-semibold text-gray-900">
              Aucune facture trouvée
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Modifiez votre recherche ou créez une nouvelle facture.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1050px] divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Facture
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Client
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Émission
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Échéance
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Total
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Reste dû
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Statut
                  </th>

                  <th className="sticky right-0 z-20 bg-gray-50 px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.35)]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredInvoices.map((invoice) => {
                  const amountDue = Number(invoice.amount_due || 0);

                  return (
                    <tr
                      key={invoice.id}
                      className="group hover:bg-gray-50"
                    >
                      {/* Invoice */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                            <FileText className="h-4 w-4 text-gray-600" />
                          </div>

                          <p className="text-sm font-semibold text-gray-900">
                            {invoice.number}
                          </p>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
                        {getCustomerName(invoice)}
                      </td>

                      {/* Issue date */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CalendarDays className="h-4 w-4 text-gray-400" />

                          {formatDate(invoice.issue_date)}
                        </div>
                      </td>

                      {/* Due date */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
                        {formatDate(invoice.due_date)}
                      </td>

                      {/* Total */}
                      <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-semibold text-gray-900">
                        {formatAmount(invoice.total_amount)}
                      </td>

                      {/* Amount due */}
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <span
                          className={
                            amountDue > 0
                              ? "text-sm font-semibold text-red-600"
                              : "text-sm font-semibold text-green-600"
                          }
                        >
                          {formatAmount(invoice.amount_due)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {STATUS_LABELS[invoice.status] ||
                            invoice.status ||
                            "—"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="sticky right-0 z-10 whitespace-nowrap bg-white px-5 py-4 text-right shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.35)] group-hover:bg-gray-50">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/invoices/${invoice.id}`)
                            }
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                            title="Voir la facture"
                            aria-label={`Voir la facture ${invoice.number}`}
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/invoices/${invoice.id}/edit`)
                            }
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                            title="Modifier la facture"
                            aria-label={`Modifier la facture ${invoice.number}`}
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(invoice)}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
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
        <p className="text-sm text-gray-500">
          {filteredInvoices.length} facture
          {filteredInvoices.length > 1 ? "s" : ""} affichée
          {filteredInvoices.length > 1 ? "s" : ""}.
        </p>
      )}
    </div>
  );
}