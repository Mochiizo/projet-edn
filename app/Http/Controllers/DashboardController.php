<?php

namespace App\Http\Controllers;

use App\Models\Pack;
use App\Models\Emprunt;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        return Inertia::render('dashboard/dashboard', [
            'total_packs' => Pack::count(),
            'total_packs_empruntes_aujourdhui' => Emprunt::whereDate('date_debut', $today)->distinct('pack_id')->count('pack_id'),
            'total_emprunts_aujourdhui' => Emprunt::whereDate('date_debut', $today)->count(),
            'total_rendus_aujourdhui' => Emprunt::whereDate('date_fin', $today)->where('status', 'rendu')->count(),
        ]);
    }
}
