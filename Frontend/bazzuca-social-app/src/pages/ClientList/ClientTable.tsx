import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ClientInfo from "@/DTO/Domain/ClientInfo";
import { Calendar, Edit, Eye, Network, Pencil, Trash, User } from "lucide-react";

interface ClientProps {
    loading: boolean;
    clients?: ClientInfo[];
}

export default function ClientTable(param: ClientProps) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Changed At</TableHead>
                    <TableHead>Social Networks</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    param.loading && [1, 2, 3, 4, 5].map((index) => {
                        return (
                            <TableRow key={index} className="cursor-pointer hover:bg-muted/50">
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <Skeleton className="h-4 w-[200px] bg-gray-400" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Skeleton className="h-4 w-[100px] bg-gray-400" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Skeleton className="h-4 w-[100px] bg-gray-400" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Skeleton className="h-4 w-[100px] bg-gray-400" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm" disabled={true}>
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" disabled={true}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" disabled={true}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" disabled={true}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })
                }

                {!param.loading && param.clients.map((client) => (
                    <>
                        <TableRow key={client.clientId} className="cursor-pointer hover:bg-muted/50">
                            <TableCell>
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span>{client.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>xxx</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>xxx</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    <Network className="h-4 w-4" />
                                    <span>xxx</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" onClick={async (e) => {
                                    e.preventDefault();
                                }}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </>
                ))}
            </TableBody>
        </Table>
    );
}
