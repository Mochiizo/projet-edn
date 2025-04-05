import PaginationUser from '@/components/pagination-table'; // Import du composant PaginationUser
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import DeleteAccountButton from './button-delete-account';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Account',
        href: '/account',
    },
];

const handleDelete = (userId: number) => {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
        router.delete(`/account/${userId}`, {
            onSuccess: () => {
                alert('Utilisateur supprimé avec succès !');
                router.visit('/account'); // Redirect to the account page
            },
            onError: () => alert('Erreur lors de la suppression'),
        });
    }
};

export default function Account() {
    const { users } = usePage().props as unknown as {
        users: {
            data: { id: number; name: string; email: string; isAdmin: boolean }[];
            links: { url: string | null; label: string; active: boolean }[];
        };
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>

            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border p-4">
                {users.data.length > 0 ? (
                    <>
                        <Table>
                            <TableCaption>Liste des utilisateurs enregistrés.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-center">Admin</TableHead>
                                    <TableHead className="text-center">Modifier</TableHead>
                                    <TableHead className="text-center">Supprimer</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="text-right">{user.isAdmin ? '✅ Oui' : '❌ Non'}</TableCell>
                                        <TableCell className="text-center">Boutton Modifier</TableCell>
                                        <TableCell className="text-center">
                                            <DeleteAccountButton userId={user.id} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={5}>Total des utilisateurs</TableCell>
                                    <TableCell className="text-right">{users.data.length}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>

                        {/* Intégration de la pagination */}
                        <div className="mt-4 flex justify-center">
                            <PaginationUser links={users.links} />
                        </div>
                    </>
                ) : (
                    <div className="p-4 text-center text-gray-500">Aucun utilisateur trouvé.</div>
                )}
            </div>
        </div>
    );
}
