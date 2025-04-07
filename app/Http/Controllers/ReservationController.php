<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Emprunt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class ReservationController extends Controller
{
    public function index()
    {
        return Inertia::render('reservation/reservation');
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
            'status' => 'en cours', // si tu veux suivre l'état de la réservation
        ]);

        //return redirect('/reservation')->with('success', 'Réservation enregistrée');
        return redirect()->route('reservation.index')->with('success', 'Réservation enregistrée avec succès.');
    }
}
