<?php

namespace App\Http\Controllers;

use App\Models\User; 
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index()
    {
        // Récupère tous les utilisateurs avec pagination
        $users = User::paginate(3);

        return Inertia::render('dashboard/account', [
            'users' => $users,
           response() -> json(['message' => 'Récupération des Utilisateurs']),
        ]);
    }

    public function destroy(User $user)
{
    $user->delete();

    return response()->json(['message' => 'Utilisateur supprimé.']);
}
}
