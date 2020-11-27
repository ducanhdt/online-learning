# chatbot-frontend

## Installation

### Prerequisites

#### ![Linux Logo](https://i.imgur.com/3iHIGaC.png) Linux

Your Linux system should have the following installed first:

- GIT
- Docker (follow [this guide](https://docs.docker.com/install/linux/docker-ce/ubuntu/) to install Docker on Ubuntu)
- Docker Compose (follow [this guide](https://docs.docker.com/compose/install/) to install Docker Compose)

#### ![Windows Logo](https://i.imgur.com/2HfZwb4.png) Windows

Your Windows system should have the following installed first:

- GIT
- A console emulator (GIT Bash or [Cmder](https://github.com/cmderdev/cmder))
- Docker (follow [this guide](https://docs.docker.com/docker-for-windows/install/) to install Docker on Windows)
- Docker Compose (you can skip installing Docker Compose as it is already included along with Docker Desktop for Windows)

### Steps to Install

- First, clone [this repository](https://github.com/huyenpk97/chatbot).

```shell
$ git clone https://github.com/huyenpk97/chatbot.git
$ cd chatbot
```
- Then, run the following command and go grab a cup of water 🥤 while waiting for it to finish (it will take a few minutes):

```shell
$ docker-compose build --no-cache
```

- Once the command finishes, run this one last command and you're good to go:

```shell
$ docker-compose up
```

- Open your browser and head to [http://localhost:3000](http://localhost:3000). Enjoy coding 🎉!


**Note**: In Windows, all of the following commands below must be run within GIT Bash or Cmder.