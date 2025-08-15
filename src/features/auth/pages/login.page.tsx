import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { LoginForm } from "../components/login-form";

export function LoginPage() {
  return (
    <>
      <Card className="w-full max-w-md border border-slate-200 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 lg:hidden rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">H</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-slate-900">
            Fazer Login
          </CardTitle>
          <p className="text-slate-600 text-center">
            Entre com suas credenciais para acessar o sistema
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <LoginForm />

          <div className="text-center space-y-2 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
              >
                Solicitar Acesso
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
