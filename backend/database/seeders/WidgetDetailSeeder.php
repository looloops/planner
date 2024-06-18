<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Widget;
use App\Models\WidgetDetail;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class WidgetDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        // WidgetDetail::factory(3)->create();

        //WIDGETS USER 2
        //Schedule User 2
        WidgetDetail::factory()->create([
            'user_id' => 2,
            'widget_id' => 1,
            'settings' => json_encode([
                [
                    'id' => 1,
                    'title' => "John's birthday!",
                    'description' => 'Remember to buy a cake!',
                    'start' => '19:30 2024-12-01',
                    'finish' => '22:00 2024-12-01',
                    'deadline' => '19:30 2024-12-01',
                    'priority' => 'Not urgent',
                ],
                [
                    'id' => 2,
                    'title' => "Dentist",
                    'description' => 'Book a follow-up!',
                    'start' => '10:15 2024-07-06',
                    'finish' => '11:00 2024-07-06',
                    'deadline' => '',
                    'priority' => 'Urgent',
                ],
            ]),

        ]);



        //Goals 1 User 2
        WidgetDetail::factory()->create([
            'user_id' => 2,
            'widget_id' => 2,
            'settings' => json_encode([
                [
                    'id' => 1,
                    'title' => "Epicode fullstack",
                    'description' => 'Ottenere certificazione fullstack del corso epicode',
                    'priority' => 'High'
                ],

                [
                    'id' => 2,
                    'title' => "Find work",
                    'description' => 'Trovare lavoro nel campo tech, possibilmente da remoto',
                    'priority' => 'High',
                ],
                [
                    'id' => 3,
                    'title' => "Complete personal portfolio",
                    'description' => 'Aggiungere nuovi progetti al portfolio personale',
                    'priority' => 'High',
                ]
            ]),

        ]);



        //MEDIA User 2
        WidgetDetail::factory()->create([
            'user_id' => 2,
            'widget_id' => 3,
            'settings' => json_encode([

                [
                    'id' => 1,
                    'type' => 'Movie',
                    'title' => "The Platform",
                    'description' => "A chilling thriller, can't wait to watch it with Lara!",
                    'img' => 'https://media.istockphoto.com/id/1412871535/photo/friends-watching-movies-together-at-home.jpg?s=612x612&w=0&k=20&c=ELSN7ZtKYDs7DeW9EG_Dh7i-aIBOR_9ktlvRpFaZnEM=',
                    'status' => 'to experience',
                ],
                [
                    'id' => 2,
                    'type' => 'Series',
                    'title' => "Succession",
                    'description' => "This family is truly something.",
                    'img' => 'https://media.istockphoto.com/id/1412871535/photo/friends-watching-movies-together-at-home.jpg?s=612x612&w=0&k=20&c=ELSN7ZtKYDs7DeW9EG_Dh7i-aIBOR_9ktlvRpFaZnEM=',
                    'status' => 'experiencing',
                ],
                [
                    'id' => 3,
                    'type' => 'Podcast',
                    'title' => "Critical Role",
                    'description' => "Such a funny show!",
                    'img' => 'https://media.istockphoto.com/id/1412871535/photo/friends-watching-movies-together-at-home.jpg?s=612x612&w=0&k=20&c=ELSN7ZtKYDs7DeW9EG_Dh7i-aIBOR_9ktlvRpFaZnEM=',
                    'status' => 'experiencing',
                ],
            ]),

        ]);

        //Recipes User 2
        WidgetDetail::factory()->create([
            'user_id' => 2,
            'widget_id' => 4,
            'settings' => json_encode([
                [
                    'id' => 1,
                    'img' => "https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg",
                    'type' => "Baking",
                    'title' => "Crepes con fiocchi d'avena",
                    'description' => "Extremely good yet healthy for our breakfast. Here's how to make them.",

                ],

                [
                    'id' => 2,
                    'img' => "https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg",
                    'type' => "Vegan",
                    'title' => "Chickpeas Curry",
                    'description' => "Such a nice alternative to the classic curry. Here's the steps to follow.",

                ],
                [
                    'id' => 3,
                    'img' => "https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg",
                    'type' => "Savory",
                    'title' => "Seafood Spaghetti",
                    'description' => "How to make spaghetti the true italian way! Still remember when my uncle taught me how to cook them properly.",

                ],
            ]),

        ]);



        //JOURNAL User 2
        WidgetDetail::factory()->create([
            'user_id' => 2,
            'widget_id' => 5,
            'settings' => json_encode([

                [
                    'id' => 1,
                    'date' => '2024-06-12',
                    'title' => "School Notes",
                    'content' => "A whole lot of text, words and words and words and words.",
                ],
                [
                    'id' => 2,
                    'date' => '2024-06-13',
                    'title' => "Things I appreciated today",
                    'content' => "A whole lot of text, words and words and words and words.",
                ],
                [
                    'id' => 3,
                    'date' => '2024-06-14',
                    'title' => "A journal entry",
                    'content' => "A whole lot of text, words and words and words and words.",
                ],
            ]),


        ]);


        //USER 1
        //Schedule User 1
        WidgetDetail::factory()->create([
            'user_id' => 1,
            'widget_id' => 1,
            'settings' => json_encode([
                [
                    'id' => 1,
                    'title' => "John's birthday!",
                    'description' => 'Remember to buy a cake!',
                    'start' => '19:30 2024-12-01',
                    'finish' => '22:00 2024-12-01',
                    'deadline' => '19:30 2024-12-01',
                    'priority' => 'Not urgent',
                ],
                [
                    'id' => 2,
                    'title' => "Dentist",
                    'description' => 'Book a follow-up!',
                    'start' => '10:15 2024-07-06',
                    'finish' => '11:00 2024-07-06',
                    'deadline' => '',
                    'priority' => 'Urgent',
                ],
            ]),

        ]);



        //Goals 1 User 1
        WidgetDetail::factory()->create([
            'user_id' => 1,
            'widget_id' => 2,
            'settings' => json_encode([
                [
                    'id' => 1,
                    'title' => "Epicode fullstack",
                    'description' => 'Ottenere certificazione fullstack del corso epicode',
                    'priority' => 'High'
                ],

                [
                    'id' => 2,
                    'title' => "Find work",
                    'description' => 'Trovare lavoro nel campo tech, possibilmente da remoto',
                    'priority' => 'High',
                ],
                [
                    'id' => 3,
                    'title' => "Complete personal portfolio",
                    'description' => 'Aggiungere nuovi progetti al portfolio personale',
                    'priority' => 'High',
                ]
            ]),

        ]);



        //MEDIA User 1
        WidgetDetail::factory()->create([
            'user_id' => 1,
            'widget_id' => 3,
            'settings' => json_encode([

                [
                    'id' => 1,
                    'type' => 'Movie',
                    'title' => "The Platform",
                    'description' => "A chilling thriller, can't wait to watch it with Lara!",
                    'img' => 'https://media.istockphoto.com/id/1412871535/photo/friends-watching-movies-together-at-home.jpg?s=612x612&w=0&k=20&c=ELSN7ZtKYDs7DeW9EG_Dh7i-aIBOR_9ktlvRpFaZnEM=',
                    'status' => 'to experience',
                ],
                [
                    'id' => 2,
                    'type' => 'Series',
                    'title' => "Succession",
                    'description' => "This family is truly something.",
                    'img' => 'https://media.istockphoto.com/id/1412871535/photo/friends-watching-movies-together-at-home.jpg?s=612x612&w=0&k=20&c=ELSN7ZtKYDs7DeW9EG_Dh7i-aIBOR_9ktlvRpFaZnEM=',
                    'status' => 'experiencing',
                ],
                [
                    'id' => 3,
                    'type' => 'Podcast',
                    'title' => "Critical Role",
                    'description' => "Such a funny show!",
                    'img' => 'https://media.istockphoto.com/id/1412871535/photo/friends-watching-movies-together-at-home.jpg?s=612x612&w=0&k=20&c=ELSN7ZtKYDs7DeW9EG_Dh7i-aIBOR_9ktlvRpFaZnEM=',
                    'status' => 'experiencing',
                ],
            ]),

        ]);

        //Recipes User 1
        WidgetDetail::factory()->create([
            'user_id' => 1,
            'widget_id' => 4,
            'settings' => json_encode([
                [
                    'id' => 1,
                    'img' => "https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg",
                    'type' => "Baking",
                    'title' => "Crepes con fiocchi d'avena",
                    'description' => "Extremely good yet healthy for our breakfast. Here's how to make them.",

                ],

                [
                    'id' => 2,
                    'img' => "https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg",
                    'type' => "Vegan",
                    'title' => "Chickpeas Curry",
                    'description' => "Such a nice alternative to the classic curry. Here's the steps to follow.",

                ],
                [
                    'id' => 3,
                    'img' => "https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg",
                    'type' => "Savory",
                    'title' => "Seafood Spaghetti",
                    'description' => "How to make spaghetti the true italian way! Still remember when my uncle taught me how to cook them properly.",

                ],
            ]),

        ]);



        //JOURNAL User 1
        WidgetDetail::factory()->create([
            'user_id' => 1,
            'widget_id' => 5,
            'settings' => json_encode([

                [
                    'id' => 1,
                    'date' => '2024-06-12',
                    'title' => "School Notes",
                    'content' => "A whole lot of text, words and words and words and words.",
                ],
                [
                    'id' => 2,
                    'date' => '2024-06-13',
                    'title' => "Things I appreciated today",
                    'content' => "A whole lot of text, words and words and words and words.",
                ],
                [
                    'id' => 3,
                    'date' => '2024-06-14',
                    'title' => "A journal entry",
                    'content' => "A whole lot of text, words and words and words and words.",
                ],
            ]),


        ]);


        //USER 3
        //Agenda User 3
        WidgetDetail::factory()->create([
            'user_id' => 3,
            'widget_id' => 1,
            'settings' => json_encode([
                [
                    'id' => 1,
                    'title' => "John's birthday!",
                    'description' => 'Remember to buy a cake!',
                    'start' => '19:30 2024-12-01',
                    'finish' => '22:00 2024-12-01',
                    'deadline' => '19:30 2024-12-01',
                    'priority' => 'Not urgent',
                ],
                [
                    'id' => 2,
                    'title' => "Dentist",
                    'description' => 'Book a follow-up!',
                    'start' => '10:15 2024-07-06',
                    'finish' => '11:00 2024-07-06',
                    'deadline' => '',
                    'priority' => 'Urgent',
                ],
            ]),

        ]);



        //Goals 1 User 3
        WidgetDetail::factory()->create([
            'user_id' => 3,
            'widget_id' => 2,
            'settings' => json_encode([
                [
                    'id' => 1,
                    'title' => "Epicode fullstack",
                    'description' => 'Ottenere certificazione fullstack del corso epicode',
                    'priority' => 'High'
                ],

                [
                    'id' => 2,
                    'title' => "Find work",
                    'description' => 'Trovare lavoro nel campo tech, possibilmente da remoto',
                    'priority' => 'High',
                ],
                [
                    'id' => 3,
                    'title' => "Complete personal portfolio",
                    'description' => 'Aggiungere nuovi progetti al portfolio personale',
                    'priority' => 'High',
                ]
            ]),

        ]);



        //MEDIA User 3
        WidgetDetail::factory()->create([
            'user_id' => 3,
            'widget_id' => 3,
            'settings' => json_encode([

                [
                    'id' => 1,
                    'type' => 'Movie',
                    'title' => "The Platform",
                    'description' => "A chilling thriller, can't wait to watch it with Lara!",
                    'img' => 'https://media.istockphoto.com/id/1412871535/photo/friends-watching-movies-together-at-home.jpg?s=612x612&w=0&k=20&c=ELSN7ZtKYDs7DeW9EG_Dh7i-aIBOR_9ktlvRpFaZnEM=',
                    'status' => 'to experience',
                ],
                [
                    'id' => 2,
                    'type' => 'Series',
                    'title' => "Succession",
                    'description' => "This family is truly something.",
                    'img' => 'https://media.istockphoto.com/id/1412871535/photo/friends-watching-movies-together-at-home.jpg?s=612x612&w=0&k=20&c=ELSN7ZtKYDs7DeW9EG_Dh7i-aIBOR_9ktlvRpFaZnEM=',
                    'status' => 'experiencing',
                ],
                [
                    'id' => 3,
                    'type' => 'Podcast',
                    'title' => "Critical Role",
                    'description' => "Such a funny show!",
                    'img' => 'https://media.istockphoto.com/id/1412871535/photo/friends-watching-movies-together-at-home.jpg?s=612x612&w=0&k=20&c=ELSN7ZtKYDs7DeW9EG_Dh7i-aIBOR_9ktlvRpFaZnEM=',
                    'status' => 'experiencing',
                ],
            ]),

        ]);

        //Recipes User 3
        WidgetDetail::factory()->create([
            'user_id' => 3,
            'widget_id' => 4,
            'settings' => json_encode([
                [
                    'id' => 1,
                    'img' => "https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg",
                    'type' => "Baking",
                    'title' => "Crepes con fiocchi d'avena",
                    'description' => "Extremely good yet healthy for our breakfast. Here's how to make them.",

                ],

                [
                    'id' => 2,
                    'img' => "https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg",
                    'type' => "Vegan",
                    'title' => "Chickpeas Curry",
                    'description' => "Such a nice alternative to the classic curry. Here's the steps to follow.",

                ],
                [
                    'id' => 3,
                    'img' => "https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg",
                    'type' => "Savory",
                    'title' => "Seafood Spaghetti",
                    'description' => "How to make spaghetti the true italian way! Still remember when my uncle taught me how to cook them properly.",

                ],
            ]),

        ]);



        //JOURNAL User 3
        WidgetDetail::factory()->create([
            'user_id' => 3,
            'widget_id' => 5,
            'settings' => json_encode([

                [
                    'id' => 1,
                    'date' => '2024-06-12',
                    'title' => "School Notes",
                    'content' => "A whole lot of text, words and words and words and words.",
                ],
                [
                    'id' => 2,
                    'date' => '2024-06-13',
                    'title' => "Things I appreciated today",
                    'content' => "A whole lot of text, words and words and words and words.",
                ],
                [
                    'id' => 3,
                    'date' => '2024-06-14',
                    'title' => "A journal entry",
                    'content' => "A whole lot of text, words and words and words and words.",
                ],
            ]),


        ]);
    }
}
