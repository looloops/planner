<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\WidgetDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreWidgetDetailRequest;
use App\Http\Requests\UpdateWidgetDetailRequest;

class WidgetDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $widgetDetails = WidgetDetail::with('widget')->get();
       
        return [
            'success' => true,
            'data' =>  $widgetDetails,
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWidgetDetailRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(WidgetDetail $widgetDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WidgetDetail $widgetDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    

    public function update (UpdateWidgetDetailRequest $request, $widget_id)
{
    $data = $request->all();

    // Trova il WidgetDetail utilizzando il widget_id
    $user_id = Auth::user()->id;
    //$widgetDetail = WidgetDetail::where('widget_id', $widget_id && 'user_id', $user_id)->firstOrFail();
    $widgetDetail = WidgetDetail::where('widget_id', $widget_id)->where('user_id', $user_id)->firstOrFail();
   

    // Aggiorna i campi con i dati della richiesta
    $widgetDetail->status = $data['status'];
    $widgetDetail->settings = $data['settings'];
    $widgetDetail->user_id = $data['user_id'];
    // Non serve aggiornare widget_id se è usato come identificatore per trovare il record

    // Salva le modifiche
    $widgetDetail->save();

    // Reindirizza alla route desiderata
    return redirect()->route('/');
}


   
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WidgetDetail $widgetDetail)
    {
        //
    }
}
