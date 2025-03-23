<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pack;

class PackController extends Controller
{
    public function index()
    {
        $packs = Pack::all();
        return response()->json([
        'success' => true,
        'message' => 'Liste des packs récupérée avec succès',
        'data' => $packs
    ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $pack = Pack::create($request->all());
        return response()->json($pack, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pack = Pack::findOrFail($id);
        return response()->json($pack);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pack = Pack::findOrFail($id);
        $pack->update($request->all());
        return response()->json($pack);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Pack::destroy($id);
        return response()->json(null, 204);
    }
}
