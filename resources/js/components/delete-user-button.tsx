'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DeleteUserButtonProps {
    userId: number;
    onDeleted?: () => void; // facultatif : callback pour mettre à jour la liste après suppression
}

export default function DeleteUserButton({ userId, onDeleted }: DeleteUserButtonProps) {
    const handleDelete = async () => {
        const confirmDelete = confirm('Voulez-vous vraiment supprimer cet utilisateur ?');
        if (!confirmDelete) return;

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/account/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });

            if (response.ok) {
                toast.success('Utilisateur supprimé avec succès.');

                // Appel du callback s’il existe
                onDeleted?.();

                // Forcer le rafraîchissement de la page
                window.location.reload();
            } else {
                toast.error('Erreur lors de la suppression.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la suppression.');
        }
    };

    return (
        <Button variant="destructive" onClick={handleDelete}>
            Supprimer
        </Button>
    );
}
