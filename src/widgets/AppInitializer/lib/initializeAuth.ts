import { AppDispatch } from "@/app/store/store";
import {
  useLazyGetMeQuery,
  useRefreshSessionMutation,
} from "@/features/auth/api/authApi";
import {
  logout,
  setInitialized,
  setTokens,
  setUser,
} from "@/features/auth/model/authSlice";
import { authStorage } from "@/shared/lib/authStorage";

type GetMeFn = ReturnType<typeof useLazyGetMeQuery>[0];
type RefreshSessionFn = ReturnType<typeof useRefreshSessionMutation>[0];

type InitializeAuthParams = {
  dispatch: AppDispatch;
  getMe: GetMeFn;
  refreshSession: RefreshSessionFn;
};

const applyTokens = (
  dispatch: AppDispatch,
  accessToken: string,
  refreshToken: string | null,
): void => {
  dispatch(
    setTokens({
      accessToken,
      refreshToken,
    }),
  );
};

export const initializeAuth = async ({
  dispatch,
  getMe,
  refreshSession,
}: InitializeAuthParams): Promise<void> => {
  const accessToken = authStorage.getAccessToken();
  const refreshToken = authStorage.getRefreshToken();

  if (!accessToken) {
    dispatch(setInitialized(true));
    return;
  }

  applyTokens(dispatch, accessToken, refreshToken);

  try {
    const user = await getMe().unwrap();
    dispatch(setUser(user));
  } catch {
    try {
      const refreshResponse = await refreshSession().unwrap();

      authStorage.setTokens({
        accessToken: refreshResponse.accessToken,
        refreshToken: refreshResponse.refreshToken,
      });

      applyTokens(
        dispatch,
        refreshResponse.accessToken,
        refreshResponse.refreshToken,
      );

      const user = await getMe().unwrap();
      dispatch(setUser(user));
    } catch {
      authStorage.clearTokens();
      dispatch(logout());
    }
  } finally {
    dispatch(setInitialized(true));
  }
};
