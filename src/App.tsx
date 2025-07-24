import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { IntentQuestion } from "./components/IntentQuestion";
import { AmenitiesSelection } from "./components/AmenitiesSelection";
import { LocationPreference } from "./components/LocationPreference";
import { SearchResults } from "./components/SearchResults";
import { CafeDetail } from "./components/CafeDetail";
import { NoResults } from "./components/NoResults";
import { AllCafes } from "./components/AllCafes";
import { WorkExperienceForm } from "./components/WorkExperienceForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/intent" element={<IntentQuestion />} />
          <Route path="/amenities" element={<AmenitiesSelection />} />
          <Route path="/location" element={<LocationPreference />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/cafe/:id" element={<CafeDetail />} />
          <Route path="/cafe/:id/experience" element={<WorkExperienceForm />} />
          <Route path="/no-results" element={<NoResults />} />
          <Route path="/all-cafes" element={<AllCafes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
