<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

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
        $file_path = $request['profile_img'] ? $request->file('profile_img')->store('profiles', 'public') : 'profiles/Missing_photo.svg';


        $data = $request->all();
        $user = new User();
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = $data['password'];
        $user->role = 'guest';
        // $user->profile_img = asset('storage/' . $file_path);
        $user->save();

        // $user = User::create([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->string('password')),
        // ]);

        event(new Registered($user));

        Auth::login($user);

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
}