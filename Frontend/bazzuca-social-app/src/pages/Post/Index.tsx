
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PostForm } from "@/pages/Post/PostForm";
import { AuthContext, IAuthProvider } from "nauth-core";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


export default function Post() {

  const navigate = useNavigate();

  const authContext = useContext<IAuthProvider>(AuthContext);


  useEffect(() => {
    authContext.loadUserSession().then((ret) => {
      if (!authContext.sessionInfo) {
        navigate("/login");
        return;
      }
    })
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Link to="/dashboard">
                <Button variant="ghost" className="text-gray-300 hover:text-white mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Create New Post</h1>
                <p className="text-gray-400">Schedule your content across social platforms</p>
              </div>
            </div>
            <PostForm />
          </div>
        </main>
      </div >
    </SidebarProvider >
  );
};
