import { FormFieldPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useFetchUserById } from "@/features/users/hooks/use-fetch-user-by-id";
import { Mail, Save, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

interface FormFields {
  password: string;
  confirmPassword: string;
}

export function ActiveUserPage() {
  const userId = useParams().userId;

  const { user } = useFetchUserById(userId || "");

  const form = useForm<FormFields>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <>
      <Card className="w-full max-w-sm border border-slate-200 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-slate-900">
            Configurar Acesso
          </CardTitle>
          <p className="text-slate-600 text-center text-sm">
            Olá, {user?.firstName} {user?.lastName}! Conclua seu cadastro
            definindo uma senha forte para proteger sua conta.
          </p>

          <div className="flex items-center justify-center mt-2 gap-2 text-slate-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{user?.email}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form className="space-y-6">
              <div className="space-y-6">
                <FormFieldPassword
                  label="Senha"
                  placeholder="Digite sua senha"
                  required
                  id="password"
                  name="password"
                  control={form.control}
                />
                <FormFieldPassword
                  label="Confirmar Senha"
                  placeholder="Confirme sua senha"
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  control={form.control}
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4" />
                Salvar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
