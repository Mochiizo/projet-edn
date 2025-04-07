import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Pack {
    id: number;
    nom: string;
}

interface Emprunt {
    id: number;
    pack: { id: number; nom: string };
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
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

    // Charger tous les packs
    useEffect(() => {
        fetch('/packs')
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    setPacks(response.data);
                }
            });
    }, []);

    // Calculer les dates indisponibles quand un pack est sélectionné
    useEffect(() => {
        if (data.pack_id) {
            // Trouver toutes les réservations pour ce pack spécifique
            const packReservations = reservations.filter(
                (reservation) => reservation.pack.id === parseInt(data.pack_id) && reservation.status === 'en cours',
            );

            // Créer un tableau de toutes les dates indisponibles
            const blockedDates: Date[] = [];

            packReservations.forEach((reservation) => {
                const startDate = new Date(reservation.date_debut);
                const endDate = new Date(reservation.date_fin);

                // Ajouter toutes les dates entre début et fin
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    blockedDates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            });

            setUnavailableDates(blockedDates);

            // Réinitialiser les dates si elles sont indisponibles
            if (data.date_debut) {
                const startDate = new Date(data.date_debut);
                const isStartDateUnavailable = blockedDates.some(
                    (date) =>
                        date.getFullYear() === startDate.getFullYear() &&
                        date.getMonth() === startDate.getMonth() &&
                        date.getDate() === startDate.getDate(),
                );

                if (isStartDateUnavailable) {
                    setData('date_debut', null);
                    toast.warning("La date de début sélectionnée n'est plus disponible pour ce pack");
                }
            }

            if (data.date_fin) {
                const endDate = new Date(data.date_fin);
                const isEndDateUnavailable = blockedDates.some(
                    (date) =>
                        date.getFullYear() === endDate.getFullYear() &&
                        date.getMonth() === endDate.getMonth() &&
                        date.getDate() === endDate.getDate(),
                );

                if (isEndDateUnavailable) {
                    setData('date_fin', null);
                    toast.warning("La date de fin sélectionnée n'est plus disponible pour ce pack");
                }
            }
        } else {
            setUnavailableDates([]);
        }
    }, [data.pack_id, reservations]);

    // Vérifier si une date est dans le tableau des dates indisponibles
    const isDateUnavailable = (date: Date) => {
        return unavailableDates.some(
            (blockedDate) =>
                blockedDate.getFullYear() === date.getFullYear() &&
                blockedDate.getMonth() === date.getMonth() &&
                blockedDate.getDate() === date.getDate(),
        );
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.pack_id) {
            toast.error('Veuillez sélectionner un pack disponible.');
            return;
        }

        if (!data.date_debut || !data.date_fin) {
            toast.error('Veuillez sélectionner une plage de dates complète.');
            return;
        }

        const startDate = new Date(data.date_debut);
        const endDate = new Date(data.date_fin);

        // Vérifier si des dates sont indisponibles dans la plage sélectionnée
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (isDateUnavailable(currentDate)) {
                toast.error('La plage de dates sélectionnée contient des dates déjà réservées.');
                return;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Vérification finale des conflits avec les réservations de l'utilisateur
        const hasConflict = reservations.some((reservation) => {
            const resStart = new Date(reservation.date_debut);
            const resEnd = new Date(reservation.date_fin);
            return (
                reservation.pack.id === parseInt(data.pack_id) &&
                reservation.status === 'en cours' &&
                ((startDate <= resEnd && endDate >= resStart) || (resStart <= endDate && resEnd >= startDate))
            );
        });

        if (hasConflict) {
            toast.error('Vous avez déjà une réservation en cours pour ce pack pendant cette période');
            return;
        }

        post('/reservation', {
            onSuccess: () => {
                reset();
                toast.success('Réservation réussie !');
            },
            onError: (errors) => {
                if (errors.pack_id) {
                    toast.error('Ce pack est déjà réservé pour cette période.');
                } else {
                    toast.error('Une erreur est survenue lors de la réservation.');
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Réservation', href: '/reservation' }]}>
            <Head title="Réservation de Pack" />
            <div className="flex h-full flex-col gap-6 p-4">
                <h1 className="text-2xl font-bold">Réserver un pack</h1>
                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    {/* Formulaire de réservation */}
                    <div className="border-border dark:border-sidebar-border rounded-xl border bg-white p-6 shadow-sm md:col-span-2 dark:bg-black/20">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Sélection du pack d'abord */}
                            <div>
                                <label className="text-sm font-medium">Pack</label>
                                <Select
                                    onValueChange={(value) => {
                                        setData('pack_id', value);
                                        // Réinitialiser les dates lorsqu'on change de pack
                                        setData('date_debut', null);
                                        setData('date_fin', null);
                                    }}
                                    value={data.pack_id}
                                >
                                    <SelectTrigger className="mt-1 w-full">
                                        <SelectValue placeholder="Sélectionner un pack" />
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
                                {!data.pack_id && (
                                    <p className="mt-1 text-sm text-blue-500">Sélectionnez d'abord un pack pour voir les dates disponibles</p>
                                )}
                            </div>

                            {/* Sélection de la date de début */}
                            <div>
                                <label className="text-sm font-medium">
                                    Date de début
                                    {data.pack_id && (
                                        <span className="text-muted-foreground ml-2 text-xs">(Les dates déjà réservées sont désactivées)</span>
                                    )}
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between rounded-md border p-2 text-left"
                                            disabled={!data.pack_id}
                                        >
                                            {data.date_debut ? (
                                                format(new Date(data.date_debut), 'PPP')
                                            ) : (
                                                <span className="text-gray-500">
                                                    {!data.pack_id ? "Choisissez d'abord un pack" : 'Choisir une date'}
                                                </span>
                                            )}
                                            <CalendarIcon className="h-4 w-4 opacity-50" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={data.date_debut ? new Date(data.date_debut) : undefined}
                                            onSelect={(date) => {
                                                setData('date_debut', date ? date.toISOString().slice(0, 19).replace('T', ' ') : null);
                                                // Réinitialiser la date de fin si elle est antérieure à la nouvelle date de début
                                                if (data.date_fin && date && new Date(data.date_fin) < date) {
                                                    setData('date_fin', null);
                                                }
                                            }}
                                            disabled={(date) => {
                                                const today = new Date();
                                                today.setHours(0, 0, 0, 0);
                                                // Désactiver les dates dans le passé et les dates indisponibles
                                                return date < today || isDateUnavailable(date);
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.date_debut && <p className="mt-1 text-sm text-red-500">{errors.date_debut}</p>}
                            </div>

                            {/* Sélection de la date de fin */}
                            <div>
                                <label className="text-sm font-medium">Date de fin</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between rounded-md border p-2 text-left"
                                            disabled={!data.pack_id || !data.date_debut}
                                        >
                                            {data.date_fin ? (
                                                format(new Date(data.date_fin), 'PPP')
                                            ) : (
                                                <span className="text-gray-500">
                                                    {!data.date_debut ? "Choisissez d'abord une date de début" : 'Choisir une date'}
                                                </span>
                                            )}
                                            <CalendarIcon className="h-4 w-4 opacity-50" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={data.date_fin ? new Date(data.date_fin) : undefined}
                                            onSelect={(date) => {
                                                setData('date_fin', date ? date.toISOString().slice(0, 19).replace('T', ' ') : null);
                                            }}
                                            disabled={(date) => {
                                                const today = new Date();
                                                today.setHours(0, 0, 0, 0);

                                                // Désactiver les dates avant la date de début
                                                if (data.date_debut) {
                                                    const startDate = new Date(data.date_debut);
                                                    if (date < startDate) {
                                                        return true;
                                                    }
                                                }

                                                // Désactiver les dates dans le passé et les dates indisponibles
                                                return date < today || isDateUnavailable(date);
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.date_fin && <p className="mt-1 text-sm text-red-500">{errors.date_fin}</p>}
                            </div>

                            <Button type="submit" disabled={processing || !data.pack_id || !data.date_debut || !data.date_fin} className="w-full">
                                {processing ? 'Traitement...' : 'Réserver'}
                            </Button>
                        </form>
                    </div>

                    {/* Historique des réservations */}
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
