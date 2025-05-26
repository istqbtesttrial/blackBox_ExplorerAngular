
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Techniques from "./pages/Techniques";
import PartitionsEquivalence from "./pages/PartitionsEquivalence";
import AnalyseValeursLimites from "./pages/AnalyseValeursLimites";
import TablesDecisions from "./pages/TablesDecisions";
import TransitionEtat from "./pages/TransitionEtat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/techniques" element={<Techniques />} />
          <Route path="/partitions-equivalence" element={<PartitionsEquivalence />} />
          <Route path="/analyse-valeurs-limites" element={<AnalyseValeursLimites />} />
          <Route path="/tables-decisions" element={<TablesDecisions />} />
          <Route path="/transition-etat" element={<TransitionEtat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
