
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PostForm } from "@/pages/Post/PostForm";
import { AuthContext, IAuthProvider } from "nauth-core";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ClientTable from "./ClientTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IClientProvider from "@/Contexts/User/IClientProvider";
import ClientProvider from "@/Contexts/User/ClientProvider";
import ClientContext from "@/Contexts/User/ClientContext";
import { toast } from "sonner";


export default function ClientList() {

    const navigate = useNavigate();

    const authContext = useContext<IAuthProvider>(AuthContext);
    const clientContext = useContext<IClientProvider>(ClientContext);


    useEffect(() => {
        authContext.loadUserSession().then((ret) => {
            if (!authContext.sessionInfo) {
                navigate("/login");
                return;
            }
            clientContext.listByUser().then((retCli) => {
                if (!retCli.sucesso) {
                    toast.error(retCli.mensagemErro);
                    return;
                }
            });
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
                                <h1 className="text-3xl font-bold text-white">Clients List</h1>
                                <p className="text-gray-400">Schedule your content across social platforms</p>
                            </div>
                        </div>
                        <Card className="bg-brand-dark border-brand-gray/30">
                            <CardHeader>
                                <CardTitle className="text-white">Client List</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ClientTable loading={clientContext.loading} clients={clientContext.clients} />
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div >
        </SidebarProvider >
    );
};
