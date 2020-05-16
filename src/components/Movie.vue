<template>
  <div>
    {{ message }}
    <button class="generate-movie" @click="generateMovie">Ny film</button>
    <!-- <button @click="fetchData">Rating shit</button> -->
    <div class="movie">
      <span class="title"></span>

      <img
        class="movie-poster"
        src="https://cdn4.iconfinder.com/data/icons/user-essential/32/clipper_clipboard_film_movie_multimedia-512.png"
      />
      <span class="rating hidden"></span>
    </div>
    <ul id="player-list">
      <li
        v-for="(player, index) in playerList"
        :id="index"
        :key="index"
        :class="{ 'active': index === 0 }"
      >
        {{ player.name }}
        <span>Point: {{ player.points }}</span>
        <span v-if="player.myTurn == false">{{ player.myTurn }}</span>
        <span v-if="playerList[index] === 0">Current</span>
      </li>
    </ul>
    <!-- <input type="text" class="addplayer" />
    <button @click="addPlayer">Add player</button>-->
    <br />
    <br />

    <div class="list-of-players" style="text-align: left;">
      <ul>
        <li v-for="(item, index) in array" :key="index">
          {{ item.name }} |
          <span class="points">Points: {{ item.points }}</span>
          |
          <span class="playerguess hidden">Gæt: {{ item.guess}}</span>
        </li>
      </ul>

      <!-- <pre>{{ array }}</pre> -->

      <!-- <button @click="addPointsProp">Tilføj point</button> -->
      <!-- <button @click="updatePointsProp">Update prop til array</button> -->

      <input placeholder="Spillernavn" type="text" id="newItemName" />
      <br />
      <button @click="addItem">Tilføj spiller</button>
      <!-- <button @click="givePoints">Give points</button> -->

      <!-- <input type="text" id="points" placeholder="points" /> -->
      <!-- <input type="text" id="index" placeholder="index" /> -->
    </div>

    <br />
    <br />

    <form v-on:submit.prevent="guess">
      <input id="currentGuessInput" placeholder="Gæt her" />
      <button>Gæt</button>
      <input type="submit" style="position: absolute; left: -9999px" />
    </form>
  </div>
</template>

<script>
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;
import axios from "axios";

export default {
  name: "Movie",
  data: function() {
    return {
      message: "IMDB",
      movieArray: [
        "Star Wars",
        "Whiplash",
        "Interstellar",
        "Se7en",
        "The Shawshank Redemption",
        "The Terminator",
        "Avengers: Endgame",
        "Star Wars: The Rise of Skywalker",
        "Captain Marvel",
        "Shazam!",
        "Dumbo",
        "Godzilla: King of the Monsters",
        "The Lego Movie 2: The Second Part",
        "Spider-Man: Far from Home",
        "How to Train Your Dragon: The Hidden World",
        "Toy Story 4",
        "The Secret Life of Pets 2",
        "The Angry Birds Movie 2",
        "Terminator: Dark Fate",
        "John Wick: Chapter 3 - Parabellum",
        "It Chapter Two",
        "Men in Black: International",
        "Long Shot",
        "47 Meters Down: Uncaged",
        "Once Upon a Time ... in Hollywood",
        "Aladdin",
        "Pokémon Detective Pikachu",
        "Hellboy",
        "The Lion King",
        "Dark Phoenix",
        "Jumanji: The Next Level",
        "Glass",
        "Fighting with My Family",
        "Rambo: Last Blood",
        "What Men Want",
        "Zombieland: Double Tap",
        "Charlie's Angels",
        "Fast & Furious Presents: Hobbs & Shaw",
        "Happy Death Day 2U",
        "Joker",
        "Alita: Battle Angel",
        "Ad Astra",
        "The Addams Family",
        "Captive State",
        "Serenity",
        "Knives Out",
        "Escape Room",
        "Isn't It Romantic",
        "Us",
        "Velvet Buzzsaw",
        "IO",
        "Close",
        "The Hustle",
        "Maleficent: Mistress of Evil",
        "Annabelle Comes Home",
        "Pet Sematary",
        "Triple Frontier",
        "Shaft",
        "The Hole in the Ground",
        "The Kitchen",
        "Anna",
        "Code 8",
        "Murder Mystery",
        "Child's Play",
        "Crawl",
        "Point Blank",
        "Polaroid",
        "Gemini Man",
        "Pretty Woman",
        "Slumdog Millionaire",
        "Fast & Furious",
        "Milk",
        "Beauty and the Beast",
        "Selma",
        "Hachi: A Dogs Tale",
        "The Silence of the Lambs",
        "Terminator 2: Judgment Day",
        "RocknRolla",
        "Aladdin",
        "Alien³",
        "The Bodyguard",
        "The Proposal",
        "Silver Linings Playbook",
        "Up",
        "Die Welle",
        "Cliffhanger",
        "Yes Man",
        "Det forsømte forår",
        "Jurassic Park",
        "Skyfall",
        "Dark Shadows",
        "Rudy",
        "Schindlers List",
        "Eddie the Eagle",
        "Friends",
        "Lone Survivor",
        "Forrest Gump",
        "The Lion King",
        "Léon",
        "The Shawshank Redemption",
        "Speed",
        "Jackass 3D",
        "The Hangover",
        "Crank: High Voltage",
        "Apollo 13",
        "Bad Boys",
        "Braveheart",
        "The Wrestler",
        "Die Hard: With a Vengeance",
        "Transporter 3",
        "First Knight",
        "Shutter Island",
        "GoldenEye",
        "La haine",
        "Heat",
        "Sex Drive",
        "District 9",
        "Pocahontas",
        "Se7en",
        "Toy Story",
        "The Usual Suspects",
        "Waterworld",
        "I Love You, Man",
        "Man on Wire",
        "Zombieland",
        "Happy Gilmore",
        "Independence Day",
        "Mars Attacks!",
        "Mission: Impossible",
        "Pusher",
        "The Rock",
        "Trainspotting",
        "10 Cloverfield Lane",
        "Air Force One",
        "Alien: Resurrection",
        "Bean",
        "The Big Lebowski",
        "Con Air",
        "The Edge",
        "Face/Off",
        "The Game",
        "Good Will Hunting",
        "Hercules",
        "L.A. Confidential",
        "Liar Liar",
        "Men in Black",
        "Harry Potter and the Deathly Hallows: Part 2",
        "Starship Troopers",
        "Titanic",
        "Tomorrow Never Dies",
        "Toy Story 2",
        "The Truman Show",
        "Volcano",
        "The Waterboy",
        "Gran Torino",
        "American History X",
        "Armageddon",
        "Being John Malkovich",
        "Godzilla",
        "The Green Mile",
        "Lock, Stock and Two Smoking Barrels",
        "The Lord of the Rings: The Fellowship of the Ring",
        "Mission: Impossible II",
        "Mulan",
        "The Parent Trap",
        "Rush Hour",
        "Saving Private Ryan",
        "Six Days Seven Nights",
        "Tarzan",
        "Men in Black II",
        "Moneyball",
        "The Lone Ranger",
        "First Man",
        "Limitless",
        "Iron Man 2",
        "Mission: Impossible - Ghost Protocol",
        "Due Date",
        "21 Jump Street",
        "Celda 211",
        "Kick-Ass",
        "Incendies",
        "Ngo si seoi",
        "Looper",
        "The Social Network",
        "Warrior",
        "Theres Something About Mary",
        "Lola rennt",
        "Rise of the Planet of the Apes",
        "BASEketball",
        "The Expendables",
        "Gangster Squad",
        "Despicable Me",
        "The Matrix",
        "The Great Gatsby",
        "The Dark Knight Rises",
        "Sorte kugler",
        "Cloud Atlas",
        "Fight Club",
        "Inception",
        "Grown Ups",
        "The Hunger Games",
        "Mad Max: Fury Road",
        "Prisoners",
        "Taken 2",
        "Straight Outta Compton",
        "The Hangover Part II",
        "Big Daddy",
        "Deadpool",
        "The World Is Not Enough",
        "American Psycho",
        "The Boondock Saints",
        "Monsters University",
        "The Help",
        "Gravity",
        "Spider-Man",
        "Buried",
        "Lara Croft: Tomb Raider",
        "Any Given Sunday",
        "10 Things I Hate About You",
        "Bridesmaids",
        "The Lego Movie",
        "The Kings Speech",
        "Sherlock Holmes: A Game of Shadows",
        "A Star Is Born",
        "Captain Phillips",
        "127 Hours",
        "Just Go with It",
        "Crazy, Stupid, Love.",
        "Fast Five",
        "The Big Short",
        "The Grey",
        "American Reunion",
        "Cast Away",
        "Edge of Tomorrow",
        "Suits",
        "Friends with Benefits",
        "American Pie",
        "Project X",
        "Ted",
        "The Man from U.N.C.L.E.",
        "The Beach",
        "Inside Job",
        "How to Train Your Dragon 2",
        "The Perks of Being a Wallflower",
        "The Revenant",
        "The Straight Story",
        "Now You See Me",
        "The Lord of the Rings: The Return of the King",
        "The Lord of the Rings: The Two Towers",
        "The Sixth Sense",
        "Intouchables",
        "Klovn: The Movie",
        "Despicable Me 2",
        "American Beauty",
        "The Spectacular Now",
        "Bad Boys II",
        "Were the Millers",
        "Gladiator",
        "The Way Way Back",
        "Bohemian Rhapsody",
        "The Hurricane",
        "Scary Movie",
        "The Expendables 2",
        "Wreck-It Ralph",
        "The Perfect Storm",
        "Southpaw",
        "Her",
        "Requiem for a Dream",
        "Minority Report",
        "Black Panther",
        "Phone Booth",
        "A Knights Tale",
        "Divergent",
        "Shanghai Noon",
        "Django Unchained",
        "End of Watch",
        "Blade Runner 2049",
        "Band of Brothers",
        "Deepwater Horizon",
        "Gone in Sixty Seconds",
        "The Patriot",
        "Spotlight",
        "Furious 6",
        "Flight",
        "Seven Psychopaths",
        "Mud",
        "El cuerpo",
        "The Hunger Games: Catching Fire",
        "The Hunger Games: Mockingjay - Part 1",
        "The Hitmans Bodyguard",
        "Zoolander",
        "Rush",
        "Monsters, Inc.",
        "Neighbors",
        "War Dogs",
        "The 33",
        "Guardians of the Galaxy",
        "Non-Stop",
        "12 Years a Slave",
        "Children of Men",
        "What Women Want",
        "Snatch",
        "The Imitation Game",
        "Memento",
        "Inside Out",
        "Dawn of the Planet of the Apes",
        "Jagten",
        "Remember the Titans",
        "Le fabuleux destin dAmélie Poulain",
        "Hacksaw Ridge",
        "Meet the Parents",
        "Pearl Harbor",
        "Long Shot",
        "The Accountant",
        "Road Trip",
        "Enemy at the Gates",
        "Gangs of New York",
        "Big Hero 6",
        "Gone Girl",
        "The Grand Budapest Hotel",
        "Jumanji: Welcome to the Jungle",
        "22 Jump Street",
        "Frozen",
        "The Fast and the Furious",
        "Fruitvale Station",
        "The Matrix Reloaded",
        "Spectre",
        "Coco",
        "Mission: Impossible - Rogue Nation",
        "Avengers: Age of Ultron",
        "Predestination",
        "Oceans Eleven",
        "The Matrix Revolutions",
        "Die Another Day",
        "Get on Up",
        "Star Wars: Episode VII - The Force Awakens",
        "Das Experiment",
        "American Pie 2",
        "Arrival",
        "Wonder",
        "Hell or High Water",
        "Whiplash",
        "The Bourne Identity",
        "Player",
        "Ted 2",
        "Catch Me If You Can",
        "Black Hawk Down",
        "The Royal Tenenbaums",
        "Finding Nemo",
        "Kill Bill: Vol. 1",
        "Rush Hour 2",
        "Me Before You",
        "A Beautiful Mind",
        "Game Night",
        "Casper & Mandrilaftalen",
        "Fury",
        "Everest",
        "Langt fra Las Vegas",
        "Beauty and the Beast",
        "We Were Soldiers",
        "Kingsman: The Secret Service",
        "Mr. Deeds",
        "Furious Seven",
        "Van Wilder",
        "Ali G Indahouse",
        "Amy",
        "28 Days Later...",
        "The Butterfly Effect",
        "Meet the Fockers",
        "John Wick",
        "Rush Hour 3",
        "The Transporter",
        "Zootopia",
        "Taxi 3",
        "The Theory of Everything",
        "Shrek 2",
        "8 Mile",
        "Shanghai Knights",
        "Relatos salvajes",
        "Good Bye Lenin!",
        "Old School",
        "The Jungle Book",
        "Creed",
        "Spy",
        "Crazy Rich Asians",
        "Now You See Me 2",
        "Master and Commander: The Far Side of the World",
        "The League of Extraordinary Gentlemen",
        "Love Actually",
        "Bruce Almighty",
        "Spider-Man 2",
        "Room",
        "Cidade de Deus",
        "The Incredibles",
        "The Italian Job",
        "Mission: Impossible III",
        "The Day After Tomorrow",
        "2 Fast 2 Furious",
        "The Last Samurai",
        "Pirates of the Caribbean: The Curse of the Black Pearl",
        "Sully",
        "Mystic River",
        "American Wedding",
        "Klassefesten 2: Begravelsen",
        "The Notebook",
        "The School of Rock",
        "Troy",
        "Starsky & Hutch",
        "Live Free or Die Hard",
        "Eternal Sunshine of the Spotless Mind",
        "Van Helsing",
        "Sicario",
        "Along Came Polly",
        "50 First Dates",
        "I, Robot",
        "War for the Planet of the Apes",
        "P.I.S. - Politiets indsatsstyrke",
        "Miracle",
        "Oceans Twelve",
        "Race",
        "Ray",
        "The Disaster Artist",
        "Cinderella Man",
        "American Made",
        "EuroTrip",
        "Mr. & Mrs. Smith",
        "Anchorman: The Legend of Ron Burgundy",
        "Walk the Line",
        "The Secret Life of Walter Mitty",
        "Incredibles 2",
        "King Kong",
        "Inglourious Basterds",
        "The Machinist",
        "Der Untergang",
        "Dawn of the Dead",
        "Oldeuboi",
        "Dodgeball: A True Underdog Story",
        "Shaun of the Dead",
        "The Martian",
        "Harold & Kumar Go to White Castle",
        "Indiana Jones and the Kingdom of the Crystal Skull",
        "Bridge of Spies",
        "National Treasure",
        "Two and a Half Men",
        "Collateral",
        "Iron Man",
        "Jul på Vesterbro",
        "The Bourne Supremacy",
        "Team America: World Police",
        "Batman Begins",
        "The Pacific",
        "Napoleon Dynamite",
        "The Equalizer 2",
        "Flight of the Phoenix",
        "La La Land",
        "Touching the Void",
        "Capote",
        "The Nice Guys",
        "Casino Royale",
        "White Chicks",
        "The Da Vinci Code",
        "Ratatouille",
        "Only the Brave",
        "Under sandet",
        "Accepted",
        "Glory Road",
        "Hitch",
        "Terkel i knibe",
        "Saw",
        "Transporter 2",
        "Baby Driver",
        "Guardians of the Galaxy Vol. 2",
        "Click",
        "Friday Night Lights",
        "Coach Carter",
        "Hotel Rwanda",
        "Wedding Crashers",
        "Drengene fra Angora",
        "The Longest Yard",
        "Lord of War",
        "Sin City",
        "Manchester by the Sea",
        "Das Leben der Anderen",
        "Million Dollar Baby",
        "The 40 Year Old Virgin",
        "The Guardian",
        "The Departed",
        "En man som heter Ove",
        "Watchmen",
        "Lost",
        "Spider-Man 3",
        "300",
        "Transformers",
        "Jarhead",
        "Jason Bourne",
        "Mollys Game",
        "Widows",
        "Get Smart",
        "Hot Fuzz",
        "Lucky Number Slevin",
        "Billions",
        "The Great Debaters",
        "The Founder",
        "The A-Team",
        "Role Models",
        "V for Vendetta",
        "Klovn",
        "Toy Story 3",
        "The Bourne Ultimatum",
        "John Wick: Chapter 2",
        "Borat: Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan",
        "Zodiac",
        "Invincible",
        "Gifted",
        "Hancock",
        "Blood Diamond",
        "The Break-Up",
        "42",
        "Inside Man",
        "The Pursuit of Happyness",
        "Prison Break",
        "Darkest Hour",
        "The Last King of Scotland",
        "The Equalizer",
        "Patriots Day",
        "El laberinto del fauno",
        "The Devil Wears Prada",
        "Klovn Forever",
        "How I Met Your Mother",
        "The Fate of the Furious",
        "Spider-Man: Into the Spider-Verse",
        "The Fast and the Furious: Tokyo Drift",
        "Kingsman: The Golden Circle",
        "National Treasure: Book of Secrets",
        "Shoot Em Up",
        "Juno",
        "The Dark Knight",
        "There Will Be Blood",
        "The Express",
        "Ex Machina",
        "Apocalypto",
        "21",
        "Knocked Up",
        "Crank",
        "I Am Legend",
        "Harold & Kumar Escape from Guantanamo Bay",
        "The Prestige",
        "Hidden Figures",
        "Contratiempo",
        "Mission: Impossible - Fallout",
        "Lady Bird",
        "Wanted",
        "Oceans Thirteen",
        "Moonlight",
        "Letters from Iwo Jima",
        "Avatar",
        "Dunkirk",
        "Three Billboards Outside Ebbing, Missouri",
        "Get Out",
        "Sicario: Day of the Soldado",
        "Marshall",
        "Wind River",
        "Logan Lucky",
        "Hotel Mumbai",
        "The Big Sick",
        "Planet Earth II",
        "I, Tonya",
        "The Shape of Water",
        "Brawl in Cell Block 99",
        "Captive State",
        "Vice",
        "Icarus",
        "Creed II",
        "Becoming Warren Buffett",
        "Upgrade",
        "Fighting with My Family",
        "Where Eagles Dare",
        "Red Nose Day Actually",
        "A Clockwork Orange",
        "Den skyldige",
        "Arctic",
        "Green Book",
        "The Exorcist",
        "BlacKkKlansman",
        "Chernobyl",
        "Instant Family",
        "Into the Wild",
        "We Are Marshall",
        "I Now Pronounce You Chuck & Larry",
        "Searching",
        "Star Wars",
        "Samsara",
        "Drive",
        "In Bruges",
        "Hot Rod",
        "Alien",
        "Jack Reacher",
        "Planet Earth",
        "The Mule",
        "Forgetting Sarah Marshall",
        "The Incredible Hulk",
        "Star Wars: Episode V - The Empire Strikes Back",
        "The Shining",
        "Interstellar",
        "World War Z",
        "Shooter",
        "Superbad",
        "Raiders of the Lost Ark",
        "Quantum of Solace",
        "Step Brothers",
        "The Town",
        "The Avengers",
        "Star Wars: Episode VI - Return of the Jedi",
        "Indiana Jones and the Temple of Doom",
        "The Blind Side",
        "The Terminator",
        "Back to the Future",
        "The Hurt Locker",
        "Brüno",
        "How to Train Your Dragon",
        "Aliens",
        "WALL·E",
        "Hoosiers",
        "Top Gun",
        "Dirty Dancing",
        "Precious",
        "Full Metal Jacket",
        "Taken",
        "Tropic Thunder",
        "Source Code",
        "Die Hard",
        "Rain Man",
        "You Dont Mess with the Zohan",
        "The Fighter",
        "The Abyss",
        "Dead Poets Society",
        "17 Again",
        "Indiana Jones and the Last Crusade",
        "The Little Mermaid",
        "Mary and Max",
        "Sherlock Holmes",
        "The Wolf of Wall Street",
        "Die Hard 2",
        'Slumdog Millionaire',
        'Silver Linings Playbook',
        'Up',
        'Cloverfield',
        'Groundhog Day',
        'Skyfall',
        'Tron',
        'The Shawshank Redemption',
        'Se7en',
        '101 Dalmatians',
        'Zombieland',
        'Good Will Hunting',
        'Harry Potter and the Deathly Hallows: Part 2',
        'The Truman Show',
        'Star Wars: Episode I - The Phantom Menace',
        'Star Wars: Episode II - Attack of the Clones',
        'Star Wars: Episode III - Revenge of the Sith',
        'Iron Man 2',
        'Mission: Impossible - Ghost Protocol',
        '21 Jump Street',
        'Lie to Me',
        'Death Note',
        'Venom',
        'The Social Network',
        'Iron Man Three',
        '50/50',
        'The Umbrella Academy',
        'Treasure Planet',
        'The Great Gatsby',
        'Cloud Atlas',
        'Suicide Squad',
        'The Hunger Games',
        'Monsters University',
        'Spider-Man',
        'The Kings Speech',
        'Taxi',
        'Workaholics',
        'Edge of Tomorrow',
        'In Time',
        'Pacific Rim',
        'Intouchables',
        'Ready Player One',
        'Enders Game',
        'Moonrise Kingdom',
        'The Maze Runner',
        '13 Reasons Why',
        'A Knights Tale',
        'Taxi 2',
        'Divergent',
        'Django Unchained',
        'The Amazing Spider-Man 2',
        'The Hunger Games: Catching Fire',
        'The Hunger Games: Mockingjay - Part 1',
        'Monsters, Inc.',
        'Guardians of the Galaxy',
        'The Imitation Game',
        'Black Mirror',
        'Inside Out',
        'Spider-Man: Homecoming',
        '22 Jump Street',
        'The Fast and the Furious',
        'Need for Speed',
        'The Barkley Marathons: The Race That Eats Its Young',
        'Harry Potter and the Sorcerers Stone',
        'Sen to Chihiro no kamikakushi',
        'Brooklyn Nine-Nine',
        'Birdman or (The Unexpected Virtue of Ignorance)',
        'Whiplash',
        'Finding Nemo',
        'A Beautiful Mind',
        'Kingsman: The Secret Service',
        'Rick and Morty',
        'Bend It Like Beckham',
        'Chef',
        'Zootopia',
        'Harry Potter and the Chamber of Secrets',
        'Taxi 3',
        'Harry Potter and the Prisoner of Azkaban',
        'The Flash',
        'Spider-Man 2',
        'The Italian Job',
        'Fantastic Beasts and Where to Find Them',
        '2 Fast 2 Furious',
        'Brother Bear',
        'Harry Potter and the Goblet of Fire',
        'Daredevil',
        'Eternal Sunshine of the Spotless Mind',
        'Grimsby',
        'Harold & Kumar Go to White Castle',
        'Arrested Development',
        'Iron Man',
        'Harry Potter and the Order of the Phoenix',
        'Casino Royale',
        'Ratatouille',
        'The Golden Compass',
        'Baby Driver',
        'Guardians of the Galaxy Vol. 2',
        'Maze Runner: The Scorch Trials',
        'Spider-Man 3',
        'Mr. Robot',
        'Harry Potter and the Half-Blood Prince',
        'The Defenders',
        'V for Vendetta',
        'Scott Pilgrim vs. the World',
        'Stranger Things',
        'How I Met Your Mother',
        'The Fast and the Furious: Tokyo Drift',
        'Kingsman: The Golden Circle',
        'I Am Legend',
        'Inkheart',
        'Ralph Breaks the Internet',
        'Game of Thrones: Winterfell',
        'Game of Thrones: A Knight of the Seven Kingdoms',
        'Game of Thrones: The Long Night',
        'Game of Thrones: The Last of the Starks',
        'Game of Thrones: The Bells',
        'Game of Thrones: The Iron Throne',
        'The End of the F***ing World',
        'Chernobyl',
        'Star Wars',
        'Sex Education',
        'Drive',
        'Star Wars: Episode V - The Empire Strikes Back',
        'Star Wars: Episode VI - Return of the Jedi',
        'Death Note: Desu nôto',
        'WALL·E',
        'Harry Potter and the Deathly Hallows: Part 1',
        'Game of Thrones',
        'The Amazing Spider-Man',
        'The Wolf of Wall Street',
        'Home Alone',
        'The Hangover',
        'District 9',
        'Zombieland',
        'First Man',
        '21 Jump Street',
        'Prisoners',
        'The Hangover Part II',
        'Gravity',
        'Sherlock',
        'A Star Is Born',
        'Friends with Benefits',
        'Ted',
        'Inside Job',
        'How to Train Your Dragon 2',
        'The Perks of Being a Wallflower',
        'Were the Millers',
        'Bohemian Rhapsody',
        'Zero Dark Thirty',
        'Django Unchained',
        'End of Watch',
        'Deepwater Horizon',
        'El cuerpo',
        'The Imitation Game',
        'Jagten',
        'Hacksaw Ridge',
        'The Accountant',
        'The Purge',
        'Fruitvale Station',
        'Coco',
        'How to Train Your Dragon: The Hidden World',
        'Whiplash',
        'Ted 2',
        'Catch Me If You Can',
        'Kingsman: The Secret Service',
        'The Purge: Anarchy',
        'Relatos salvajes',
        'Creed',
        'Crazy Rich Asians',
        'Room',
        'Cidade de Deus',
        'Sully',
        'The Martian',
        'Snowden',
        'Only the Brave',
        'Baby Driver',
        'Das Leben der Anderen',
        'The Purge: Election Year',
        'Avengers: Infinity War',
        'V for Vendetta',
        'Zodiac',
        'Patriots Day',
        'The Prestige',
        'Hidden Figures',
        'Contratiempo',
        'Three Billboards Outside Ebbing, Missouri',
        'Mindhunter',
        'Logan Lucky',
        'The Big Sick',
        'I, Tonya',
        'Call Me by Your Name',
        'The First Purge',
        'La Mante',
        'Fighting with My Family',
        'Arctic',
        'Green Book',
        'BlacKkKlansman',
        'Into the Wild',
        'The Perfect Date',
        'Step Brothers',
        'The Hurt Locker',
        'How to Train Your Dragon',
        'Breaking Bad',
        'The Great Hack',
        'The Wolf of Wall Street',
        'Inception',
        'Whiplash',
        'The Wolf of Wall Street',
        'Hereditary',
        'Prisoners',
        'Room',
        'Mad Max: Fury Road',
        'Logan',
        'Her',
        'Sing Street',
        'Call Me by Your Name',
        'Hacksaw Ridge',
        'Ex Machina',
        'The Social Network',
        'Toy Story 3',
        'Arrival',
        'Captain America: The Winter Soldier',
        'Skyfall',
        'It',
        'Rush',
        'Green Book',
        'The Big Sick',
        'Get Out',
        'Mud',
        'Hell or High Water',
        'The Fighter',
        'Manchester by the Sea',
        'Birdman or (The Unexpected Virtue of Ignorance)',
        'The Town',
        'The Martian',
        'Nightcrawler',
        'Lady Bird',
        'A Quiet Place',
        'Moonlight',
        'Coco',
        'Dunkirk',
        'Wind River',
        'Baby Driver',
        'Nocturnal Animals',
        'Once Upon a Time ... in Hollywood',
        'The Spectacular Now',
        'Moneyball',
        'BlacKkKlansman',
        'Captain Phillips',
        'Avengers: Infinity War',
        'Us',
        'The Jungle Book',
        'Blade Runner 2049',
        'Dawn of the Planet of the Apes',
        'The Nice Guys',
        'Avengers: Endgame',
        'Silver Linings Playbook',
        'The Revenant',
        'The Hateful Eight',
        'I, Tonya',
        'Silence',
        '120',
        'Spotlight',
        'Captain America: Civil War',
        'Sicario',
        'Star Wars: Episode VII - The Force Awakens',
        'X-Men: Days of Future Past',
        'Looper',
        'Gone Girl',
        'Deepwater Horizon',
        'Mollys Game',
        'Me and Earl and the Dying Girl',
        'Chronicle',
        'The Shape of Water',
        'The Post',
        'Fruitvale Station',
        'War for the Planet of the Apes',
        'Creed',
        'Spider-Man: Into the Spider-Verse',
        'Inside Out',
        'La La Land',
        'Fury',
        'Split',
        'Edge of Tomorrow',
        'Shazam!',
        'It Follows',
        'Annihilation',
        'Logan Lucky',
        'Three Billboards Outside Ebbing, Missouri',
        'Spider-Man: Far from Home',
        'Mission: Impossible - Rogue Nation',
        'The Avengers',
        'Deadpool',
        'Interstellar',
        'A Star Is Born',
        '127 Hours',
        'Bridge of Spies',
        'The Favourite',
        'The Florida Project',
        'Life of Pi',
        'Ready Player One',
        '117',
        'Steve Jobs',
        'The Conjuring 2',
        'Beasts of No Nation',
        'Incredibles 2',
        'The Big Short',
        'Midsommar',
        'Roma',
        'Battle of the Sexes',
        'The Lego Movie',
        'Chef',
        'A Monster Calls',
        'The Disaster Artist',
        'Booksmart',
        'Hidden Figures',
        'Rogue One',
        'Detroit',
        'Patriots Day',
        'Kubo and the Two Strings',
        'The Conjuring',
        'The Hunger Games: Catching Fire',
        'The Imitation Game',
        'Brooklyn',
        'Wonder Woman',
        'Sully',
        'Harry Potter and the Deathly Hallows: Part 2',
        'Rise of the Planet of the Apes',
        '10 Cloverfield Lane',
        'Jackie',
        'Straight Outta Compton',
        'Spider-Man: Homecoming',
        'The Guest',
        'The Theory of Everything',
        'The Perks of Being a Wallflower',
        'Moana',
        'Star Trek Beyond',
        'Locke',
        'Blue Valentine',
        'Zootopia',
        'John Wick: Chapter 3 - Parabellum',
        'Black Panther',
        'Love, Simon',
        'True Grit',
        'Toy Story 4',
        'Good Time',
        'Hugo',
        'The Edge of Seventeen',
        'Star Wars: Episode VIII - The Last Jedi',
        'Ant-Man',
        'Eighth Grade',
        'Gravity',
        'The Lego Batman Movie',
        'John Wick',
        'Les Misérables',
        'X: First Class',
        '50/50',
        'Lion',
        'Boyhood',
        'The Gift',
        'Stronger',
        'Moonrise Kingdom',
        'Paterson',
        'Captain Fantastic',
        'Widows',
        'Midnight Special',
        'The Fault in Our Stars',
        'Beauty and the Beast',
        'Thor: Ragnarok',
        'Zero Dark Thirty',
        'Short Term 12',
        'Fences',
        'Everybody Wants Some!!',
        'John Wick: Chapter 2',
        '20th Century Women',
        'The Hobbit: The Desolation of Smaug',
        'Dont Breathe',
        'Lo imposible',
        'Big Hero 6',
        'Foxcatcher',
        'Snowpiercer',
        'The Descendants',
        '118',
        'Beasts of the Southern Wild',
        '22 Jump Street',
        'This Is the End',
        'Finding Dory',
        'Bumblebee',
        'The Way Way Back',
        'The Lobster',
        'Lincoln',
        'Only the Brave',
        'Furious 6',
        'Black Mass',
        'Drive',
        '100',
        'It Comes at Night',
        'How to Train Your Dragon 2',
        'Doctor Strange',
        'A Most Violent Year',
        'Nebraska',
        'Halloween',
        'Shame',
        'Attack the Block',
        'Guardians of the Galaxy',
        'La vie dAdèle',
        'The Girl with the Dragon Tattoo',
        'Star Trek Into Darkness',
        'Avengers: Age of Ultron',
        'Everest',
        'How to Train Your Dragon',
        'Man of Steel',
        'Fantastic Beasts and Where to Find Them',
        'Kingsman: The Secret Service',
        'Three Identical Strangers',
        'Alien: Covenant',
        'Selma',
        'Wonder',
        'The Founder',
        'Warrior',
        'Dope',
        'Shutter Island',
        'American Sniper',
        'Black Swan',
        'Sorry to Bother You',
        'Kick-Ass',
        'The Hobbit: An Unexpected Journey',
        'Don Jon',
        'American Hustle',
        'Wreck-It Ralph',
        'Fighting with My Family',
        'The Tree of Life',
        'The Cabin in the Woods',
        'Mission: Impossible - Ghost Protocol',
        'Thank You for Your Service',
        'End of Watch',
        'Lights Out',
        'The Help',
        'Kong: Skull Island',
        'Aquaman',
        'Godzilla',
        'The Dark Knight Rises',
        'Before Midnight',
        'The Man from U.N.C.L.E.',
        'Bohemian Rhapsody',
        'Fast Five',
        'War Horse',
        'Midnight in Paris',
        'Winters Bone',
        'The Master',
        '21 Jump Street',
        'The Visit',
        'Gifted',
        'The Lord of the Rings: The Return of the King',
        'The Pianist',
        '12 Years a Slave',
        'The Lord of the Rings: The Fellowship of the Ring',
        'Capote',
        'Lincoln',
        'The Lord of the Rings: The Two Towers',
        'Oldeuboi',
        'Memento',
        'Elephant',
        'El laberinto del fauno',
        'There Will Be Blood',
        'La môme',
        'Up',
        'The Dark Knight',
        'Hotel Rwanda',
        'Slumdog Millionaire',
        'Le scaphandre et le papillon',
        'The Kings Speech',
        'Children of Men',
        'The Departed',
        'Amour',
        'Y tu mamá también',
        'Gravity',
        'Shaun of the Dead',
        'A Beautiful Mind',
        'Der Untergang',
        'Inception',
        'Cold Mountain',
        'Mar adentro',
        'Babel',
        'In the Loop',
        'Chicago',
        'Letters from Iwo Jima',
        'Gangs of New York',
        'Beasts of the Southern Wild',
        'Requiem for a Dream',
        'Madeo',
        'Road to Perdition',
        'Cidade de Deus',
        'Sideways',
        'Eternal Sunshine of the Spotless Mind',
        'Død snø',
        'King Kong',
        'The Reader',
        'The Dark Knight Rises',
        'Perfume: The Story of a Murderer',
        'Brokeback Mountain',
        'Eastern Promises',
        'Caché',
        'Im Not There',
        'A Dangerous Method',
        'Chocolat',
        'Moulin Rouge!',
        'Les Misérables',
        'Public Enemies',
        'The Aviator',
        'The Royal Tenenbaums',
        'Gladiator',
        'True Grit',
        'Yi yi',
        'Traffic',
        'Lost in Translation',
        'Inglourious Basterds',
        'The Queen',
        'The Incredibles',
        'Doubt',
        'The Master',
        'Mulholland Dr.',
        'Unbreakable',
        'Drive',
        'The Last King of Scotland',
        'My Week with Marilyn',
        'Whale Rider',
        'Hunger',
        'Creation',
        'Batman Begins',
        'Before Night Falls',
        'Milk',
        'Closer',
        'Good Bye Lenin!',
        'Tropic Thunder',
        'Black Hawk Down',
        'Wo hu cang long',
        'Blue Valentine',
        'Shutter Island',
        'Gomorra',
        'Artificial Intelligence: AI',
        'Beginners',
        'George Washington',
        'The Artist',
        'Master and Commander: The Far Side of the World',
        'Captain Phillips',
        'La piel que habito',
        'Okuribito',
        'Bamboozled',
        'Lawless',
        'Inside Llewyn Davis',
        'Gisaengchung'
      ],
      playerList: [
        // { myTurn: false, name: "Peter", points: 0 }
      ],
      currentActive: Number,
      currentGuess: String,
      array: [],
      currentIndex: 0,
      currentMovie: {
        rating: Number
      },
      currentRating: Number,
      data: null,
      errors: [],
      currentTitle: String,
      turns: 0
    };
  },
  props: {
    msg: String
  },
  //  created() {
  //  this.array.push({ name: "Player 1", points: 0, guess: String });
  //  },
  methods: {
    addPointsProp() {
      this.array.forEach(item => {
        this.$set(item, "points", 0);
      });
    },
    updatePointsProp() {
      this.array.forEach(item => {
        item.points = 0;
      });
    },
    addItem() {
      this.array.push({
        name: $("#newItemName").val(),
        points: 0,
        guess: ""
      });
    },
    givePoints() {
      let x = this.array.length - 1;
      let xName = this.array[x];
      /* eslint-disable no-console */
      console.log(x, xName.name);

      let itemPoints = $("#points").val();
      let itemIndex = $("#index").val();

      setTimeout(() => {
        this.array[itemIndex].points = itemPoints;
      }, 0);
    },
    generateMovie() {
      let chooseRandom = Math.floor(Math.random() * this.movieArray.length);
      let chooseMovie = this.movieArray[chooseRandom];
      console.log("Random: ", chooseRandom);
      axios
        .get(
          "http://www.omdbapi.com/?apikey=106e2bd&t=" + encodeURI(chooseMovie)
        )
        .then(response => {
          this.currentRating = response.data.imdbRating;
          this.currentTitle = response.data.Title;
          this.$forceUpdate();

          var rating = response.data.imdbRating;
          var imageUrl = response.data.Poster;
          var title = response.data.Title;

          if (imageUrl !== "N/A") {
            $(".movie-poster").attr("src", imageUrl);
          }

          $(".title").html(title);

          if (rating != "N/A") {
            $(".rating").html(rating);
          } else {
            $("rating").addClass("no-rating");
          }
        })
        .catch(error => {
          this.errors.push(error);
        });

      // $.getJSON(
      //   "http://www.omdbapi.com/?apikey=106e2bd&t=" + encodeURI(chooseMovie)
      // ).then(function(response) {
      //   var rating = response.imdbRating;
      //   // console.log(rating);

      //   // this.currentRating = response.imdbRating;

      //   var imageUrl = response.Poster;
      //   var title = response.Title;

      //   if (imageUrl !== "N/A") {
      //     $(".movie-poster").attr("src", imageUrl);
      //   }

      //   $(".title").html(title);

      //   if (rating != "N/A") {
      //     $(".rating").html(rating);
      //   } else {
      //     $("rating").addClass("no-rating");
      //   }
      // });

      $(".rating").addClass("hidden");
      $(".playerguess").addClass("hidden");
    },
    addPlayer() {
      this.playerList.push({
        name: $(".addplayer").val(),
        myTurn: false,
        points: 0
      });
    },
    guess() {
      this.currentGuess = $("#currentGuessInput").val();

      this.points += this.currentGuess;
      /* eslint-disable no-console */
      console.log("Current guess: ", this.currentGuess);

      let currentGuessJS = parseFloat($("#currentGuessInput").val(), 10);
      let currentGuessString = $("#currentGuessInput").val();

      let pointsGiven =
        Math.round(Math.abs(this.currentRating - currentGuessJS) * 100) / 100;
      console.log("points given: ", pointsGiven);

      if (pointsGiven == 0) {
        pointsGiven = 15;
      } else if (pointsGiven < 0.251) {
        pointsGiven = 10;
      } else if (pointsGiven < 0.51) {
        pointsGiven = 5;
      } else if (pointsGiven < 1.1) {
        pointsGiven = 3;
      } else if (pointsGiven < 2) {
        pointsGiven = 1;
      } else {
        pointsGiven = 0;
      }

      this.array[this.currentIndex].points =
        this.array[this.currentIndex].points + pointsGiven;

      this.array[this.currentIndex].guess = currentGuessString;

      this.currentIndex++;

      console.log(this.currentMovieRating);

      let arrayLength = this.array.length;
      if (this.currentIndex == arrayLength) {
        this.currentIndex = 0;
        $(".rating").removeClass("hidden");
        $(".points").removeClass("hidden");
        $(".playerguess").removeClass("hidden");

        setTimeout(function() {
          $('.generate-movie').click();
        }, 5000);
      }

      // }
      $("#currentGuessInput").val("");
    }
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: "Open Sans", sans-serif;
}

.hidden {
  color: transparent;
  text-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
}

.list-of-players {
  text-align: left;
}

#currentGuessInput {
  padding: 8px 15px;
  margin-right: -1px;
  color: transparent;
  text-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
}

#newItemName {
  padding: 8px 10px;
}

button {
  outline: 0;
  border: 0;
  padding: 10px 20px;
  background: #2c4355;
  color: white;
  transition: all 0.3s ease;
}

button:hover {
  cursor: pointer;
  background: #333;
}

.movie {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie .movie-poster {
  display: block;
  max-width: 100%;
  height: auto;
  width: 250px;
}

.movie .title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 15px;
}

.movie .rating {
  margin-top: 15px;
  font-size: 24px;
}

.movie .rating.no-rating {
  display: block;
  background: red;
  color: red;
}

.guess {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.guess #guess {
  width: 300px;
}

.player-area {
  position: absolute;
  bottom: 125px;
  width: 99%;
}

#player-list {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  width: 99%;
  position: absolute;
}

#player-list li {
  padding: 15px;
  color: white;
  list-style: none;
  width: 225px;
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;
}

#player-list li.active {
  border: 5px solid red;
}

#player-list li:nth-child(1) {
  background-color: #123;
}

#player-list li:nth-child(2) {
  background-color: #b30000;
}

#player-list li:nth-child(3) {
  background-color: #ffc107;
  color: black;
}

#player-list li:nth-child(4) {
  background-color: #006900;
}

#player-list li:nth-child(5) {
  background-color: purple;
}

#player-list li:nth-child(6) {
  background-color: #123;
}

#player-list li:nth-child(7) {
  background-color: #b30000;
}

#player-list li:nth-child(8) {
  background-color: #ffc107;
  color: black;
}

#player-list li:nth-child(9) {
  background-color: #006900;
}

#player-list li:nth-child(10) {
  background-color: purple;
}
</style>
