import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
const UserSignup = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        phone: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.registerUser(formData);
            toast({
                title: "Account Created!",
                description: "Welcome to Evork. Let's set up your profile.",
            });
            navigate("/user-path-choice");
        }
        catch (error) {
            // Safely derive a displayable message without using `any`
            let description = "Failed to create account";
            if (error instanceof Error) {
                description = error.message || description;
            }
            else if (typeof error === "object" && error !== null) {
                const errObj = error;
                description = errObj.response?.data?.message ?? description;
            }
            toast({
                title: "Error",
                description,
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 234 567 8900" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required/>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>);
};
export default UserSignup;
