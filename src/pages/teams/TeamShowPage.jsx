import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  UserRound,
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

function MembershipRoleBadge({ role }) {
  if (!role) {
    return null;
  }

  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {isEdit ? "Modifier le membre" : "Ajouter un membre"}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {isEdit
                ? "Modifiez les informations de cette appartenance."
                : "Ajoutez un collaborateur à cette équipe."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            title="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />

                <div>
                  <p className="font-medium">Impossible d'enregistrer</p>
                  <p className="mt-1">{error}</p>
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
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                >
                  <option value="">Sélectionner un collaborateur</option>

                  {availableMembers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {getFullName(user)} — {user.email}
                    </option>
                  ))}
                </select>

                {availableMembers.length === 0 && (
                  <p className="mt-2 text-xs text-slate-500">
                    Aucun collaborateur actif n'est disponible pour cette
                    équipe.
                  </p>
                )}
              </div>
            )}

            {isEdit && member?.user && (
              <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-600">
                  {getInitial(getFullName(member.user))}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
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
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Le rôle dans l'équipe est distinct du rôle global du
                collaborateur dans GreenPilot.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="team-member-start-date"
                  className="block text-sm font-medium text-slate-700"
                >
                  Date de début
                </label>

                <input
                  id="team-member-start-date"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              <div>
                <label
                  htmlFor="team-member-end-date"
                  className="block text-sm font-medium text-slate-700"
                >
                  Date de fin
                </label>

                <input
                  id="team-member-end-date"
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>
            </div>

            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Appartenance active
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Le collaborateur est actuellement membre de cette équipe.
                </p>
              </div>

              <input
                type="checkbox"
                checked={active}
                onChange={(event) => setActive(event.target.checked)}
                disabled={loading}
                className="h-4 w-4 rounded border-slate-300 text-slate-700 focus:ring-slate-400"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading || (!isEdit && !userId)}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
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
      <div className="flex min-h-96 items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 size={18} className="animate-spin" />
          Chargement de l'équipe...
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/teams")}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={17} />
          Retour aux équipes
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />

            <div>
              <p className="font-medium">
                Impossible d'afficher cette équipe
              </p>

              <p className="mt-1">
                {error || "Cette équipe est introuvable."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const active = getTeamStatus(team);
  const activeMembers = members.filter((member) => member.active !== false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => navigate("/teams")}
            className="mt-0.5 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            title="Retour aux équipes"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-2">
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/teams/${team.id}/edit`)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Pencil size={16} />
            Modifier
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3.5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
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

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />

          <div>
            <p className="font-medium">Une erreur est survenue</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Informations de l'équipe
              </h2>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-semibold text-white"
                  style={{
                    backgroundColor: team.color || "#0f172a",
                  }}
                >
                  {getInitial(team.name)}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {team.name}
                  </h3>

                  <p className="mt-1 font-mono text-sm text-slate-500">
                    {team.code}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Statut
                  </p>

                  <div className="mt-2">
                    <StatusBadge active={active} />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Couleur
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="h-6 w-6 rounded-md border border-slate-200"
                      style={{
                        backgroundColor: team.color || "#0f172a",
                      }}
                    />

                    <span className="font-mono text-sm text-slate-600">
                      {team.color || "Non définie"}
                    </span>
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
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Membres de l'équipe
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {activeMembers.length} membre
                  {activeMembers.length !== 1 ? "s" : ""} actif
                  {activeMembers.length !== 1 ? "s" : ""}
                  {members.length !== activeMembers.length &&
                    ` · ${members.length - activeMembers.length} inactif${
                      members.length - activeMembers.length !== 1 ? "s" : ""
                    }`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <UsersRound size={18} className="text-slate-400" />

                <button
                  type="button"
                  onClick={openAddMemberModal}
                  disabled={membersLoading}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Plus size={16} />
                  Ajouter un membre
                </button>
              </div>
            </div>

            {membersError && (
              <div className="m-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />

                <div>
                  <p className="font-medium">
                    Impossible de charger les membres
                  </p>
                  <p className="mt-1">{membersError}</p>
                </div>
              </div>
            )}

            {membersLoading ? (
              <div className="flex min-h-44 items-center justify-center">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 size={18} className="animate-spin" />
                  Chargement des membres...
                </div>
              </div>
            ) : members.length === 0 ? (
              <div className="flex min-h-44 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <UserRound size={18} className="text-slate-500" />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-700">
                  Aucun membre
                </p>

                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                  Ajoutez les collaborateurs qui doivent travailler au sein de
                  cette équipe.
                </p>

                <button
                  type="button"
                  onClick={openAddMemberModal}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Plus size={14} />
                  Ajouter le premier membre
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {members.map((member) => {
                  const user = member.user;
                  const name = getFullName(user);
                  const email = user?.email || "";
                  const globalRole = user?.role || "—";

                  return (
                    <div
                      key={member.id}
                      className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          {getInitial(name)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {name}
                          </p>

                          {email && (
                            <p className="truncate text-xs text-slate-500">
                              {email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                          {globalRole}
                        </span>

                        <MembershipRoleBadge role={member.role} />

                        <StatusBadge active={member.active !== false} />

                        <button
                          type="button"
                          onClick={() => openEditMemberModal(member)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
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

                      {(member.start_date || member.end_date) && (
                        <div className="w-full border-t border-slate-100 pt-3 text-xs text-slate-500 sm:hidden">
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

        <aside className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <UsersRound size={19} className="text-slate-600" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Membres actifs
                </p>

                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {activeMembers.length}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              À propos de cette équipe
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Cette équipe pourra être associée aux interventions, aux
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