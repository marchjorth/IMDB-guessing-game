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

    <div class="test-shit" style="text-align: left;">
      <ul>
        <li
          v-for="(item, index) in array"
          :key="index"
        >{{ item.name }} | Points: {{ item.points }} | Gæt: {{ item.guess}}</li>
      </ul>

      <!-- <pre>{{ array }}</pre> -->

      <!-- <button @click="addPointsProp">Tilføj point</button> -->
      <!-- <button @click="updatePointsProp">Update prop til array</button> -->
      <button @click="addItem">Tilføj spiller</button>
      <!-- <button @click="givePoints">Give points</button> -->
      <input placeholder="item name" type="text" id="newItemName" />

      <!-- <input type="text" id="points" placeholder="points" /> -->
      <!-- <input type="text" id="index" placeholder="index" /> -->
    </div>

    <br />
    <br />

    <form v-on:submit.prevent="guess">
      <input id="currentGuessInput" placeholder="Gæt her" />
      <button>Gæt</button>
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
        "Frozen II",
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
        "Gemini Man"
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

      let pointsGiven = Math.round(Math.abs(this.currentRating -  currentGuessJS) * 100) / 100;  
      console.log('points given: ', pointsGiven);

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
      }

      // }
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

button {
  outline: 0;
  border: 0;
  padding: 10px 20px;
  background: #111;
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
