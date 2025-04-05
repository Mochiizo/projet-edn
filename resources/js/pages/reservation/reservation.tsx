import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker'; // Import du bon type

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Reservation', href: '/reservation' }];

type Pack = {
    id: number;
    nom: string;
};

export default function Reservation() {
    const { data, setData, post, processing, reset } = useForm({
        pack_id: '',
        date_debut: null as string | null,
        date_fin: null as string | null,
    });

    const [packs, setPacks] = useState<Pack[]>([]);

    useEffect(() => {
        fetch('/packs')
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    setPacks(response.data); // Accédez à response.data
                } else {
                    console.error("Erreur dans la réponse de l'API");
                }
            })
            .catch((err) => console.error('Erreur de récupération des packs', err));
    }, []);

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        post('/reservation', {
            onSuccess: () => {
                alert('Réservation effectuée avec succès !');
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reservation" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-6">
                        <h2 className="mb-6 text-xl font-semibold">Faire une réservation</h2>
                        <form onSubmit={submit} className="space-y-6">
                            {/* Sélection du pack */}
                            <div className="space-y-2">
                                <label className="text-sm leading-none font-medium">Pack</label>
                                <Select onValueChange={(value) => setData('pack_id', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner un pack disponible" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {packs?.map((pack) => (
                                            <SelectItem key={pack.id} value={pack.id.toString()}>
                                                {pack.nom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sélection des dates */}
                            <div className="space-y-2">
                                <label className="text-sm leading-none font-medium">Dates</label>
                                <div className="rounded-md border p-2">
                                    <Calendar
                                        mode="range"
                                        numberOfMonths={1}
                                        selected={
                                            data.date_debut && data.date_fin
                                                ? { from: new Date(data.date_debut), to: new Date(data.date_fin) }
                                                : undefined
                                        }
                                        onSelect={(range: DateRange | undefined) => {
                                            setData('date_debut', range?.from ? range.from.toISOString() : null);
                                            setData('date_fin', range?.to ? range.to.toISOString() : null);
                                        }}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Bouton de soumission */}
                            <Button type="submit" disabled={processing} className="mt-4 w-full">
                                {processing ? 'Traitement...' : 'Réserver'}
                            </Button>
                        </form>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
