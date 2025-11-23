import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Search, Users } from "lucide-react";
const UserPathChoice = () => {
    const navigate = useNavigate();
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-12 max-w-5xl">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-4">What are you looking for?</h1>
          <p className="text-xl text-muted-foreground">
            Choose your path to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Job Seeking Card */}
          <Card className="border-2 hover:border-primary transition-all hover:shadow-xl cursor-pointer group">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all">
                <Search className="w-12 h-12 text-primary"/>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">I'm Seeking a Job</h2>
                <p className="text-muted-foreground">
                  Find exciting opportunities with event teams
                </p>
              </div>
              <Button size="lg" onClick={() => navigate("/job-seeker-form")} className="w-full bg-primary hover:bg-primary/90">
                Find Jobs
              </Button>
            </CardContent>
          </Card>

          {/* Team Seeking Card */}
          <Card className="border-2 hover:border-accent transition-all hover:shadow-xl cursor-pointer group">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-all">
                <Users className="w-12 h-12 text-accent"/>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Looking for Event Teams</h2>
                <p className="text-muted-foreground">
                  Browse and connect with amazing event teams
                </p>
              </div>
              <Button size="lg" onClick={() => navigate("/browse-teams")} className="w-full bg-accent hover:bg-accent/90">
                Browse Teams
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);
};
export default UserPathChoice;
