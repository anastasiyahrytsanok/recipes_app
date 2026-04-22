import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { navigationContent } from "../model/navigationContent";

import { AppDispatch, RootState } from "@/app/store/store";
import { authApi } from "@/features/auth/api/authApi";
import { logout } from "@/features/auth/model/authSlice";
import { authStorage } from "@/shared/lib/authStorage";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import "./Navigation.css";

type NavigationLinkPath = "/" | "/login" | "/recipes" | "/about" | "/contact";

export const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.auth);

  const { links, buttons, burger, logoutModal } = navigationContent;

  const handleConfirmLogout = (): void => {
    authStorage.clearTokens();
    dispatch(logout());
    dispatch(authApi.util.resetApiState());
    setIsLogoutModalOpen(false);
    navigate({ to: "/" });
  };

  const handleCancelLogout = (): void => {
    setIsLogoutModalOpen(false);
  };

  const handleOpenLogoutModal = (): void => {
    setIsMenuOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleNavigate = (to: NavigationLinkPath): void => {
    setIsMenuOpen(false);
    navigate({ to });
  };

  const handleNavigateToHome = (): void => {
    handleNavigate("/");
  };

  const handleNavigateToLogin = (): void => {
    handleNavigate("/login");
  };

  const handleToggleMenu = (): void => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleCloseMenu = (): void => {
    setIsMenuOpen(false);
  };

  const burgerClassName = [
    "navigation__burger",
    isMenuOpen && "navigation__burger--active",
  ]
    .filter(Boolean)
    .join(" ");

  const mobileMenuClassName = [
    "navigation__mobile-menu",
    isMenuOpen && "navigation__mobile-menu--open",
  ]
    .filter(Boolean)
    .join(" ");

  const burgerAriaLabel = isMenuOpen ? burger.closeLabel : burger.openLabel;

  return (
    <>
      <header className="navigation">
        <div className="navigation__container">
          <button
            type="button"
            className="navigation__logo"
            onClick={handleNavigateToHome}
          >
            <span className="navigation__logo-tasty">
              {navigationContent.logo.primary}
            </span>
            <span className="navigation__logo-recipes">
              {" "}
              {navigationContent.logo.secondary}
            </span>
          </button>

          <nav className="navigation__menu navigation__menu--desktop">
            {links.map(({ label, to }) => (
              <Link key={to} to={to} className="navigation__link">
                {label}
              </Link>
            ))}
          </nav>

          <div className="navigation__actions navigation__actions--desktop">
            {user ? (
              <button
                type="button"
                className="navigation__login-button"
                onClick={handleOpenLogoutModal}
              >
                {buttons.logout}
              </button>
            ) : (
              <button
                type="button"
                className="navigation__login-button"
                onClick={handleNavigateToLogin}
              >
                {buttons.login}
              </button>
            )}
          </div>

          <button
            type="button"
            className={burgerClassName}
            onClick={handleToggleMenu}
            aria-label={burgerAriaLabel}
            aria-expanded={isMenuOpen}
          >
            <span className="navigation__burger-line" />
            <span className="navigation__burger-line" />
            <span className="navigation__burger-line" />
          </button>
        </div>

        <div className={mobileMenuClassName}>
          <nav className="navigation__mobile-nav">
            {links.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="navigation__mobile-link"
                onClick={handleCloseMenu}
              >
                {label}
              </Link>
            ))}

            {user ? (
              <button
                type="button"
                className="navigation__mobile-button"
                onClick={handleOpenLogoutModal}
              >
                {buttons.logout}
              </button>
            ) : (
              <button
                type="button"
                className="navigation__mobile-button"
                onClick={handleNavigateToLogin}
              >
                {buttons.login}
              </button>
            )}
          </nav>
        </div>
      </header>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title={logoutModal.title}
        description={logoutModal.description}
        confirmText={logoutModal.confirmText}
        cancelText={logoutModal.cancelText}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
};
