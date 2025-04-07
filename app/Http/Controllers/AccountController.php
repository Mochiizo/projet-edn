<?php

namespace App\Http\Controllers;

use App\Models\User; 
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    public function index()
    {
        // Récupère tous les utilisateurs avec pagination
        $users = User::paginate(10);
        $totalUsers = User::count();

        return Inertia::render('dashboard/account', [
            'users' => $users,
            'totalUsers' => $totalUsers,
        ]);
    }

    public function update(Request $request, User $user)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:users,email,' . $user->id,
    ]);

    $user->update($validated);

    return response()->json(['message' => 'Utilisateur mis à jour.']);
}

    public function destroy(User $user)
{
    $user->delete();

    return response()->json(['message' => 'Utilisateur supprimé.']);
}
}
