import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, Users, Edit, LogOut, Trash2, Plus } from "lucide-react";
import { teamService } from "@/services/teamService";

const TeamProfile = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOwn = async () => {
      setLoading(true);
      try {
        const res = await teamService.getOwnProfile();
        setTeam(res?.data || res);
      } catch (err) {
        setError(err?.response?.data || err?.message || "Failed to load team");
      } finally {
        setLoading(false);
      }
    };
    fetchOwn();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20">
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Team Profile</h1>
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/my-listings")}>My Listings</Button>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {loading && <div>Loading team...</div>}
        {error && (
          <div className="text-destructive">Error: {typeof error === "string" ? error : JSON.stringify(error)}</div>
        )}

        {!loading && team && (
          <>
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{team.teamName}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {team.categories &&
                        team.categories.map((c) => (
                          <Badge key={c} className="bg-accent text-accent-foreground">
                            {c}
                          </Badge>
                        ))}
                      {team.verified && <Badge className="bg-primary text-primary-foreground">Verified</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <span className="text-2xl font-bold">{team.rating || 0}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span>{team.locations ? team.locations.join("; ") : "Location not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span>{team.members || 0} team members</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">About Us</h3>
                  <p className="text-muted-foreground">{team.bio || "No bio provided."}</p>
                </div>

                <Button onClick={() => navigate("/add-hiring")} size="lg" className="w-full bg-primary hover:bg-primary/90">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Hiring
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {team.reviews && team.reviews.length > 0 ? (
                  team.reviews.map((review, idx) => (
                    <div key={idx} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.user}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: review.rating || 0 }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground">No reviews yet.</div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
              <Button variant="destructive" className="flex-1">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Profile
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamProfile;
