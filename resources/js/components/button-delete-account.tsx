'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function DeleteAccountButton({ userId }: { userId: number }) {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/account/${userId}`, {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            });

            if (response.ok) {
                toast.success('Compte supprimé avec succès !');
                // 🔄 Rafraîchir la page ou mettre à jour la liste des utilisateurs
                window.location.reload();
            } else {
                toast.error('Erreur lors de la suppression du compte.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Impossible de supprimer le compte.');
        }
    };

    return (
        <Button variant="destructive" onClick={handleDelete}>
            Supprimer
        </Button>
    );
}
