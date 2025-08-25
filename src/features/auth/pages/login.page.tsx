import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormFieldPassword } from "@/components/input-password";
import { useAuth } from "../hook/use-auth";


export function LoginPage() {
  const { form, login, isLoading } = useAuth();

  return (
    <>
      <Card className="w-full max-w-sm border border-slate-200 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">H</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-slate-900">
            Fazer Login
          </CardTitle>
          <p className="text-slate-600 text-sm text-center">
            Entre com suas credenciais para acessar o sistema
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              method="post"
              className="space-y-4"
              onSubmit={login}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 h-11"
                          required
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormFieldPassword
                label="Senha"
                placeholder="Digite sua senha"
                required
                id="password"
                name="password"
                control={form.control}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium h-11 transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Entrar
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
