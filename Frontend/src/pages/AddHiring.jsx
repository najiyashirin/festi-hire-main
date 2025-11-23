import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const AddHiring = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [urgent, setUrgent] = useState(false);
    const [formData, setFormData] = useState({
        role: "",
        age: "",
        skills: "",
        responsibilities: "",
        location: "",
        pay: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Hiring Posted!",
            description: "Your job listing is now live.",
        });
        navigate("/my-listings");
    };
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20 p-6">
      <div className="max-w-2xl mx-auto pt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Add New Hiring</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Role Being Hired For</Label>
                <Input id="role" placeholder="e.g., Senior Chef" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required/>
              </div>

              <div className="space-y-4">
                <Label>Requirements</Label>
                
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm">Age Requirement</Label>
                  <Input id="age" placeholder="e.g., 21+" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} required/>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-sm">Required Skills</Label>
                  <Textarea id="skills" placeholder="List required skills..." value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} rows={3} required/>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities" className="text-sm">Responsibilities</Label>
                  <Textarea id="responsibilities" placeholder="Describe job responsibilities..." value={formData.responsibilities} onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })} rows={3} required/>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="urgent" checked={urgent} onCheckedChange={(checked) => setUrgent(checked)}/>
                  <label htmlFor="urgent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Urgent Hiring
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location</Label>
                <Input id="location" placeholder="e.g., New York, NY" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pay">Pay</Label>
                <Input id="pay" placeholder="e.g., $25/hr or $150/event" value={formData.pay} onChange={(e) => setFormData({ ...formData, pay: e.target.value })} required/>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                Post Hiring
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>);
};
export default AddHiring;
