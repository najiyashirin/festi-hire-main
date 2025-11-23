import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserCircle, Briefcase } from "lucide-react";
const ChooseRole = () => {
    const navigate = useNavigate();
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-12 max-w-5xl">
        <div>
          <h1 className="text-5xl font-bold text-foreground mb-4">Welcome to Evork!</h1>
          <p className="text-xl text-muted-foreground">
            Are you a user or a service provider?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User Card */}
          <Card className="border-2 hover:border-primary transition-all hover:shadow-xl cursor-pointer group">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all">
                <UserCircle className="w-12 h-12 text-primary"/>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">I'm a User</h2>
                <p className="text-muted-foreground">
                  Looking for jobs or event teams
                </p>
              </div>
              <Button size="lg" onClick={() => navigate("/user-signup")} className="w-full bg-primary hover:bg-primary/90">
                Continue as User
              </Button>
            </CardContent>
          </Card>

          {/* Service Provider Card */}
          <Card className="border-2 hover:border-accent transition-all hover:shadow-xl cursor-pointer group">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-all">
                <Briefcase className="w-12 h-12 text-accent"/>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">I'm a Service Provider</h2>
                <p className="text-muted-foreground">
                  Offering event services and hiring
                </p>
              </div>
              <Button size="lg" onClick={() => navigate("/team-registration")} className="w-full bg-accent hover:bg-accent/90">
                Continue as Provider
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);
};
export default ChooseRole;
