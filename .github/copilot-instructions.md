# Helpdesk Frontend Copilot Instructions

This document provides guidance for AI coding agents to effectively contribute to the Helpdesk Frontend codebase.

## Architecture & Key Technologies

- **Framework**: The project is built with [React](https://react.dev/) and [Vite](https://vitejs.dev/), using [TypeScript](https://www.typescriptlang.org/).
- **Routing**: We use [React Router](https://reactrouter.com/) for navigation. Route definitions, including lazy loading and data loaders, are centralized in `src/router.tsx`.
- **State Management**: Global state is managed with [Zustand](https://github.com/pmndrs/zustand). Feature-specific state should be co-located with the feature.
- **Data Fetching**: We use [TanStack Query (React Query)](https://tanstack.com/query/latest) for server-state management, complemented by [Axios](https://axios-http.com/) for HTTP requests.
- **UI Components**: The UI is built with [shadcn/ui](https://ui.shadcn.com/), which is a collection of re-usable components built on top of Radix UI and styled with Tailwind CSS. Custom components are in `src/components/`.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) is used for styling. Utility classes are preferred.
- **Forms**: Forms are managed with [React Hook Form](https://react-hook-form.com/) and validated with [Zod](https://zod.dev/).

## Project Structure

The codebase follows a **feature-sliced design**. Each business domain (e.g., `tickets`, `employees`) has its own directory under `src/features`. A typical feature directory includes:

- `pages/`: Top-level page components for the feature.
- `components/`: React components specific to that feature.
- `hooks/`: Custom hooks for the feature's logic.
- `services.ts`: Functions for making API calls related to the feature.
- `types.ts`: TypeScript types and interfaces for the feature's data.
- `schemas.ts`: Zod schemas for form validation.

## Key Files & Directories

- `src/router.tsx`: Defines all application routes, lazy-loading, and route-level data loading.
- `src/features/`: Contains all feature-sliced modules. When adding a new feature, create a new directory here.
- `src/components/ui/`: Contains the `shadcn/ui` components. Do not modify these directly.
- `src/lib/axios.ts`: Configures the global Axios instance, including an interceptor for authentication.
- `package.json`: Defines project scripts and dependencies.

## Developer Workflows

### Running the Application

To run the development server:

```bash
npm run dev
```

### Building for Production

To create a production build:

```bash
npm run build
```

### API Communication

- All API requests are handled by a central Axios instance in `src/lib/axios.ts`.
- An interceptor in `src/lib/axios.ts` automatically attaches a **hardcoded Bearer token** to every request for authentication.
- Feature-specific API calls are defined in the `services.ts` file within each feature's directory.

### Conventions & Patterns

- **Component Naming**: Use PascalCase for component files (e.g., `MyComponent.tsx`).
- **Styling**: Use `clsx` and `tailwind-merge` for conditional and combined classes.
- **Data Fetching**: Use the custom hooks from TanStack Query (like `useQuery`) for fetching data, and place the query functions in the feature's `services.ts` file.
- **State**: For simple, local state, use `useState`. For complex or shared state within a feature, consider a Zustand store co-located with the feature. Global state is in `src/stores`.
- **Code Splitting**: Pages are lazy-loaded in `src/router.tsx` to improve initial load time.

### Performance Best Practices

- **React.memo**: Use `React.memo` for components that receive stable props to prevent unnecessary re-renders.
- **useCallback**: Wrap event handlers and functions passed as props in `useCallback` to prevent child re-renders.
- **useMemo**: Use `useMemo` for expensive computations, especially array transformations and object mappings.
- **Optimized Form Components**: Use the pre-built optimized form components in `src/components/optimized-form-fields.tsx`.
- **Debouncing**: Use `useDebounce` from `src/hooks/use-debounce.ts` for search inputs and filters.
- **Query Optimization**: The QueryClient is pre-configured with performance settings (5min staleTime, 10min gcTime).

Example optimized component pattern:
```tsx
export const MyComponent = memo(function MyComponent({ onAction, data }) {
  const handleClick = useCallback(() => {
    onAction();
  }, [onAction]);

  const processedData = useMemo(() => 
    data.map(item => ({ ...item, processed: true })), 
    [data]
  );

  return <div onClick={handleClick}>{/* content */}</div>;
});
```
