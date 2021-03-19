use http::StatusCode;
use std::error::Error;
use util::print_foo;
use vercel_lambda::{error::VercelError, lambda, IntoResponse, Request, Response};

fn handler(_: Request) -> Result<impl IntoResponse, VercelError> {
  print_foo();
  let response = Response::builder()
    .status(StatusCode::OK)
    .header("Content-Type", "text/plain")
    .body("Let's make a joke")
    .expect("Internal Server Error");

  Ok(response)
}

// Start the runtime with the handler
fn main() -> Result<(), Box<dyn Error>> {
  Ok(lambda!(handler))
}
