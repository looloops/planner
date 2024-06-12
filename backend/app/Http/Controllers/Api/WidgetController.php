<?php

namespace App\Http\Controllers\Api;

use App\Models\Plan;
use App\Models\User;
use App\Models\Widget;
use App\Models\WidgetDetail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreWidgetRequest;
use App\Http\Requests\UpdateWidgetRequest;

class WidgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreWidgetRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */


    // DISPLAY single widget DATA FROM 'widgets' TABLE AND 'widget_details' TABLE EXTENDED FOR A SPECIFIC WIDGET AND A SPECIFIC $user_id
    public function show(Widget $widget, $id)
    {
        $user_id = Auth::user()->id;
        //  $singleWidget = Widget::with('widgetDetails')->where('widget_id', $id)->where('user_id', $user_id);
        $singleWidget = Widget::where('id', $id)->where('user_id', $user_id)->with('widgetDetails');
        return [
            'success' => true,
            'data' => $singleWidget
        ];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Widget $widget)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWidgetRequest $request, Widget $widget)
    {

        /* $data = $request->all();
        dump($widget); */
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Widget $widget)
    {
        //
    }
}
