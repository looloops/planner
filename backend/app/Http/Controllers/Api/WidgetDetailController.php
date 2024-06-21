<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\WidgetDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreWidgetDetailRequest;
use App\Http\Requests\UpdateWidgetDetailRequest;
use Illuminate\Support\Facades\DB;


class WidgetDetailController extends Controller
{
    // DISPLAY ALL DATA FROM 'widget_details' TABLE AND 'widgets' TABLE EXTENDED
    public function index()
    {
        $widgetDetails = WidgetDetail::with('widget')->get();

        return [
            'success' => true,
            'data' => $widgetDetails,
        ];
    }


    // DISPLAY DATA FROM ALL 'settings' FIELDS IN 'widget_details' TABLE WITH A SPECIFIC 'user_id'
    public function allUserSettings()
    {

        // QUERY USING DB:RAW

        /*  $widgetSettings = DB::table('widget_details')
            ->select('settings')
            ->get();
       
        return [
            'success' => true,
            'data' =>  $widgetSettings,
        ]; */


        // QUERY USING ELOQUENT LANGUAGE

        $user_id = Auth::user()->id;

        // if (!Auth::user()) abort(401);
        $widgetSettings = WidgetDetail::select('settings')->where('user_id', $user_id)->get();

        return [
            'success' => true,
            'data' => $widgetSettings,
        ];
    }



    // DISPLAY DATA FROM A SINGLE 'settings' FIELD IN 'widget_details' TABLE USING A SPECIFIC 'widget_id' e 'user_id'
    public function singleWidgetSettings(WidgetDetail $widgetDetail, $widget_id)
    {

        $user_id = Auth::user()->id;
        $singleWidgetSettings = WidgetDetail::select('settings')->where('widget_id', $widget_id)->where('user_id', $user_id)->firstOrFail();


        return [
            'success' => true,
            'data' => $singleWidgetSettings,
        ];
    }

    // DISPLAY ALL DATA FROM 'widget_details' TABLE AND 'widgets' TABLE EXTENDED SPECIFIC TO A SINGLE WIDGET & SINGLE USER ($widget_id AND $user_id)
    public function singleWidgetUser(WidgetDetail $widgetDetail, $widget_id)
    {
        $user_id = Auth::user()->id;
        //  $user_id = 1;
        $singleWidgetUser = WidgetDetail::with('widget')->where('widget_id', $widget_id)->where('user_id', $user_id)->get();
        return [
            'success' => true,
            'data' => $singleWidgetUser
        ];
    }

    // DISPLAY WIDGET POSITIONS FROM ALL WIDGETS IN 'widget_details' TABLE OF SPECIFIC USER
    //TODO 
    // public function user(WidgetDetail $widgetDetail)
    // {

    //     $user_id = Auth::user()->id;
    //     $userSettings = WidgetDetail::all()->where('user_id', $user_id);


    //     return [
    //         'success' => true,
    //         'data' => $userSettings,
    //     ];
    // }

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



    // CREATE, UPDATE AND DELETE DATA FROM A SINGLE 'settings' FIELD IN 'widget_details' TABLE USING A SPECIFIC 'widget_id'
    public function update(UpdateWidgetDetailRequest $request, $widget_id)
    {
        $data = $request->all();

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
