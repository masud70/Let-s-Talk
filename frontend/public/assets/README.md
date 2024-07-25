# Code Samurai 2024 (Team CU_CODECONQUEST)

Welcome to the README file for **Team CU_CODECONQUEST** participating in the Code **Samurai 2024** competition!

## Team Information

| Index              |  Value                     |
|--------------------|:--------------------------:|
| Team Name          |  CU_CODECONQUEST           |
| Institute          |  University of Chittagong  |


## Team Members

|  Team Member         |  Email                    |
|----------------------|:-------------------------:|
|  Md. Masud Mazumder  |  mdmasud.csecu@gmail.com  |
|  Atanu Kumar Dey     |  atanudey2153@gmail.com   |
|  Tonmoy Chandro Das  |  tonmoy.csecu@gmail.com   |

## Run the System

We can easily run the whole with only a single command:
```bash
docker compose up --build
```

To run in detached mode run the command:
```bash
docker compose up -d --build
```

### Admin Login Credentials
- Email: mdmasud.csecu@gmail.com
- Password: admin

## Frontend & Backend

- Frontend will be live at `http://localhost:3000`
- Backend will be live at `http://localhost:8000`

## Stop the System

Stopping all the running containers is also simple with a single command:
```bash
docker compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker compose down --rmi all
```

## API Documentation

Follow [this link](https://docs.google.com/spreadsheets/d/1IB3DqYuQ4h3guht7iD70wBFcgalozWCOZjQBM3LFn1s/edit?usp=sharing) to the API documentation.
