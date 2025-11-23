import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import { Upload } from "lucide-react";
const categories = ["Catering", "Entertainment", "Transportation", "Decoration", "Photography", "Security", "Other"];
const TeamRegistration = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      phone: "",
      teamName: "",
      locations: "",
      bio: "",
    });
    const [photos, setPhotos] = useState([]);
    const [businessLicense, setBusinessLicense] = useState(null);
    const [insuranceFile, setInsuranceFile] = useState(null);
    const [idProof, setIdProof] = useState(null);
    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev => prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev, category]);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = new FormData();
        payload.append('email', formData.email);
        payload.append('password', formData.password);
        payload.append('phone', formData.phone);
        payload.append('teamName', formData.teamName);
        payload.append('categories', JSON.stringify(selectedCategories));
        payload.append('locations', formData.locations);
        payload.append('bio', formData.bio);
        photos.forEach((file) => payload.append('photos', file));
        if (businessLicense) payload.append('businessLicense', businessLicense);
        if (insuranceFile) payload.append('insurance', insuranceFile);
        if (idProof) payload.append('idProof', idProof);

        const res = await authService.registerTeam(payload);
        if (res && res.token) {
          toast({ title: 'Registered', description: 'Team created and logged in.' });
          navigate('/verification');
        } else {
          toast({ title: 'Registration failed', description: res?.message || 'Unknown error' });
        }
      } catch (err) {
        toast({ title: 'Error', description: err?.response?.data?.message || err.message });
      }
    };
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20 p-6">
      <div className="max-w-2xl mx-auto pt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Register Your Team</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input id="teamName" placeholder="e.g., Festive Foods Co." value={formData.teamName} onChange={(e) => setFormData({ ...formData, teamName: e.target.value })} required/>
              </div>

              <div className="space-y-2">
                <Label>Categories</Label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (<div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} checked={selectedCategories.includes(category)} onCheckedChange={() => handleCategoryToggle(category)}/>
                      <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {category}
                      </label>
                    </div>))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="locations">Locations Active In</Label>
                <Input id="locations" placeholder="e.g., New York, NY; Los Angeles, CA" value={formData.locations} onChange={(e) => setFormData({ ...formData, locations: e.target.value })} required/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="team@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photos">Upload Photos</Label>
                <Input id="photos" type="file" multiple onChange={(e) => setPhotos(Array.from(e.target.files))} />
              </div>

              <div className="space-y-2">
                <Label>Verification Documents (optional)</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Input type="file" onChange={(e) => setBusinessLicense(e.target.files[0] || null)} />
                  <Input type="file" onChange={(e) => setInsuranceFile(e.target.files[0] || null)} />
                  <Input type="file" onChange={(e) => setIdProof(e.target.files[0] || null)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Team Bio</Label>
                <Textarea id="bio" placeholder="Tell us about your team and services..." value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={4} required/>
              </div>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                Register Team
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>);
};
export default TeamRegistration;
