import ChartAreaInteractive from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PackageIcon,
  ClipboardListIcon,
  RefreshCcwIcon,
  CheckCircle2Icon
} from 'lucide-react';

import { SectionCards } from '@/components/section-cards';
import data from './data.json';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tableau de bord',
    href: '/dashboard',
  },
];

interface PageProps {
  total_packs: number;
  total_packs_empruntes_aujourdhui: number;
  total_emprunts_aujourdhui: number;
  total_rendus_aujourdhui: number;
  [key: string]: any;
}

export default function Dashboard() {
  const {
    total_packs,
    total_packs_empruntes_aujourdhui,
    total_emprunts_aujourdhui,
    total_rendus_aujourdhui
  } = usePage<PageProps>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Packs</CardTitle>
              <PackageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total_packs}</div>
              <p className="text-xs text-muted-foreground">Nombre total de packs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Packs empruntés</CardTitle>
              <ClipboardListIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total_packs_empruntes_aujourdhui}</div>
              <p className="text-xs text-muted-foreground">Packs empruntés aujourd'hui</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Emprunts aujourd'hui</CardTitle>
              <RefreshCcwIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total_emprunts_aujourdhui}</div>
              <p className="text-xs text-muted-foreground">Nombre d'emprunts effectués aujourd'hui</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Packs rendus</CardTitle>
              <CheckCircle2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total_rendus_aujourdhui}</div>
              <p className="text-xs text-muted-foreground">Packs rendus aujourd'hui</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>

        <DataTable data={data} />
      </div>
    </AppLayout>
  );
}
