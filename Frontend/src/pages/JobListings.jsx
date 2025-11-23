import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Search, MapPin, DollarSign, User, Users } from "lucide-react";
import { jobService } from "@/services/jobService";
const JobListings = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchJobs();
    }, []);
    const fetchJobs = async () => {
        try {
            const response = await jobService.getJobs();
            setJobs(response.data);
        }
        catch (error) {
            // Log the error safely; 'unknown' forces you to narrow the type before accessing properties
            console.error("Failed to fetch jobs:", error);
            toast({
                title: "Error",
                description: "Failed to load jobs",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    const handleApply = async (jobId, jobTitle) => {
        try {
            await jobService.applyToJob(jobId);
            toast({
                title: "Application Submitted!",
                description: `Your application for ${jobTitle} has been sent.`,
            });
            fetchJobs(); // Refresh to update applicant count
        }
        catch (error) {
            // Safely derive a user-friendly message from the unknown error shape
            let description = "Failed to apply";
            if (typeof error === "string") {
                description = error;
            }
            else if (error instanceof Error) {
                description = error.message || description;
            }
            else if (typeof error === "object" && error !== null) {
                const maybe = error;
                description = maybe.response?.data?.message || description;
            }
            toast({
                title: "Error",
                description,
                variant: "destructive",
            });
        }
    };
    const filteredJobs = jobs.filter((job) => job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.team?.teamName.toLowerCase().includes(searchTerm.toLowerCase()));
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Available Jobs</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/browse-teams")}>
              <Users className="w-4 h-4 mr-2"/>
              Go to Teams
            </Button>
            <Button variant="outline" onClick={() => navigate("/user-profile")}>
              <User className="w-4 h-4 mr-2"/>
              Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"/>
            <Input placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (<Card key={job._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{job.role}</CardTitle>
                  {job.urgent && (<Badge className="bg-destructive text-destructive-foreground">Urgent</Badge>)}
                </div>
                <p className="text-muted-foreground">{job.team?.teamName}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground"/>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground"/>
                    <span className="font-semibold">{job.pay}</span>
                  </div>
                </div>
                <Button onClick={() => handleApply(job._id, job.role)} className="w-full bg-primary hover:bg-primary/90">
                  Apply Now
                </Button>
              </CardContent>
            </Card>))}
        </div>
      </div>
    </div>);
};
export default JobListings;
