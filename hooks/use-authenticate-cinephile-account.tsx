import { authenticateCinephileAccountAction } from "@/app/actions/authenticate-cinephile-account";
import { toastError, toastWarning } from "@/shared/helpers/toasts";
import { useAuthStore } from "@/shared/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuthenticateCinephileAccount = () => {
  const router = useRouter();
  const { addUser } = useAuthStore();

  const { mutateAsync: execute } = useMutation({
    mutationFn: authenticateCinephileAccountAction,
    onSuccess: (result) => {
      if (result.ok) {
        const { cinephile } = result;

        addUser({
          ...cinephile,
          avatarUrl: cinephile.avatar_url,
        });

        router.push("/");
      } else {
        const { statusCode } = result.error;

        switch (statusCode) {
          case 401:
            toastWarning("Email e/ou senha são inválidos!");
            break;
          default:
            toastError(
              "Não foi possível se autenticar nessa conta. Tente novamente mais tarde!",
            );
        }
      }
    },
  });

  return {
    execute,
  };
};
