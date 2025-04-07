import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner'; // Import Sonner toast

interface Pack {
    id: number;
    nom: string;
}

interface Emprunt {
    id: number;
    pack: { nom: string };
    date_debut: string;
    date_fin: string;
    status: 'en cours' | 'rendu';
}

export default function Reservation() {
    const { data, setData, post, processing, reset, errors } = useForm({
        pack_id: '',
        date_debut: null as string | null,
        date_fin: null as string | null,
    });

    const { props } = usePage<{ reservations: Emprunt[] }>();
    const reservations = props.reservations;

    const [packs, setPacks] = useState<Pack[]>([]);

    useEffect(() => {
        fetch('/packs')
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    setPacks(response.data);
                }
            });
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.date_debut || !data.date_fin) {
            toast.error('Veuillez sélectionner une plage de dates complète.');
            return;
        }
        post('/reservation', {
            onSuccess: () => {
                reset();
                toast.success('Réservation réussie !');
            },
            onError: () => {
                toast.error('Une erreur est survenue lors de la réservation.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Réservation', href: '/reservation' }]}>
            <Head title="Réservation de Pack" />
            <div className="flex h-full flex-col gap-6 p-4">
                <h1 className="text-2xl font-bold">Réserver un pack</h1>
                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    {/* Colonne 1-2 : Formulaire */}
                    <div className="border-border dark:border-sidebar-border rounded-xl border bg-white p-6 shadow-sm md:col-span-2 dark:bg-black/20">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="text-sm font-medium">Pack</label>
                                <Select onValueChange={(value) => setData('pack_id', value)}>
                                    <SelectTrigger className="mt-1 w-full">
                                        <SelectValue placeholder="Sélectionner un pack disponible" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {packs.map((pack) => (
                                            <SelectItem key={pack.id} value={pack.id.toString()}>
                                                {pack.nom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.pack_id && <p className="mt-1 text-sm text-red-500">{errors.pack_id}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Date de début</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button type="button" className="flex w-full items-center justify-between rounded-md border p-2 text-left">
                                            {data.date_debut ? (
                                                format(new Date(data.date_debut), 'PPP')
                                            ) : (
                                                <span className="text-gray-500">Choisir une date</span>
                                            )}
                                            <CalendarIcon className="h-4 w-4 opacity-50" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={data.date_debut ? new Date(data.date_debut) : undefined}
                                            onSelect={(date) => {
                                                setData('date_debut', date ? date.toISOString().slice(0, 19).replace('T', ' ') : '');
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.date_debut && <p className="mt-1 text-sm text-red-500">{errors.date_debut}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Date de fin</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button type="button" className="flex w-full items-center justify-between rounded-md border p-2 text-left">
                                            {data.date_fin ? (
                                                format(new Date(data.date_fin), 'PPP')
                                            ) : (
                                                <span className="text-gray-500">Choisir une date</span>
                                            )}
                                            <CalendarIcon className="h-4 w-4 opacity-50" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={data.date_fin ? new Date(data.date_fin) : undefined}
                                            onSelect={(date) => {
                                                setData('date_fin', date ? date.toISOString().slice(0, 19).replace('T', ' ') : '');
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.date_fin && <p className="mt-1 text-sm text-red-500">{errors.date_fin}</p>}
                            </div>

                            <Button type="submit" disabled={processing} className="w-full">
                                {processing ? 'Traitement...' : 'Réserver'}
                            </Button>
                        </form>
                    </div>

                    {/* Colonne 3 : Historique */}
                    <div className="border-border dark:border-sidebar-border rounded-xl border bg-white p-4 shadow-sm dark:bg-black/20">
                        <h2 className="mb-3 text-lg font-semibold">Mes réservations</h2>
                        <ul className="space-y-3">
                            {reservations.length > 0 ? (
                                reservations.map((r) => (
                                    <li key={r.id} className="border-muted flex items-center gap-4 rounded-lg border p-3">
                                        {r.status === 'en cours' ? (
                                            <span className="text-yellow-400">🕒</span>
                                        ) : (
                                            <span className="text-green-500">✅</span>
                                        )}
                                        <div>
                                            <p className="font-semibold">{r.pack.nom}</p>
                                            <p className="text-muted-foreground text-sm">
                                                {new Date(r.date_debut).toLocaleDateString()} → {new Date(r.date_fin).toLocaleDateString()}
                                            </p>
                                            <p className={`mt-1 text-xs ${r.status === 'en cours' ? 'text-yellow-500' : 'text-green-500'}`}>
                                                {r.status}
                                            </p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-muted-foreground text-sm">Aucune réservation trouvée.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
