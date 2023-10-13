use rand::prelude::*;
use serde_json::json;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(
            json!({
              "joke": get_joke()
            })
            .to_string()
            .into(),
        )?)
}

fn pick_random_string(list_of_strings: &[&str]) -> String {
    let mut rng = rand::thread_rng();
    list_of_strings[rng.gen_range(0..list_of_strings.len())].to_string()
}

fn get_joke() -> String {
    let list_of_jokes = [
        "<h2>I'm a big fan of whiteboards. I find them quite....re-markable.</h2>",
        "<h2>I ate a clock yesterday, it was very time-consuming.</h2>",
        "<h2>How did the picture end up in jail? It was framed!</h2>",
        "<h2>I got a joke about sausage, it's the <i>wurst</i></h2>",
        "<h2>I have joke about paper, it's <i>terrible</i></h2>",
        "<h2>Cactus puns are simply succulent.</h2>",
        "<h2>What do you call a tall pile of cats?......A <i>meowntain</i></h2>",
        "<h2>Why couldn't the bicycle stand up?....because it was too tired</h2>",
        "<h2>What concert costs 45 cents? 50 cent ft. <i>Nickleback</i></h2>",
        "<h2>What did the buffalo say when his son left? Bison!</h2>",
        "<h2>What do you call a pig that knows karate?  A porkchop!</h2>",
        "<h2>what does a vegetarian zombie eat?  GRAINNSS</h2>",
        "<h2>did you hear the one about the vacuum?  it sucks.</h2>",
        "<h2>I made a pun about wind, but it blows</h2>",
        "<h2>Why do the French eat snails? Because they don't like fast food</h2>",
    ];
    return pick_random_string(&list_of_jokes);
}
