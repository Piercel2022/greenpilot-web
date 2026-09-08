import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  UsersRound,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteTeam, getTeams } from "../../services/teams";

const getTeamStatus = (team) => {
  return team.active !== false;
};

const getMemberCount = (team) => {
  if (Array.isArray(team.team_memberships)) {
    return team.team_memberships.length;
  }

  if (Array.isArray(team.users)) {
    return team.users.length;
  }

  if (typeof team.members_count === "number") {
    return team.members_count;
  }

  return null;
};

function StatusBadge({ active }) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
        <CheckCircle2 size={13} />
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
      <XCircle size={13} />
      Inactive
    </span>
  );
}

 function TeamsPage() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const loadTeams = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTeams();

      setTeams(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load teams:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Impossible de charger les équipes."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchTeams = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTeams();

        if (!cancelled) {
          setTeams(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load teams:", err);

          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "Impossible de charger les équipes."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTeams();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (team) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'équipe « ${team.name} » ?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(team.id);
      setError("");

      await deleteTeam(team.id);

      setTeams((currentTeams) =>
        currentTeams.filter((currentTeam) => currentTeam.id !== team.id)
      );
    } catch (err) {
      console.error("Failed to delete team:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Impossible de supprimer cette équipe."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTeams = teams.filter((team) => {
    if (statusFilter === "active") {
      return getTeamStatus(team);
    }

    if (statusFilter === "inactive") {
      return !getTeamStatus(team);
    }

    return true;
  });

  const activeTeamsCount = teams.filter(getTeamStatus).length;
  const inactiveTeamsCount = teams.length - activeTeamsCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Équipes
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Organisez vos équipes et préparez la gestion de vos collaborateurs
            terrain.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadTeams}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Actualiser
          </button>

          <button
            type="button"
            onClick={() => navigate("/teams/new")}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Plus size={17} />
            Nouvelle équipe
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />

          <div className="flex-1">
            <p className="font-medium">Une erreur est survenue</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Toutes les équipes
          </p>

          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {teams.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Équipes actives
          </p>

          <p className="mt-2 text-2xl font-semibold text-emerald-600">
            {activeTeamsCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Équipes inactives
          </p>

          <p className="mt-2 text-2xl font-semibold text-slate-600">
            {inactiveTeamsCount}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Liste des équipes
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {filteredTeams.length} équipe
            {filteredTeams.length !== 1 ? "s" : ""} affichée
            {filteredTeams.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              statusFilter === "all"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Toutes
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("active")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              statusFilter === "active"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Actives
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("inactive")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              statusFilter === "inactive"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Inactives
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 size={18} className="animate-spin" />
              Chargement des équipes...
            </div>
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <UsersRound size={22} className="text-slate-500" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              {teams.length === 0
                ? "Aucune équipe"
                : "Aucune équipe correspondante"}
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              {teams.length === 0
                ? "Commencez par créer votre première équipe."
                : "Aucune équipe ne correspond au filtre sélectionné."}
            </p>

            {teams.length === 0 && (
              <button
                type="button"
                onClick={() => navigate("/teams/new")}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <Plus size={17} />
                Créer une équipe
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Équipe
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Code
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Membres
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Statut
                    </th>

                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredTeams.map((team) => {
                    const active = getTeamStatus(team);
                    const memberCount = getMemberCount(team);

                    return (
                      <tr
                        key={team.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
                              style={{
                                backgroundColor:
                                  team.color || "#0f172a",
                              }}
                            >
                              {team.name?.charAt(0)?.toUpperCase() || "É"}
                            </div>

                            <div className="min-w-0">
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(`/teams/${team.id}`)
                                }
                                className="truncate text-left text-sm font-semibold text-slate-900 hover:text-slate-600"
                              >
                                {team.name || "Équipe sans nom"}
                              </button>

                              {team.description && (
                                <p className="mt-0.5 max-w-md truncate text-xs text-slate-500">
                                  {team.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-700">
                            {team.code}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <UsersRound size={16} className="text-slate-400" />

                            {memberCount === null
                              ? "—"
                              : `${memberCount} membre${
                                  memberCount !== 1 ? "s" : ""
                                }`}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <StatusBadge active={active} />
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/teams/${team.id}`)
                              }
                              title="Voir"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/teams/${team.id}/edit`)
                              }
                              title="Modifier"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(team)}
                              disabled={deletingId === team.id}
                              title="Supprimer"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === team.id ? (
                                <Loader2
                                  size={17}
                                  className="animate-spin"
                                />
                              ) : (
                                <Trash2 size={17} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-200 md:hidden">
              {filteredTeams.map((team) => {
                const active = getTeamStatus(team);
                const memberCount = getMemberCount(team);

                return (
                  <div key={team.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
                        style={{
                          backgroundColor: team.color || "#0f172a",
                        }}
                      >
                        {team.name?.charAt(0)?.toUpperCase() || "É"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/teams/${team.id}`)
                            }
                            className="text-left text-sm font-semibold text-slate-900"
                          >
                            {team.name || "Équipe sans nom"}
                          </button>

                          <StatusBadge active={active} />
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-700">
                            {team.code}
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                            <UsersRound size={14} />

                            {memberCount === null
                              ? "Membres —"
                              : `${memberCount} membre${
                                  memberCount !== 1 ? "s" : ""
                                }`}
                          </span>
                        </div>

                        {team.description && (
                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            {team.description}
                          </p>
                        )}

                        <div className="mt-3 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/teams/${team.id}`)
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            <Eye size={15} />
                            Voir
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/teams/${team.id}/edit`)
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            <Pencil size={15} />
                            Modifier
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(team)}
                            disabled={deletingId === team.id}
                            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === team.id ? (
                              <Loader2
                                size={15}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={15} />
                            )}
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default TeamsPage;