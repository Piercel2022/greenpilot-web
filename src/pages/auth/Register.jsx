
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    organization_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setErrors({});

    if (formData.password !== formData.password_confirmation) {
      setErrors({
        password_confirmation: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await register(formData);

      const token = response?.token;
      const user = response?.user;

      if (token) {
        localStorage.setItem("greenpilot_token", token);
      }

      if (user) {
        localStorage.setItem("greenpilot_user", JSON.stringify(user));
      }

      navigate("/dashboard");
    } catch (err) {
      const responseData = err?.response?.data;

      if (responseData?.errors) {
        setErrors(responseData.errors);
      } else if (responseData?.error) {
        setError(responseData.error);
      } else if (responseData?.message) {
        setError(responseData.message);
      } else {
        setError(
          "Impossible de créer le compte. Vérifiez les informations saisies."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-2xl font-bold text-slate-900"
            >
              GreenPilot
            </Link>

            <h1 className="mt-6 text-2xl font-semibold text-slate-900">
              Créer votre compte
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Commencez à gérer votre activité avec GreenPilot.
            </p>
          </div>

          {/* Global error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First name */}
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Prénom
              </label>

              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                autoComplete="given-name"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Votre prénom"
              />

              {errors.first_name && (
                <p className="mt-1 text-xs text-red-600">
                  {Array.isArray(errors.first_name)
                    ? errors.first_name.join(", ")
                    : errors.first_name}
                </p>
              )}
            </div>

            {/* Last name */}
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Nom
              </label>

              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                autoComplete="family-name"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Votre nom"
              />

              {errors.last_name && (
                <p className="mt-1 text-xs text-red-600">
                  {Array.isArray(errors.last_name)
                    ? errors.last_name.join(", ")
                    : errors.last_name}
                </p>
              )}
            </div>

            {/* Organization */}
            <div>
              <label
                htmlFor="organization_name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Nom de l'entreprise
              </label>

              <input
                id="organization_name"
                name="organization_name"
                type="text"
                value={formData.organization_name}
                onChange={handleChange}
                autoComplete="organization"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Nom de votre entreprise"
              />

              {errors.organization_name && (
                <p className="mt-1 text-xs text-red-600">
                  {Array.isArray(errors.organization_name)
                    ? errors.organization_name.join(", ")
                    : errors.organization_name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Adresse email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="vous@entreprise.fr"
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {Array.isArray(errors.email)
                    ? errors.email.join(", ")
                    : errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Mot de passe
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Minimum 8 caractères"
              />

              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {Array.isArray(errors.password)
                    ? errors.password.join(", ")
                    : errors.password}
                </p>
              )}
            </div>

            {/* Password confirmation */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Confirmer le mot de passe
              </label>

              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Confirmez votre mot de passe"
              />

              {errors.password_confirmation && (
                <p className="mt-1 text-xs text-red-600">
                  {Array.isArray(errors.password_confirmation)
                    ? errors.password_confirmation.join(", ")
                    : errors.password_confirmation}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Création du compte..." : "Créer mon compte"}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Se connecter
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} GreenPilot. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Register;
