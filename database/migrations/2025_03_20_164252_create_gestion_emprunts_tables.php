<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('packs', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->enum('status', ['disponible', 'emprunté', 'en_sav'])->default('disponible');
            $table->timestamps();
        });

        Schema::create('materiels', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->foreignId('pack_id')->constrained('packs')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('emprunts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('pack_id')->constrained('packs')->onDelete('cascade');
            $table->dateTime('date_debut');
            $table->dateTime('date_fin'); // Non nullable pour éviter dépassement de durée
            $table->enum('status', ['en cours', 'rendu'])->default('en cours');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('emprunts');
        Schema::dropIfExists('materiels');
        Schema::dropIfExists('packs');
    }
};
