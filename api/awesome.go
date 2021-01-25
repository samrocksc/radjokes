package handler

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Sprintln(randomJoke())
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
		"How did the picture end up in jail? It was framed!",
		"Cactus puns are simply succulent.",
		"What do you call a tall pile of cats?......A meowntain",
		"Why couldn't the bicycle stand up?....because it was too tired",
		"What concert costs 45 cents? 50 cent ft. _Nickleback_",
		"<h1>What did the buffalo say when his son left? Bison!</h1>",
	}

	return jokes[rand.Intn(len(jokes))]
}
