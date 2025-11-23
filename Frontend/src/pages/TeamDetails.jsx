import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { MapPin, Star, Users } from "lucide-react";
import { teamService } from "@/services/teamService";

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const res = await teamService.getTeam(id);
        setTeam(res?.data || res);
      } catch (err) {
        setError(err?.response?.data || err?.message || "Failed to load team");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTeam();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-destructive">Error: {typeof error === "string" ? error : JSON.stringify(error)}</div>;
  if (!team) return <div>No team found.</div>;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-1">{team.teamName}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-2">
                  {team.categories && team.categories.map((c) => (
                    <Badge key={c}>{c}</Badge>
                  ))}
                  {team.verified && <Badge>Verified</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{team.bio}</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <span className="text-xl font-semibold">{team.rating || 0}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{team.locations ? team.locations.join(', ') : 'Location not specified'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{team.members || 0} team members</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamDetails;
