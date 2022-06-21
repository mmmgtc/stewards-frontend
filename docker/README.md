# Docker

Start your local docker environment:

```
make up
```

Then access http://localhost:3000

Login to your docker container:

```
make in
```

To clear containers:

```
docker rm -f $(docker ps -a -q)
```

To clear images:

```
docker rmi -f $(docker images -a -q)
```

To clear volumes:

```
docker volume rm $(docker volume ls -q)
```

To clear networks:

```
docker network rm $(docker network ls | tail -n+2 | awk '{if($2 !~ /bridge|none|host/){ print $1 }}')
```