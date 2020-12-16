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

- First, clone [this repository](https://github.com/ducanhdt/online-learning.git).

```shell
$ git clone https://github.com/ducanhdt/online-learning.git
$ cd online-learning
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
### How to use the website
- First login to default admin account :
username: ducanh.admin@gmail.com
pass: 123456
- Then create some user with email account and your name . The password is automatically set to 123456 . You can change this password later when you login to this account 
- Back to login page and login to those account you have created.
- When you have logined , you can create some class, get into class with given code .
- Then you can enter class with the door icon on the screen .
- In class, you can post some status then anyone in same class can see.
- There are 2 button: 
  + FileList button : enter file section to upload and download file from other user
  + Get into class butto : enter classroom video call section to view video call and chatting with other people in the same video call section
