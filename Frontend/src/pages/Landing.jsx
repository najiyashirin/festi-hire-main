import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Calendar, Users } from "lucide-react";
const Landing = () => {
    const navigate = useNavigate();
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-4xl">
        {/* Logo and Brand */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-12 h-12 text-primary animate-pulse"/>
            <h1 className="text-7xl font-bold text-foreground">Evork</h1>
            <Sparkles className="w-12 h-12 text-accent animate-pulse"/>
          </div>
          <p className="text-2xl text-muted-foreground font-medium">
            Your Festive Event Workforce Platform
          </p>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center gap-8 py-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary"/>
            </div>
            <span className="text-sm font-medium">Events</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-accent"/>
            </div>
            <span className="text-sm font-medium">Teams</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary"/>
            </div>
            <span className="text-sm font-medium">Opportunities</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button size="lg" onClick={() => navigate("/choose-role")} className="text-xl px-12 py-8 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
          Explore Evork
        </Button>

        {/* Decorative Text */}
        <p className="text-lg text-muted-foreground">
          Connect with event teams or find your next opportunity
        </p>
      </div>
    </div>);
};
export default Landing;
