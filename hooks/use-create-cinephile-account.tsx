import { createCinephileAccountAction } from "@/app/actions/create-cinephile-account";
import { toastError, toastWarning } from "@/shared/helpers/toasts";
import { useAuthStore } from "@/shared/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateCinephileAccount = () => {
  const router = useRouter();
  const { addUser } = useAuthStore();

  const { mutateAsync: execute } = useMutation({
    mutationFn: createCinephileAccountAction,
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
          case 409:
            toastWarning("Este email está sendo usado por outro cinéfilo!");
            break;
          default:
            toastError(
              "Não foi possível criar sua conta. Tente novamente mais tarde!",
            );
        }
      }
    },
  });

  return {
    execute,
  };
};
