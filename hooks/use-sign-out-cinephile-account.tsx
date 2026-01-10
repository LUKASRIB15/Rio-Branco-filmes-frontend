import { signOutCinephileAccountAction } from "@/app/actions/sign-out-cinephile-account";
import { useAuthStore } from "@/shared/store/auth";
import { useRouter } from "next/navigation";

export const useSignOutCinephileAccount = () => {
  const router = useRouter();
  const { removeUser } = useAuthStore();

  async function execute() {
    await signOutCinephileAccountAction();

    removeUser();
    router.push("/auth");
  }

  return {
    execute,
  };
};
