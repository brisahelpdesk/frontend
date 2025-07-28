export interface AppPageHeaderProps {
  name: string;
  description: string;
}

export function AppPageHeader(props: AppPageHeaderProps) {
  const { name, description } = props;

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-slate-900">{name}</h1>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
