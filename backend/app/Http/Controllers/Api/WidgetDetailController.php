<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\WidgetDetail;
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
    public function update(UpdateWidgetDetailRequest $request, WidgetDetail $widgetDetail, $id)
    {
        // if (!Auth::user()) abort(401);

        $user_id = Auth::user()->id;
        $widget_id = $widgetDetail->find($id);
        $data = $request->find($user_id)->find($widget_id);


        $selected_widget = User::with('widget_details', 'widget_details.widgets')->find($user_id);
        dump($selected_widget);
       


        // dd($data);

        // validare i dati
        // TODO: risolvere errore del campo duplicato con le validazioni

        // aggiornare i dati nel database
        // $widgetDetail = WidgetDetail::findOrFail($id);
        $widgetDetail->status = $data['status'];
        $widgetDetail->settings = $data['settings'];
        $widgetDetail->user_id = $data['user_id'];
        $widgetDetail->widget_id = $data['widget_id'];
        $widgetDetail->update();

        // ridirezionare
        // return redirect()->route('books.show', ['id' => $id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WidgetDetail $widgetDetail)
    {
        //
    }
}
