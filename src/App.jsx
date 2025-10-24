import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MyRoutes } from "./routers/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyRoutes />
      <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
  );
}

export default App;
