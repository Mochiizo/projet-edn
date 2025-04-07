'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { toast } from 'sonner';

interface SheetUserProps {
    user: {
        id: number;
        name: string;
        email: string;
    };
    onSaved?: () => void; // callback facultatif pour rafraîchir la liste
}

export default function SheetUser({ user, onSaved }: SheetUserProps) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        const response = await fetch(`/account/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '',
            },
            body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
            toast.success('Utilisateur mis à jour.');
            onSaved?.();
        } else {
            toast.error('Erreur lors de la mise à jour.');
        }

        setLoading(false);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Modifier</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Modifier l'utilisateur</SheetTitle>
                    <SheetDescription>Modifiez les informations de l'utilisateur.</SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" />
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <SheetFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Enregistrement...' : 'Enregistrer'}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
