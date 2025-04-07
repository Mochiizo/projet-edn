import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

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
      alert("Veuillez sélectionner une plage de dates complète.");
      return;
    }
    post('/reservation', {
      onSuccess: () => reset(),
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Réservation', href: '/reservation' }]}>
      <Head title="Réservation de Pack" />
      <div className="flex h-full flex-col gap-6 p-4">
        <h1 className="text-2xl font-bold">Réserver un pack</h1>
        <div className="grid auto-rows-min gap-6 md:grid-cols-3">
          {/* Colonne 1 : Historique */}
          <div className="border border-border dark:border-sidebar-border rounded-xl p-4 bg-white dark:bg-black/20 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Mes réservations</h2>
            <ul className="space-y-3">
              {reservations.length > 0 ? reservations.map((r) => (
                <li key={r.id} className="border border-muted rounded-lg p-3 flex items-center gap-4">
                  {r.status === 'en cours' ? (
                    <span className="text-yellow-400">🕒</span>
                  ) : (
                    <span className="text-green-500">✅</span>
                  )}
                  <div>
                    <p className="font-semibold">{r.pack.nom}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(r.date_debut).toLocaleDateString()} → {new Date(r.date_fin).toLocaleDateString()}
                    </p>
                    <p className={`text-xs mt-1 ${r.status === 'en cours' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {r.status}
                    </p>
                  </div>
                </li>
              )) : (
                <li className="text-sm text-muted-foreground">Aucune réservation trouvée.</li>
              )}
            </ul>
          </div>

          {/* Colonne 2-3 : Formulaire */}
          <div className="md:col-span-2 border border-border dark:border-sidebar-border rounded-xl p-6 bg-white dark:bg-black/20 shadow-sm">
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
                {errors.pack_id && <p className="text-red-500 text-sm mt-1">{errors.pack_id}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Date de début</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full text-left border rounded-md p-2 flex justify-between items-center"
                    >
                      {data.date_debut
                        ? format(new Date(data.date_debut), 'PPP')
                        : <span className="text-gray-500">Choisir une date</span>}
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
                {errors.date_debut && <p className="text-red-500 text-sm mt-1">{errors.date_debut}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Date de fin</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full text-left border rounded-md p-2 flex justify-between items-center"
                    >
                      {data.date_fin
                        ? format(new Date(data.date_fin), 'PPP')
                        : <span className="text-gray-500">Choisir une date</span>}
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
                {errors.date_fin && <p className="text-red-500 text-sm mt-1">{errors.date_fin}</p>}
              </div>

              <Button type="submit" disabled={processing} className="w-full">
                {processing ? 'Traitement...' : 'Réserver'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
