import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, User, Briefcase, Star } from "lucide-react";
import { teamService } from "@/services/teamService";
const mockTeams = [
    { id: 1, name: "Festive Foods Co.", category: "Catering", location: "New York, NY", rating: 4.8, members: 25 },
    { id: 2, name: "Celebration Events", category: "Entertainment", location: "Los Angeles, CA", rating: 4.9, members: 15 },
    { id: 3, name: "Party Logistics", category: "Transportation", location: "Chicago, IL", rating: 4.7, members: 12 },
    { id: 4, name: "Dream Decor", category: "Decoration", location: "New York, NY", rating: 4.6, members: 20 },
    { id: 5, name: "Snapshot Celebrations", category: "Photography", location: "Miami, FL", rating: 5.0, members: 8 },
    { id: 6, name: "Safe Events Inc.", category: "Security", location: "Boston, MA", rating: 4.8, members: 30 },
];
const categories = ["All", "Catering", "Entertainment", "Transportation", "Decoration", "Photography", "Security"];
const BrowseTeams = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchTeams = async () => {
        setLoading(true);
        try {
          const params = {};
          if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
          if (searchTerm) params.search = searchTerm;
          const res = await teamService.getTeams(params);
          setTeams(res.data || res || []);
        } catch (err) {
          setTeams([]);
        } finally {
          setLoading(false);
        }
      };
      fetchTeams();
    }, [searchTerm, selectedCategory]);

    const filteredTeams = teams.length ? teams : mockTeams;
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Browse Event Teams</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/job-listings")}>
              <Briefcase className="w-4 h-4 mr-2"/>
              Go to Job Seekers
            </Button>
            <Button variant="outline" onClick={() => navigate("/user-profile")}>
              <User className="w-4 h-4 mr-2"/>
              Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-64 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (<Button key={category} variant={selectedCategory === category ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedCategory(category)}>
                    {category}
                  </Button>))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"/>
              <Input placeholder="Search teams..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
            </div>

            {/* Team Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                    {filteredTeams.map((team) => (<Card key={team._id || team.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{team.name}</CardTitle>
                    <Badge className="w-fit bg-accent text-accent-foreground">{team.category}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground"/>
                        <span>{team.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-primary fill-primary"/>
                        <span className="font-semibold">{team.rating}</span>
                        <span className="text-muted-foreground">({team.members} members)</span>
                      </div>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => navigate(`/team/${team._id || team.id}`)}>
                      View Team
                    </Button>
                  </CardContent>
                </Card>))}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default BrowseTeams;
