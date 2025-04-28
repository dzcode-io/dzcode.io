#!/usr/bin/env RUST_BACKTRACE=1 cargo +nightly -Zscript

---
package.edition = "2024"

[dependencies]
cli-run = { git = "https://github.com/zibanpirate/cli-rs.git" }
clap = { version = "4", features = ["derive"] }
---

use clap::Parser;

#[derive(Clone, Debug, clap::ValueEnum)]
enum Env {
    Stage,
    Production,
}

/// Deploy dzcode to stage or production
#[derive(Parser, Debug)]
struct Args {
    /// Environment to deploy to
    #[arg(short, long, value_enum)]
    env: Env,

    /// Clean build
    #[arg(short, long, default_value_t = false)]
    clean: bool,
}

fn main() {

    let args = Args::parse();
    let env = args.env;

    println!("Ensuring docker is running ...");
    cli_run::cli_run("docker", vec!["ps"]);

    if args.clean {
        println!("clean...");
        cli_run::cli_run("npm", vec!["run", "clean"]);
      }

    println!("Build...");
    cli_run::cli_run("npm", vec!["run", "build"]);

    println!("Preparing ./web-server ...");
    cli_run::cli_run("npm", vec!["run", "bundle:alone", "--workspace=@dzcode.io/web"]);
    cli_run::cli_run("npm", vec!["run", "pre-deploy", "--workspace=@dzcode.io/web"]);
    cli_run::cli_run("npm", vec!["run", "prepare-dockerfile", "--workspace=@dzcode.io/web-server"]);

    println!("Preparing ./api ...");
    cli_run::cli_run("npm", vec!["run", "prepare-dockerfile", "--workspace=@dzcode.io/api"]);


    let env_str = format!("{:?}", env).to_lowercase();

    println!("Building ./web-server docker image ...");
    cli_run::cli_run(
        "docker",
        vec![
            "buildx",
            "build",
            "-f",
            "web-server.Dockerfile",
            ".",
            "-t",
            &format!("ghcr.io/dzcode-io/{}-dot-dzcode-dot-io-server:latest", env_str),
        ],
    );

    println!("Building ./api docker image ...");
    cli_run::cli_run(
        "docker",
        vec![
            "buildx",
            "build",
            "-f",
            "api.Dockerfile",
            ".",
            "-t",
            &format!("ghcr.io/dzcode-io/api-dot-{}-dot-dzcode-dot-io-server:latest", env_str),
        ],
    );


    println!("Logging in to GitHub Container Registry ...");
    let gh_token = std::env::var("DOCKER_REGISTRY_PASSWORD")
        .expect("DOCKER_REGISTRY_PASSWORD environment variable not set");
    cli_run::cli_run(
        "docker",
        vec![
            "login",
            "ghcr.io",
            "-u",
            "dzcode-io",
            "--password",
            &gh_token,
        ],
    );

    println!("Pushing docker image ...");
    cli_run::cli_run(
        "docker",
        vec!["push", &format!("ghcr.io/dzcode-io/{}-dot-dzcode-dot-io-server:latest", env_str)],
    );
    cli_run::cli_run(
        "docker",
        vec!["push", &format!("ghcr.io/dzcode-io/api-dot-{}-dot-dzcode-dot-io-server:latest", env_str)],
    );

    println!("Deploying to zcluster ...");
    cli_run::cli_run(
        "zcluster",
        vec!["deploy", "-p", &format!("{}-dzcode", env_str), &format!("./docker-compose.{}.yml", env_str)],
    );
}
