package handler

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, randomJoke())
}

func init() {
	rand.Seed(time.Now().UnixNano())
}

// randomJoke summons the radness of a joke!
func randomJoke() string {
	jokes := []string{
		"<h1>I'm a big fan of whiteboards. I find them quite....re-markable.</h1>",
		"I ate a clock yesterday, it was very time-consuming.",
		"How did the picture end up in jail? It was framed!",
		"I got a joke about sausage, it's the _wurst_",
		"I have joke about paper, it's _terrible_",
		"Cactus puns are simply succulent.",
		"What do you call a tall pile of cats?......A _meowntain_",
		"Why couldn't the bicycle stand up?....because it was too tired",
		"What concert costs 45 cents? 50 cent ft. _Nickleback_",
		"<h1>What did the buffalo say when his son left? Bison!</h1>",
		"What do you call a pig that knows karate?  A porkchop!",
		"what does a vegetarian zombie eat?  GRAINNSS",
		"did you hear the one about the vacuum?  it sucks.",
		"I made a pun about wind, but it blows",
	}

	return jokes[rand.Intn(len(jokes))]
}
