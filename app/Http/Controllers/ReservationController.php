<?php

namespace App\Http\Controllers;

use App\Models\Emprunt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Emprunt::with('pack')
            ->where('user_id', Auth::id())
            ->orderByDesc('date_debut')
            ->get();

        return Inertia::render('reservation/reservation', [
            'reservations' => $reservations,
            'csrf_token' => csrf_token()

        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'pack_id' => 'required|exists:packs,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
        ]);

        Emprunt::create([
            'user_id' => Auth::id(),
            'pack_id' => $validated['pack_id'],
            'date_debut' => $validated['date_debut'],
            'date_fin' => $validated['date_fin'],
            'status' => 'en cours',
        ]);

        return redirect()->route('reservation.index')->with('success', 'Réservation enregistrée avec succès.');
    }

    public function rendre($id): RedirectResponse
    {
        $emprunt = Emprunt::where('user_id', Auth::id())->findOrFail($id);
        $emprunt->update(['status' => 'rendu']);

        return redirect()->route('reservation.index')->with('success', 'Le pack a bien été rendu.');
    }
}
