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
        ]);
    }

    public function delete_account(string $id){
        User::destroy($id);
        return redirect()->route('account')->with('success', 'Utilisateur supprimé avec succès');
    }
}
