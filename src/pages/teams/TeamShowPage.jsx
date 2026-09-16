import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  UserRound,
  UserRoundCheck,
  UsersRound,
  X,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteTeam, getTeam } from "../../services/teams";
import {
  addTeamMember,
  getAvailableTeamMembers,
  getTeamMembers,
  removeTeamMember,
  updateTeamMember,
} from "../../services/teamMembers";

const getTeamStatus = (team) => team?.active !== false;

const getInitial = (name) =>
  name?.trim()?.charAt(0)?.toUpperCase() || "É";

const getFullName = (user) => {
  if (!user) {
    return "Utilisateur";
  }

  const name = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || user.email || "Utilisateur";
};

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("fr-FR").format(
    new Date(`${date}T00:00:00`),
  );
};

function StatusBadge({ active }) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
        <CheckCircle2 size={13} />
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
      <XCircle size={13} />
      Inactive
    </span>
  );
}

function MembershipRoleBadge({ role }) {
  if (!role) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100">
      <ShieldCheck size={12} />
      {role}
    </span>
  );
}

function MemberModal({
  mode,
  member,
  availableMembers,
  loading,
  error,
  onClose,
  onSubmit,
}) {
  const isEdit = mode === "edit";

  const [userId, setUserId] = useState(member?.user_id || "");
  const [role, setRole] = useState(member?.role || "member");
  const [active, setActive] = useState(member?.active !== false);
  const [startDate, setStartDate] = useState(member?.start_date || "");
  const [endDate, setEndDate] = useState(member?.end_date || "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      user_id: userId,
      role: role.trim() || "member",
      active,
      start_date: startDate || null,
      end_date: endDate || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-indigo-50/70 via-white to-white px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              {isEdit ? (
                <Pencil size={18} />
              ) : (
                <UserRoundCheck size={18} />
              )}
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {isEdit ? "Modifier le membre" : "Ajouter un membre"}
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {isEdit
                  ? "Modifiez les informations de cette appartenance."
                  : "Ajoutez un collaborateur à cette équipe."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            title="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <AlertCircle size={16} />
                </div>

                <div>
                  <p className="font-semibold text-red-800">
                    Impossible d'enregistrer
                  </p>

                  <p className="mt-1 leading-5">{error}</p>
                </div>
              </div>
            )}

            {!isEdit && (
              <div>
                <label
                  htmlFor="team-member-user"
                  className="block text-sm font-medium text-slate-700"
                >
                  Collaborateur
                </label>

                <select
                  id="team-member-user"
                  value={userId}
                  onChange={(event) => setUserId(event.target.value)}
                  required
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                >
                  <option value="">
                    Sélectionner un collaborateur
                  </option>

                  {availableMembers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {getFullName(user)} — {user.email}
                    </option>
                  ))}
                </select>

                {availableMembers.length === 0 && (
                  <div className="mt-2 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
                    <UsersRound
                      size={14}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <span>
                      Aucun collaborateur actif n'est disponible pour cette
                      équipe.
                    </span>
                  </div>
                )}
              </div>
            )}

            {isEdit && member?.user && (
              <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                  {getInitial(getFullName(member.user))}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {getFullName(member.user)}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {member.user.email}
                  </p>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="team-member-role"
                className="block text-sm font-medium text-slate-700"
              >
                Rôle dans l'équipe
              </label>

              <input
                id="team-member-role"
                type="text"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="member"
                disabled={loading}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                Le rôle dans l'équipe est distinct du rôle global du
                collaborateur dans GreenPilot.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="team-member-start-date"
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-700"
                >
                  <CalendarDays size={14} className="text-indigo-500" />
                  Date de début
                </label>

                <input
                  id="team-member-start-date"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              <div>
                <label
                  htmlFor="team-member-end-date"
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-700"
                >
                  <CalendarDays size={14} className="text-indigo-500" />
                  Date de fin
                </label>

                <input
                  id="team-member-end-date"
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>
            </div>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/30">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Appartenance active
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Le collaborateur est actuellement membre de cette équipe.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={active}
                onChange={(event) => setActive(event.target.checked)}
                disabled={loading}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>

          {/* Modal footer */}
          <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50/80 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading || (!isEdit && !userId)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}

              {isEdit ? "Enregistrer" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TeamShowPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(true);
  const [memberSaving, setMemberSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [membersError, setMembersError] = useState("");

  const [memberModal, setMemberModal] = useState(null);
  const [memberModalError, setMemberModalError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTeam(id);

        if (!cancelled) {
          setTeam(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load team:", err);

          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "Impossible de charger cette équipe.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTeam();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    const fetchMembers = async () => {
      try {
        setMembersLoading(true);
        setMembersError("");

        const data = await getTeamMembers(id);

        if (!cancelled) {
          setMembers(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load team members:", err);

          setMembersError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "Impossible de charger les membres de cette équipe.",
          );
        }
      } finally {
        if (!cancelled) {
          setMembersLoading(false);
        }
      }
    };

    fetchMembers();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const refreshMembers = async () => {
    try {
      setMembersLoading(true);
      setMembersError("");

      const data = await getTeamMembers(id);

      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to refresh team members:", err);

      setMembersError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Impossible de charger les membres de cette équipe.",
      );
    } finally {
      setMembersLoading(false);
    }
  };

  const loadAvailableMembers = async () => {
    try {
      const data = await getAvailableTeamMembers(id);

      setAvailableMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load available team members:", err);

      throw new Error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Impossible de charger les collaborateurs disponibles.",
        {
          cause: err,
        },
      );
    }
  };

  const openAddMemberModal = async () => {
    try {
      setMemberModalError("");
      setAvailableMembers([]);
      setMemberModal({ mode: "add", member: null });

      await loadAvailableMembers();
    } catch (err) {
      setMemberModalError(err.message);
    }
  };

  const openEditMemberModal = (member) => {
    setMemberModalError("");
    setMemberModal({ mode: "edit", member });
  };

  const closeMemberModal = () => {
    if (memberSaving) {
      return;
    }

    setMemberModal(null);
    setMemberModalError("");
  };

  const handleMemberSubmit = async (membershipData) => {
    if (!memberModal) {
      return;
    }

    try {
      setMemberSaving(true);
      setMemberModalError("");

      if (memberModal.mode === "add") {
        await addTeamMember(id, membershipData);
      } else {
        await updateTeamMember(
          id,
          memberModal.member.id,
          membershipData,
        );
      }

      setMemberModal(null);
      setMemberModalError("");

      await refreshMembers();
    } catch (err) {
      console.error("Failed to save team member:", err);

      setMemberModalError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.response?.data?.messages?.join(", ") ||
          "Impossible d'enregistrer ce membre.",
      );
    } finally {
      setMemberSaving(false);
    }
  };

  const handleRemoveMember = async (member) => {
    const name = getFullName(member.user);

    const confirmed = window.confirm(
      `Voulez-vous vraiment retirer ${name} de l'équipe « ${team.name} » ?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setMembersError("");

      await removeTeamMember(id, member.id);

      await refreshMembers();
    } catch (err) {
      console.error("Failed to remove team member:", err);

      setMembersError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Impossible de retirer ce membre de l'équipe.",
      );
    }
  };

  const handleDelete = async () => {
    if (!team) {
      return;
    }

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'équipe « ${team.name} » ?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteTeam(team.id);

      navigate("/teams");
    } catch (err) {
      console.error("Failed to delete team:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Impossible de supprimer cette équipe.",
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
          <Loader2 size={20} className="animate-spin" />
        </div>

        <p className="mt-4 text-sm font-medium text-slate-700">
          Chargement de l'équipe...
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Récupération des informations
        </p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/teams")}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft size={17} />
          Retour aux équipes
        </button>

        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />

          <div>
            <p className="font-semibold text-red-800">
              Impossible d'afficher cette équipe
            </p>

            <p className="mt-1 leading-5">
              {error || "Cette équipe est introuvable."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const active = getTeamStatus(team);
  const activeMembers = members.filter(
    (member) => member.active !== false,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => navigate("/teams")}
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            title="Retour aux équipes"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                <UsersRound size={18} />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
                Équipe
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                {team.name}
              </h1>

              <StatusBadge active={active} />
            </div>

            <p className="mt-1 font-mono text-sm text-slate-500">
              {team.code}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(`/teams/${team.id}/edit`)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          >
            <Pencil size={16} />
            Modifier
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 py-2.5 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            Supprimer
          </button>
        </div>
      </div>

      {/* Global error */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <AlertCircle size={17} />
          </div>

          <div>
            <p className="font-semibold text-red-800">
              Une erreur est survenue
            </p>

            <p className="mt-1 leading-5">{error}</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="space-y-6 lg:col-span-2">
          {/* Team information */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50/60 via-white to-white px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                  <UsersRound size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Informations de l'équipe
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Identité et configuration de l'équipe.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-semibold text-white shadow-sm"
                  style={{
                    backgroundColor: team.color || "#4f46e5",
                  }}
                >
                  {getInitial(team.name)}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {team.name}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-medium text-slate-600">
                      {team.code || "Sans code"}
                    </span>

                    <StatusBadge active={active} />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <UsersRound size={15} />
                    </div>

                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Membres
                    </span>
                  </div>

                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {activeMembers.length}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    membre{activeMembers.length !== 1 ? "s" : ""} actif
                    {activeMembers.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Statut
                    </span>
                  </div>

                  <div className="mt-3">
                    <StatusBadge active={active} />
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Description
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                  {team.description || "Aucune description renseignée."}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Couleur de l'équipe
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <span
                    className="h-8 w-8 rounded-lg border border-slate-200 shadow-sm"
                    style={{
                      backgroundColor: team.color || "#4f46e5",
                    }}
                  />

                  <span className="font-mono text-sm text-slate-600">
                    {team.color || "#4f46e5"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Members */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50/40 via-white to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                  <UserRoundCheck size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Membres de l'équipe
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {activeMembers.length} membre
                    {activeMembers.length !== 1 ? "s" : ""} actif
                    {activeMembers.length !== 1 ? "s" : ""}
                    {members.length !== activeMembers.length &&
                      ` · ${
                        members.length - activeMembers.length
                      } inactif${
                        members.length - activeMembers.length !== 1
                          ? "s"
                          : ""
                      }`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={openAddMemberModal}
                disabled={membersLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Plus size={16} />
                Ajouter un membre
              </button>
            </div>

            {membersError && (
              <div
                role="alert"
                className="m-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle size={17} className="mt-0.5 shrink-0" />

                <div>
                  <p className="font-semibold text-red-800">
                    Impossible de charger les membres
                  </p>

                  <p className="mt-1">{membersError}</p>
                </div>
              </div>
            )}

            {membersLoading ? (
              <div className="flex min-h-52 flex-col items-center justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Loader2 size={19} className="animate-spin" />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-700">
                  Chargement des membres...
                </p>
              </div>
            ) : members.length === 0 ? (
              <div className="flex min-h-52 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                  <UserRound size={21} />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-900">
                  Aucun membre
                </p>

                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                  Ajoutez les collaborateurs qui doivent travailler au sein de
                  cette équipe.
                </p>

                <button
                  type="button"
                  onClick={openAddMemberModal}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                >
                  <Plus size={14} />
                  Ajouter le premier membre
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {members.map((member) => {
                  const user = member.user;
                  const name = getFullName(user);
                  const email = user?.email || "";
                  const globalRole = user?.role || "—";

                  return (
                    <div
                      key={member.id}
                      className="group px-6 py-4 transition hover:bg-indigo-50/20"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
                            {getInitial(name)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {name}
                            </p>

                            {email && (
                              <p className="mt-0.5 truncate text-xs text-slate-500">
                                {email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                            <ShieldCheck size={12} />
                            {globalRole}
                          </span>

                          <MembershipRoleBadge role={member.role} />

                          <StatusBadge active={member.active !== false} />

                          <button
                            type="button"
                            onClick={() => openEditMemberModal(member)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                            title="Modifier le membre"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveMember(member)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Retirer le membre"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {(member.start_date || member.end_date) && (
                        <div className="mt-3 flex items-center gap-2 pl-14 text-xs text-slate-500">
                          <Clock3 size={13} className="text-indigo-400" />

                          <span>
                            Du {formatDate(member.start_date)} au{" "}
                            {formatDate(member.end_date)}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-indigo-50/40 px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Vue d'ensemble
              </h2>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <UsersRound size={16} className="text-indigo-500" />

                  <span className="text-sm text-slate-600">
                    Membres
                  </span>
                </div>

                <span className="text-sm font-semibold text-slate-900">
                  {members.length}
                </span>
              </div>

              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <UserRoundCheck
                    size={16}
                    className="text-emerald-500"
                  />

                  <span className="text-sm text-slate-600">
                    Actifs
                  </span>
                </div>

                <span className="text-sm font-semibold text-emerald-600">
                  {activeMembers.length}
                </span>
              </div>

              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-indigo-500"
                  />

                  <span className="text-sm text-slate-600">
                    Équipe
                  </span>
                </div>

                <StatusBadge active={active} />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <UsersRound size={18} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Organisation terrain
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Coordination des collaborateurs
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Cette équipe peut être associée aux interventions, aux
              collaborateurs, aux véhicules et au planning opérationnel de
              GreenPilot.
            </p>
          </section>
        </aside>
      </div>

      {memberModal && (
        <MemberModal
          mode={memberModal.mode}
          member={memberModal.member}
          availableMembers={availableMembers}
          loading={memberSaving}
          error={memberModalError}
          onClose={closeMemberModal}
          onSubmit={handleMemberSubmit}
        />
      )}
    </div>
  );
}