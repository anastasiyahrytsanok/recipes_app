import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginPageContent } from "../model/loginPageContent";

import type { AppDispatch, RootState } from "@/app/store/store";
import { useLoginMutation } from "@/features/auth/api/authApi";
import { setTokens, setUser } from "@/features/auth/model/authSlice";
import { authStorage } from "@/shared/lib/authStorage";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SectionShell } from "@/shared/ui/SectionShell";
import "./LoginPage.css";

type LoginFormValues = {
  username: string;
  password: string;
};

const initialFormState: LoginFormValues = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<LoginFormValues>(initialFormState);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [login, { isLoading }] = useLoginMutation();
  const { user } = useSelector((state: RootState) => state.auth);

  const { header, form } = loginPageContent;

  useEffect(() => {
    if (user) {
      navigate({ to: "/recipes" });
    }
  }, [user, navigate]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const loginData = await login(formData).unwrap();

      authStorage.setTokens({
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
      });

      dispatch(
        setUser({
          id: loginData.id,
          username: loginData.username,
          email: loginData.email,
          firstName: loginData.firstName,
          lastName: loginData.lastName,
          image: loginData.image,
        }),
      );

      dispatch(
        setTokens({
          accessToken: loginData.accessToken,
          refreshToken: loginData.refreshToken,
        }),
      );

      navigate({ to: "/recipes" });
    } catch {
      setErrorMessage(form.messages.invalidCredentials);
    }
  };

  return (
    <section className="login">
      <PageHeader
        label={header.label}
        title={header.title}
        description={header.description}
      />

      <SectionShell className="login__section">
        <div className="login__card">
          <h2 className="login__card-title">{form.title}</h2>

          <form className="login__form" onSubmit={handleSubmit}>
            <input
              className="login__input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder={form.fields.username.placeholder}
              required
            />

            <input
              className="login__input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={form.fields.password.placeholder}
              required
            />

            <button
              className="login__button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? form.buttons.loading : form.buttons.submit}
            </button>
          </form>

          {errorMessage && <p className="login__error">{errorMessage}</p>}

          <p className="login__hint">
            {form.hint.label}{" "}
            <span className="login__hint-value">{form.hint.value}</span>
          </p>
        </div>
      </SectionShell>
    </section>
  );
};
