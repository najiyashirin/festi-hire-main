import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ChooseRole from "./pages/ChooseRole";
import UserSignup from "./pages/UserSignup";
import UserPathChoice from "./pages/UserPathChoice";
import JobSeekerForm from "./pages/JobSeekerForm";
import JobListings from "./pages/JobListings";
import BrowseTeams from "./pages/BrowseTeams";
import TeamRegistration from "./pages/TeamRegistration";
import Verification from "./pages/Verification";
import TeamProfile from "./pages/TeamProfile";
import TeamDetails from "./pages/TeamDetails";
import AddHiring from "./pages/AddHiring";
import MyListings from "./pages/MyListings";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
const App = () => (<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/choose-role" element={<ChooseRole />}/>
          <Route path="/user-signup" element={<UserSignup />}/>
          <Route path="/user-path-choice" element={<UserPathChoice />}/>
          <Route path="/job-seeker-form" element={<JobSeekerForm />}/>
          <Route path="/job-listings" element={<JobListings />}/>
          <Route path="/browse-teams" element={<BrowseTeams />}/>
          {/* Public team details page */}
          <Route path="/team/:id" element={<TeamDetails />}/>
          {/* Service provider-only profile (authenticated) */}
          <Route path="/team/profile" element={<TeamProfile />}/>
          <Route path="/team-registration" element={<TeamRegistration />}/>
          <Route path="/verification" element={<Verification />}/>
          <Route path="/add-hiring" element={<AddHiring />}/>
          <Route path="/my-listings" element={<MyListings />}/>
          <Route path="/user-profile" element={<UserProfile />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>);
export default App;
