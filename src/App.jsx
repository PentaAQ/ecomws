import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MyRoutes } from "./routers/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right" 
        richColors 
        expand={true}
        duration={3000}
      />
      <MyRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
