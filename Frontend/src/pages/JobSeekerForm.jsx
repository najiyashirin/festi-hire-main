import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { userService } from "@/services/userService";
const JobSeekerForm = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        age: "",
        jobType: "",
        location: "",
        bio: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await userService.updateProfile(formData);
            toast({
                title: "Profile Complete!",
                description: "Finding matching jobs for you...",
            });
            navigate("/job-listings");
        }
        catch (error) {
            const parsed = error;
            const message = "response" in parsed && parsed.response?.data?.message
                ? parsed.response.data.message
                : parsed instanceof Error
                    ? parsed.message
                    : "Failed to update profile";
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20 p-6">
      <div className="max-w-2xl mx-auto pt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Complete Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="25" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} required/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type Preference</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, jobType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="catering">Catering</SelectItem>
                    <SelectItem value="dance">Dance Performer</SelectItem>
                    <SelectItem value="driver">Driver</SelectItem>
                    <SelectItem value="decoration">Decoration</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location</Label>
                <Input id="location" placeholder="e.g., New York, NY" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself and your experience..." value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={4} required/>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={loading}>
                {loading ? "Saving..." : "Find Jobs"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>);
};
export default JobSeekerForm;
