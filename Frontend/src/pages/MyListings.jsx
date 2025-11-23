import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Plus, MapPin, DollarSign, User } from "lucide-react";
const mockListings = [
    { id: 1, role: "Senior Chef", location: "New York, NY", pay: "$30/hr", urgent: true, applicants: 12 },
    { id: 2, role: "Event Server", location: "New York, NY", pay: "$22/hr", urgent: false, applicants: 8 },
    { id: 3, role: "Kitchen Assistant", location: "Los Angeles, CA", pay: "$18/hr", urgent: true, applicants: 15 },
];
const MyListings = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const handleDelete = (role) => {
        toast({
            title: "Listing Removed",
            description: `${role} listing has been deleted.`,
        });
    };
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Listings</h1>
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/team-profile")}>
              <User className="w-4 h-4 mr-2"/>
              Profile
            </Button>
            <Button onClick={() => navigate("/add-hiring")} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2"/>
              Add Hiring
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {mockListings.length === 0 ? (<Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No active listings yet</p>
              <Button onClick={() => navigate("/add-hiring")} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2"/>
                Create Your First Listing
              </Button>
            </CardContent>
          </Card>) : (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing) => (<Card key={listing.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{listing.role}</CardTitle>
                    {listing.urgent && (<Badge className="bg-destructive text-destructive-foreground">Urgent</Badge>)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground"/>
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-muted-foreground"/>
                      <span className="font-semibold">{listing.pay}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground"/>
                      <span>{listing.applicants} applicants</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2"/>
                      Edit
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={() => handleDelete(listing.role)}>
                      <Trash2 className="w-4 h-4 mr-2"/>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>))}
          </div>)}
      </div>
    </div>);
};
export default MyListings;
