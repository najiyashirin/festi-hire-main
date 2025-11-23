import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle } from "lucide-react";
const Verification = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Documents Submitted!",
            description: "We'll review your documents and get back to you soon.",
        });
        navigate("/team-profile");
    };
    return (<div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20 p-6">
      <div className="max-w-2xl mx-auto pt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Verification</CardTitle>
            <p className="text-center text-muted-foreground">
              Upload your business documents for verification
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label>Required Documents</Label>
                
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground"/>
                  <p className="text-sm font-medium mb-1">Business License</p>
                  <p className="text-xs text-muted-foreground">PDF or Image (Max 5MB)</p>
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground"/>
                  <p className="text-sm font-medium mb-1">Insurance Certificate</p>
                  <p className="text-xs text-muted-foreground">PDF or Image (Max 5MB)</p>
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground"/>
                  <p className="text-sm font-medium mb-1">ID Proof</p>
                  <p className="text-xs text-muted-foreground">PDF or Image (Max 5MB)</p>
                </div>
              </div>

              <div className="bg-secondary p-4 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"/>
                <div className="text-sm">
                  <p className="font-medium mb-1">Verification Process</p>
                  <p className="text-muted-foreground">
                    Our team will review your documents within 24-48 hours. You'll receive an email once verified.
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                Submit for Verification
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>);
};
export default Verification;
