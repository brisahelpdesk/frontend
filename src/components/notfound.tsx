import { Button } from "@/components/ui/button";
import { Frown, ArrowLeft } from "lucide-react";
import { InternalLink } from "./internal-link";

interface NotFoundProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export default function NotFound(props: NotFoundProps) {
  const { title, description, linkText, linkHref } = props;

  return (
    <main className="container mx-auto max-w-2xl p-4 md:p-6">
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="rounded-full bg-muted p-3">
          <Frown className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <Button asChild variant="secondary">
            <InternalLink href={linkHref}>
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              {linkText}
            </InternalLink>
          </Button>
        </div>
      </div>
    </main>
  );
}
