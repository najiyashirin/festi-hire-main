import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, LogOut, Trash2, MapPin } from "lucide-react";
const UserProfile = () => {
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2"/>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">John Doe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-medium">john.doe@email.com</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <p className="font-medium">+1 234 567 8900</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Age</p>
                <p className="font-medium">25</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Job Type Preference</p>
                <Badge className="bg-primary text-primary-foreground">Catering</Badge>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground"/>
                <span>New York, NY</span>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Bio</p>
                <p className="text-muted-foreground">
                  Experienced catering professional with 3+ years in the industry. Passionate about creating
                  memorable dining experiences for special events. Strong team player with excellent
                  communication skills.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-semibold">Catering Staff</p>
                  <p className="text-sm text-muted-foreground">Festive Foods Co.</p>
                </div>
                <Badge>Pending</Badge>
              </div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-semibold">Event Server</p>
                  <p className="text-sm text-muted-foreground">Dream Events LLC</p>
                </div>
                <Badge className="bg-green-500">Accepted</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Kitchen Assistant</p>
                  <p className="text-sm text-muted-foreground">Party Catering Inc.</p>
                </div>
                <Badge variant="secondary">Reviewed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <LogOut className="w-4 h-4 mr-2"/>
            Log Out
          </Button>
          <Button variant="destructive" className="flex-1">
            <Trash2 className="w-4 h-4 mr-2"/>
            Delete Account
          </Button>
        </div>
      </div>
    </div>);
};
export default UserProfile;
