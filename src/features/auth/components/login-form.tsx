import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export interface LoginFormFields {
  email: string;
  password: string;
  remember: boolean;
}

export function LoginForm() {
  const form = useForm<LoginFormFields>({
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
    mode: "onBlur",
  });

  const loading = form.formState.isSubmitting;

  async function onSubmit(data: LoginFormFields) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <Form {...form}>
      <form
        method="post"
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <InputPassword
                    id="password"
                    placeholder="***********"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              className="border-slate-300"
              checked={form.watch("remember")}
              onCheckedChange={(value) => {
                form.setValue("remember", value as boolean);
              }}
            />
            <Label
              htmlFor="remember"
              className="text-sm text-slate-600 cursor-pointer"
            >
              Lembrar de mim
            </Label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium h-11 transition-all duration-200 shadow-lg hover:shadow-xl"
          disabled={loading}
        >
          {loading ? (
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
  );
}
