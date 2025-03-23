import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
            <div className="mx-auto mt-10 max-w-lg rounded-lg bg-red-700 p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold">Faire une réservation</h2>
                <form onSubmit={submit} className="space-y-4">
                    {/* Sélection du pack */}
                    <Select onValueChange={(value) => setData('pack_id', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un pack disponible" />
                        </SelectTrigger>
                        <SelectContent>
                            {packs &&
                                packs.map((pack) => (
                                    <SelectItem key={pack.id} value={pack.id.toString()}>
                                        {pack.nom}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>

                    {/* Sélection des dates */}
                    <Calendar
                        mode="range"
                        selected={data.date_debut && data.date_fin ? { from: new Date(data.date_debut), to: new Date(data.date_fin) } : undefined}
                        onSelect={(range: DateRange | undefined) => {
                            setData('date_debut', range?.from ? range.from.toISOString() : null);
                            setData('date_fin', range?.to ? range.to.toISOString() : null);
                        }}
                    />

                    <Button type="submit" disabled={processing} className="w-full">
                        Réserver
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
