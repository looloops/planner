<?php

namespace App\Http\Controllers\Api;

use App\Models\WidgetDetail;
use App\Http\Controllers\Controller;
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
        dump($widgetDetails);
        // return $widgetDetails;
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
    public function update(UpdateWidgetDetailRequest $request, WidgetDetail $widgetDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WidgetDetail $widgetDetail)
    {
        //
    }
}
