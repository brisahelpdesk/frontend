import { useAuth } from "@/features/auth/hook/use-auth";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export function AppExitButton() {
  const { logout } = useAuth();

  return (
    <DropdownMenuItem
      className="text-red-600"
      onClick={() => {
        logout();
      }}
    >
      Sair
    </DropdownMenuItem>
  );
}
