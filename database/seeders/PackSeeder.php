<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pack;
use App\Models\Materiel;
use App\Models\User;
use App\Models\Emprunt;
use Carbon\Carbon;

class PackSeeder extends Seeder
{
    public function run(): void
    {
        // Créer quelques packs
        $pack1 = Pack::create(['nom' => '001_Pack', 'status' => 'disponible']);
        $pack2 = Pack::create(['nom' => '002_Pack', 'status' => 'disponible']);
        $pack1 = Pack::create(['nom' => '003_Pack', 'status' => 'disponible']);
        $pack2 = Pack::create(['nom' => '004_Pack', 'status' => 'disponible']);
        $pack1 = Pack::create(['nom' => '005_Pack', 'status' => 'disponible']);
        $pack2 = Pack::create(['nom' => '006_Pack', 'status' => 'disponible']);

        // Ajouter des matériels aux packs
        Materiel::create(['nom' => '001_Ordinateur', 'pack_id' => $pack1->id]);
        Materiel::create(['nom' => '001_Souris', 'pack_id' => $pack1->id]);
        Materiel::create(['nom' => '001_Chargeur', 'pack_id' => $pack1->id]);

        Materiel::create(['nom' => '002_Ordinateur', 'pack_id' => $pack2->id]);
        Materiel::create(['nom' => '002_Souris', 'pack_id' => $pack2->id]);
        Materiel::create(['nom' => '002_Chargeur', 'pack_id' => $pack2->id]);
        
        Materiel::create(['nom' => '003_Ordinateur', 'pack_id' => $pack2->id]);
        Materiel::create(['nom' => '003_Souris', 'pack_id' => $pack2->id]);
        Materiel::create(['nom' => '003_Chargeur', 'pack_id' => $pack2->id]);

        Materiel::create(['nom' => '004_Ordinateur', 'pack_id' => $pack2->id]);
        Materiel::create(['nom' => '004_Souris', 'pack_id' => $pack2->id]);
        Materiel::create(['nom' => '004_Chargeur', 'pack_id' => $pack2->id]);

        Materiel::create(['nom' => '005_Ordinateur', 'pack_id' => $pack2->id]);
        Materiel::create(['nom' => '005_Souris', 'pack_id' => $pack2->id]);
        Materiel::create(['nom' => '005_Chargeur', 'pack_id' => $pack2->id]);

        Materiel::create(['nom' => '006_Ordinateur', 'pack_id' => $pack2->id]);
        Materiel::create(['nom' => '006_Souris', 'pack_id' => $pack2->id]);
        Materiel::create(['nom' => '006_Chargeur', 'pack_id' => $pack2->id]);

        // Créer un emprunt pour tester
        $user = User::first(); // Assure-toi d'avoir un utilisateur existant

        if ($user) {
            $emprunt = Emprunt::create([
                'user_id' => $user->id,
                'pack_id' => $pack1->id,
                'date_debut' => Carbon::now(),
                'date_fin' => Carbon::now()->addDays(7),
                'status' => 'en cours',
                
            ]);
       // Si l'emprunt est en cours, mettre à jour le statut du pack
       if ($emprunt->status === 'en cours') {
        $pack1->update(['status' => 'emprunté']); 
            }
        }   
    }
}
