<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\WidgetDetail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()->min(4)],
            'profile_img' => ['nullable', 'image', 'max:1024'], // size in kilobytes

        ]);
        $file_path = $request['profile_img'] ? $request->file('profile_img')->store('profiles', 'public') : 'profiles/default-profile.jpg';


        $data = $request->all();
        $user = new User();
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = $data['password'];
        $user->role = 'guest';
        $user->profile_img = asset('storage/' . $file_path);
        $user->widgets_layout = json_encode([
            "lg" => [
                ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
            ],
            "md" => [
                ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
            ],
            "sm" => [
                ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
            ],
            "xs" => [
                ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
            ],
            "xxs" => [
                ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
            ],



        ]);
        $user->active_widgets = json_encode([1, 2, 3]);
        $user->save();


        // $user = User::create([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->string('password')),
        // ]);

        event(new Registered($user));

        Auth::login($user);

        $user = Auth::user();
        $user_id = $user->id;
        $active_widgets = [1, 2, 3]; // Esempio di array di widget attivi

        //METODO CON ELOQUENT
        foreach ($active_widgets as $widget_id) {
            $widgetDetail = new WidgetDetail();
            $widgetDetail->user_id = $user_id;
            $widgetDetail->widget_id = $widget_id;
            $widgetDetail->settings = json_encode([]); // Converte un array vuoto in JSON vuoto
            $widgetDetail->save();
        }


        //METODO CON DB::RAW
        // foreach ($active_widgets as $widget_id) {
        //     DB::table('widget_details')->insert([
        //         'user_id' => $user_id,
        //         'widget_id' => $widget_id,
        //         'settings' => json_encode([]), // Converte un array vuoto in JSON vuoto
        //     ]);
        // }


        return response()->noContent();

        // ESEMPIO QUERY PER L'UPDATE DELLA TABELLA PONTE JSON
        // Auth::user()->widgets()->updateExistingPivot($widget_id, ["settings" => $request->setting])

    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response(['message' => 'Not found'], 404);
        }
        // return view('faculties.show', ['faculty' => $faculty]);
        return [
            'success' => true,
            'data' => $user
        ];
    }
    public function edit($id)
    {
    }
    public function Update($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response(['message' => 'Not found'], 404);
        }

        return [
            'success' => true,
            'data' => $user
        ];
    }




    public function updateWidgetsPosition(Request $request)
    {
        $data = $request->all();

        $user_id = Auth::id();

        // Trova l'utente autenticato
        $user = User::findOrFail($user_id);

        // Aggiorna i campi con i dati della richiesta
        $user->widgets_layout = json_encode($data['widgets_layout']);
        $user->active_widgets = json_encode($data['active_widgets']);

        // Salva le modifiche
        $user->save();

        return response()->json(['message' => 'Layout updated successfully'], 200);
    }


    public function showWidgetsPosition(User $user)
    {
        $user_id = Auth::id();
        // $user_id = 1;

        // Recupera i dati dal database
        $user = User::select('widgets_layout', 'active_widgets')->where('id', $user_id)->first();

        // Controlla se l'utente esiste e ha i dati necessari
        if ($user) {
            // Decodifica i dati JSON
            $widgets_layout = json_decode($user->widgets_layout, true);
            $active_widgets = json_decode($user->active_widgets, true);

            return response()->json([
                'success' => true,
                'widgets_layout' => $widgets_layout,
                'active_widgets' => $active_widgets,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'User not found or data not available',
            ], 404);
        }
    }
}
