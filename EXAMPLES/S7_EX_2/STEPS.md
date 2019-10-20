# DEMO #1

## Przygotowujemy aplikację

### 1) Tworzymy prosty serwer www - drobną aplikację
  - plik `mini_www.js` oparty o moduł _http_ 
  - serwerek nasłuchuje na porcie `8080`
  - podaje w odpowiedzi nazwę maszyny i bieżący czas
### 2) Uruchamiamy serwer, komendą
  `node mini_www.js`
### 3) Odwiedzamy stronę http://localhost:8080

## Tworzymy konfigurację Docker-a

### 4) tworzymy konfigurację Docker-owej aplikacji / obrazu
   - zakładamy plik Dockerfile
   - plik jest w formacie yml, uwazamy na wcięcia, nie uzywamy tabulatorów
### 5) budujemy obraz Docker-a komendą:
```sh
docker build -t little_www .
```
otrzymujemy wynik podobny do:
```sh
Sending build context to Docker daemon  6.144kB
Step 1/5 : FROM node:latest
---> 80121c35659a
Step 2/5 : RUN mkdir -p /app
---> Running in 67916f807374
Removing intermediate container 67916f807374
---> 3d5bdac131a7
Step 3/5 : COPY mini_www.js /app
---> 988ec6a85d25
Step 4/5 : EXPOSE 8080
---> Running in 9ae65b9952e1
Removing intermediate container 9ae65b9952e1
---> 927e661d0ca6
Step 5/5 : CMD [ "node", "/app/mini_www" ]
---> Running in 12ee803a6040
Removing intermediate container 12ee803a6040
---> 824aed341a05
Successfully built 824aed341a05
Successfully tagged little_www:latest
```

### 6) powstaje obraz o nazwie `little_www`, sprawdzamy to poleceniem
```sh 
docker image ls
```  
wynik (inne id to normalne):
```sh
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
little_www               latest              824aed341a05        7 seconds ago       906MB
```

### 7) można zmniejszyć pojemność obrazu stosując okrojoną wersję Node.JS zwaną `node:12-alpine`, utworzy się obraz o pojemności ok. 80 MB.

## Test obrazu
### 8) uruchamiamy sobie na próbę kontener testowy na porcie 3000 z nowo utworzonego obrazu, komendą
```sh
docker run --rm -p 3000:8080 -it little_www 
```

### 9) i odwiedzamy stronę http://localhost:3000 i ukazuje nam się nasza "mini" strona www z nazwą hosta i bieżącym czasem

### 10) gasimy kontener testowy poleceniem
```sh 
docker kill ...nazwahosta...
```

wstawiając nazwę hosta którą widzieliśmy na stronie. Tak więc nasza aplikacjia działa ;-)
## Kongfiguracja HA Proxy
### 11) Szykujemy konfigurację HA Proxy - katalog `ha-proxy` i plik `docker-compose.yml` zawierający dwa kontenery robocze: `mechanizm HA` i nasza `aplikacja`.

### 12) Inicjujemy Docker-owego Swarm-a komendą:
```sh
docker swarm init
```
otrzymujemy komunikat tego typu:
```sh
Swarm initialized: current node (dk8xl2jgglah4tg7vaermsehh) is now a manager.
To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-5ip23t8q1po6lui9gk88w2mf9ahkvfkjvfqali6bcz7xdhuoss-7bz6djslslms14srlo3nf8seg 192.168.65.3:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

### 13) Sprawdzamy działanie mechanizmu i listę stosów, poleceniem:
```sh
docker stack ls
```
i otrzymujemy wynik:
```sh
NAME                SERVICES            ORCHESTRATOR
```

### 14) Tworzymy stos - definicją jest nasz plik `docker-compose.yml` - wydajemy komendę:
```sh
    docker stack deploy --compose-file=./ha-proxy/docker-compose.yml app
```
Stos będzie miał nazwę `app`, a kontenery przedrostek `app_` w nazwie.

wynik komendy:
```sh
Creating network app_web
Creating service app_proxy
Creating service app_mywww
```

### 15) Sprawdzamy stan naszych stosów komendą:
 ```sh
docker stack ls
``z   
i widzimy 
```sh
NAME                SERVICES            ORCHESTRATOR
app                 2                   Swarm
```
W naszym stosie o nazwie `app` pracują `dwa` serwisy: ha-proxy i aplikacja.

### 16) Sprawdzamy ilość kontenerów w działaniu, wydajemy polecenie:
 ```sh
    docker ps | nl -v 0
```
i widzimy:
```sh
     0	CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS              PORTS                       NAMES
     1	0e7240227e27        dockercloud/haproxy:latest   "/sbin/tini -- docke…"   3 minutes ago       Up 3 minutes        80/tcp, 443/tcp, 1936/tcp   app_proxy.1.is2lcap4sk2n310henkvuulgr
     2	b7b0a8c6f3cb        little_www:latest            "node /app/mini_www"     3 minutes ago       Up 3 minutes        8080/tcp                    app_mywww.8.mdz84pgfncle48cccvyubevnm
     3	1e82e94cf0a9        little_www:latest            "node /app/mini_www"     3 minutes ago       Up 3 minutes        8080/tcp                    app_mywww.10.0ads9teq8h1vki5qy3ee8378a
     4	bf1355c3e611        little_www:latest            "node /app/mini_www"     3 minutes ago       Up 3 minutes        8080/tcp                    app_mywww.7.l68dp66ympp2ilvl2e7sjle8f
     5	d249b2c5a5c3        little_www:latest            "node /app/mini_www"     3 minutes ago       Up 3 minutes        8080/tcp                    app_mywww.9.tigltquzy5cvbqhhafoe4fu3d
     6	60bf18e14213        little_www:latest            "node /app/mini_www"     3 minutes ago       Up 3 minutes        8080/tcp                    app_mywww.1.mt1jc1ustlrb80ijyfscyreal
     7	e1a140d89129        little_www:latest            "node /app/mini_www"     3 minutes ago       Up 3 minutes        8080/tcp                    app_mywww.3.ck836ai5i63u0z67ejtmtme9i
     8	6ba3cf82b0ce        little_www:latest            "node /app/mini_www"     3 minutes ago       Up 3 minutes        8080/tcp                    app_mywww.4.bt10f8ut2ecvancp09fmstwao
     9	7b66cbbb3639        little_www:latest            "node /app/mini_www"     3 minutes ago       Up 3 minutes        8080/tcp                    app_mywww.5.sqk7w75728x2jmy6qg01qxgwf
    10	599e572efa60        little_www:latest            "node /app/mini_www"     3 minutes ago       Up 3 minutes        8080/tcp                    app_mywww.2.uuhe1o65fgx5nrgyaflg2tkyo
    11	36b916eaeca2        little_www:latest            "node /app/mini_www"     3 minutes ago       Up 3 minutes        8080/tcp                    app_mywww.6.maxd18hwk4ie227d16c1x5dce
```

Mamy 11 kontenerów: 1 ha-proxy i 10 maszyn z naszą aplikacją ;-)

### 17) Nasze HA Proxy nasłuchuje na porcie 80, zatem wywołujemy naszą stronę http://localhost:80
Po odświeżeniu strony za każdym razem dostaniemy odpowiedź z innego węzła naszego systemu

### 18) Wydając komendę na terminalu:
```sh
for i in {1..20}; do curl http://localhost:80; echo "$i"; done;
```
wywołamy `20` żądań do naszej strony i otrzymamy listę wyników:
```sh
<h1>Welcome on host 599e572efa60</h1><h2>Thu Oct 10 2019 14:50:45 GMT+0000 (Coordinated Universal Time)<h2>1
<h1>Welcome on host e1a140d89129</h1><h2>Thu Oct 10 2019 14:50:45 GMT+0000 (Coordinated Universal Time)<h2>2
<h1>Welcome on host 6ba3cf82b0ce</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>3
<h1>Welcome on host 7b66cbbb3639</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>4
<h1>Welcome on host 36b916eaeca2</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>5
<h1>Welcome on host bf1355c3e611</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>6
<h1>Welcome on host b7b0a8c6f3cb</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>7
<h1>Welcome on host d249b2c5a5c3</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>8
<h1>Welcome on host 60bf18e14213</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>9
<h1>Welcome on host 1e82e94cf0a9</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>10
<h1>Welcome on host 599e572efa60</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>11
<h1>Welcome on host e1a140d89129</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>12
<h1>Welcome on host 6ba3cf82b0ce</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>13
<h1>Welcome on host 7b66cbbb3639</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>14
<h1>Welcome on host 36b916eaeca2</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>15
<h1>Welcome on host bf1355c3e611</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>16
<h1>Welcome on host b7b0a8c6f3cb</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>17
<h1>Welcome on host d249b2c5a5c3</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>18
<h1>Welcome on host 60bf18e14213</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>19
<h1>Welcome on host 1e82e94cf0a9</h1><h2>Thu Oct 10 2019 14:50:46 GMT+0000 (Coordinated Universal Time)<h2>20
```
Jak widać, co 10 odpowiedź należy do tego samego węzła, węzły są zużywane w kolejności jeden za drugim, taką ustawiliśmy regułę HA, jako `BALANCE=leastconn`, a losowość zapewniła by nam reguła `BALANCE=roundrobin`

### 19) Wyobraźmy sobie, że teraz dokonujemy zmiany w naszym kodzie
- zrobimy kopię naszej aplikacji do katalogu `"CHANGES"`
- wgrajmy tam plik `mini_www.js`
- wgrajmy tam plik `Dockerfile`

### 20) Zmienimy zawartość pliku `mini_www.js`
- ze słowa `Welcome` np. na słowo `Hello` 

i to będzie nasza druga wersja aplikacji

### 21) Pozostając w katalogu `CHANGES` wykonujemy obraz naszej aplikacji - wariant drugi
```sh
docker build -t little_www:v2 .
```
i otrzymujemy wynik:
```sh
Sending build context to Docker daemon  3.072kB
Step 1/5 : FROM node:latest
 ---> 80121c35659a
Step 2/5 : RUN mkdir -p /app
 ---> Using cache
 ---> 3d5bdac131a7
Step 3/5 : COPY mini_www.js /app
 ---> 8a85b8c7439f
Step 4/5 : EXPOSE 8080
 ---> Running in a99e48060145
Removing intermediate container a99e48060145
 ---> aa91e855b275
Step 5/5 : CMD [ "node", "/app/mini_www" ]
 ---> Running in 78b0929adaab
Removing intermediate container 78b0929adaab
 ---> 030cfe6108ea
Successfully built 030cfe6108ea
Successfully tagged little_www:v2

```

Powstał obraz `little_www` z tagiem `v2`

### 22) Widać to na zbiorze obrazów - komendą:
```sh
   docker image ls
```
dostajemy:
```sh
REPOSITORY               TAG                 IMAGE ID            CREATED              SIZE
little_www               v2                  030cfe6108ea        About a minute ago   906MB
little_www               latest              824aed341a05        36 minutes ago       906MB
```
Mamy dwa obrazy o nazwie `little_www` jeden z tagiem `latest` drugi z tagiem `v2`


### 23) uruchamiamy sobie na próbę kontener testowy na porcie 3000 z nowo utworzonego obrazu `V2`, komendą
```sh
   docker run --rm -p 3000:8080 -it little_www:v2 
```

### 24) i odwiedzamy stronę http://localhost:3000 i ukazuje nam się nasza "mini" strona www z nazwą hosta i bieżącym czasem i nowym słowem `Hello`

### 25) Odwiedzamy nasz poprzedni serwis (on cały czas działa) na http://localhost:80 i pokazuje nam cały czas odpowiedź w wersji pierwszej ze słowem `Welcome`

### 26) na drugim terminalu gasimy kontener testowy z obrazem `v2`, poleceniem
```sh
docker kill ...nazwahosta...
```
wstawiając nazwę hosta którą widzieliśmy na stronie. Tak więc nasza aplikacja w wersji "v2" działa ;-)

### 27) Sprawdzamy z jakich maszyn i obrazów składa się nasza bieżąca konfiguracja stosu `app` - wydajemy komendę:
```sh
docker stack ps app
```
i otrzymujemy:
```
ID                  NAME                IMAGE                        NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
mt1jc1ustlrb        app_mywww.1         little_www:latest            docker-desktop      Running             Running 30 minutes ago
is2lcap4sk2n        app_proxy.1         dockercloud/haproxy:latest   docker-desktop      Running             Running 30 minutes ago
uuhe1o65fgx5        app_mywww.2         little_www:latest            docker-desktop      Running             Running 30 minutes ago
ck836ai5i63u        app_mywww.3         little_www:latest            docker-desktop      Running             Running 30 minutes ago
bt10f8ut2ecv        app_mywww.4         little_www:latest            docker-desktop      Running             Running 30 minutes ago
sqk7w75728x2        app_mywww.5         little_www:latest            docker-desktop      Running             Running 30 minutes ago
maxd18hwk4ie        app_mywww.6         little_www:latest            docker-desktop      Running             Running 30 minutes ago
l68dp66ympp2        app_mywww.7         little_www:latest            docker-desktop      Running             Running 30 minutes ago
mdz84pgfncle        app_mywww.8         little_www:latest            docker-desktop      Running             Running 30 minutes ago
tigltquzy5cv        app_mywww.9         little_www:latest            docker-desktop      Running             Running 30 minutes ago
0ads9teq8h1v        app_mywww.10        little_www:latest            docker-desktop      Running             Running 30 minutes ago
```
Czyli nasze maszyny odpowiedające za aplikację nazywają się z przedrostkiem `app_mywww` i widzimy, że wszystkie oparte są na obrazie `little_www:latest`


### 28) Bez stopowania naszego serwisu www na porcie 80 i bez stopowania 10 kontenerów aplikacyjnych, podpinamy naszą drugą wersję aplikacji wydając komendę:
```sh
docker service update --image little_www:v2 app_mywww
```
dostajemy komunikaty:
```sh
app_mywww
overall progress: 0 out of 10 tasks
1/10: ready     [======================================>            ]
2/10: ready     [======================================>            ]
3/10:
4/10:
5/10:
6/10:
7/10:
8/10:
9/10:
10/10:
```
po 20 sekundach, 4 kontenery gotowe ... :
```sh
app_mywww
overall progress: 0 out of 10 tasks
overall progress: 4 out of 10 tasks
1/10: running   [==================================================>]
2/10: running   [==================================================>]
3/10: running   [==================================================>]
4/10: running   [==================================================>]
6/10:
7/10:
8/10:
9/10:
10/10:
```
w międzyczasie nasz stos zmienia stan:
```sh
ID                  NAME                IMAGE                        NODE                DESIRED STATE       CURRENT STATE                     ERROR               PORTS
ukhs58kdejol        app_mywww.1         little_www:v2                docker-desktop      Running             Running about a minute ago
mt1jc1ustlrb         \_ app_mywww.1     little_www:latest            docker-desktop      Shutdown            Shutdown about a minute ago
is2lcap4sk2n        app_proxy.1         dockercloud/haproxy:latest   docker-desktop      Running             Running 35 minutes ago
cq1qridyvf9g        app_mywww.2         little_www:v2                docker-desktop      Running             Running 52 seconds ago
uuhe1o65fgx5         \_ app_mywww.2     little_www:latest            docker-desktop      Shutdown            Shutdown 55 seconds ago
ueybosn4rei9        app_mywww.3         little_www:v2                docker-desktop      Running             Running 25 seconds ago
ck836ai5i63u         \_ app_mywww.3     little_www:latest            docker-desktop      Shutdown            Shutdown 27 seconds ago
bt10f8ut2ecv        app_mywww.4         little_www:latest            docker-desktop      Running             Running 35 minutes ago
ef3v4zvtxxfn        app_mywww.5         little_www:v2                docker-desktop      Running             Running 53 seconds ago
sqk7w75728x2         \_ app_mywww.5     little_www:latest            docker-desktop      Shutdown            Shutdown 55 seconds ago
pq2yt2hyejn6        app_mywww.6         little_www:v2                docker-desktop      Running             Starting less than a second ago
maxd18hwk4ie         \_ app_mywww.6     little_www:latest            docker-desktop      Shutdown            Shutdown less than a second ago
9rboha6wkorf        app_mywww.7         little_www:v2                docker-desktop      Running             Running about a minute ago
l68dp66ympp2         \_ app_mywww.7     little_www:latest            docker-desktop      Shutdown            Shutdown about a minute ago
dvnp96frozei        app_mywww.8         little_www:v2                docker-desktop      Running             Starting less than a second ago
mdz84pgfncle         \_ app_mywww.8     little_www:latest            docker-desktop      Shutdown            Shutdown less than a second ago
tigltquzy5cv        app_mywww.9         little_www:latest            docker-desktop      Running             Running 35 minutes ago
jp0uakumlsvp        app_mywww.10        little_www:v2                docker-desktop      Running             Running 25 seconds ago
0ads9teq8h1v         \_ app_mywww.10    little_www:latest            docker-desktop      Shutdown            Shutdown 29 seconds ago
```

Część kontenerów ma już nowy image `v2`, część poprzedni `latest`....

po 50 sekundach 
```sh
app_mywww
overall progress: 0 out of 10 tasks
overall progress: 10 out of 10 tasks
1/10: running   [==================================================>]
2/10: running   [==================================================>]
3/10: running   [==================================================>]
4/10: running   [==================================================>]
5/10: running   [==================================================>]
6/10: running   [==================================================>]
7/10: running   [==================================================>]
8/10: running   [==================================================>]
9/10: running   [==================================================>]
10/10: running   [==================================================>]
verify: Service converged
```

Wszystkie kontenery mają nową aplikację (`v2`) na sobie ...
```sh
ID                  NAME                IMAGE                        NODE                DESIRED STATE       CURRENT STATE                 ERROR               PORTS
ukhs58kdejol        app_mywww.1         little_www:v2                docker-desktop      Running             Running 3 minutes ago
mt1jc1ustlrb         \_ app_mywww.1     little_www:latest            docker-desktop      Shutdown            Shutdown 3 minutes ago
is2lcap4sk2n        app_proxy.1         dockercloud/haproxy:latest   docker-desktop      Running             Running 37 minutes ago
cq1qridyvf9g        app_mywww.2         little_www:v2                docker-desktop      Running             Running 2 minutes ago
uuhe1o65fgx5         \_ app_mywww.2     little_www:latest            docker-desktop      Shutdown            Shutdown 2 minutes ago
ueybosn4rei9        app_mywww.3         little_www:v2                docker-desktop      Running             Running 2 minutes ago
ck836ai5i63u         \_ app_mywww.3     little_www:latest            docker-desktop      Shutdown            Shutdown 2 minutes ago
bfzzyeted7zt        app_mywww.4         little_www:v2                docker-desktop      Running             Running about a minute ago
bt10f8ut2ecv         \_ app_mywww.4     little_www:latest            docker-desktop      Shutdown            Shutdown about a minute ago
ef3v4zvtxxfn        app_mywww.5         little_www:v2                docker-desktop      Running             Running 2 minutes ago
sqk7w75728x2         \_ app_mywww.5     little_www:latest            docker-desktop      Shutdown            Shutdown 2 minutes ago
pq2yt2hyejn6        app_mywww.6         little_www:v2                docker-desktop      Running             Running about a minute ago
maxd18hwk4ie         \_ app_mywww.6     little_www:latest            docker-desktop      Shutdown            Shutdown 2 minutes ago
9rboha6wkorf        app_mywww.7         little_www:v2                docker-desktop      Running             Running 3 minutes ago
l68dp66ympp2         \_ app_mywww.7     little_www:latest            docker-desktop      Shutdown            Shutdown 3 minutes ago
dvnp96frozei        app_mywww.8         little_www:v2                docker-desktop      Running             Running about a minute ago
mdz84pgfncle         \_ app_mywww.8     little_www:latest            docker-desktop      Shutdown            Shutdown 2 minutes ago
u13wh1olmg91        app_mywww.9         little_www:v2                docker-desktop      Running             Running about a minute ago
tigltquzy5cv         \_ app_mywww.9     little_www:latest            docker-desktop      Shutdown            Shutdown about a minute ago
jp0uakumlsvp        app_mywww.10        little_www:v2                docker-desktop      Running             Running 2 minutes ago
0ads9teq8h1v         \_ app_mywww.10    little_www:latest            docker-desktop      Shutdown            Shutdown 2 minutes ago
```

Aktywne są węzły z obrazem `little_www:v2` a wygaszone z obrazem `little_www:latest`
   
### 29) Aplikacja nasza podmieniała węzły po 2 kolejne co 10 sekund, nie przerywając pracy systemu, cały czas obsługując klientów na porcie 80

### 30) Hosty zgłaszają nową wersję odpowiedzi:

Hello on host 90220c3182e5
Thu Oct 10 2019 15:19:00 GMT+0000 (Coordinated Universal Time)

## Manewrowanie wydajnością

### 31) Jeśli obciążenie naszej aplikacji wzrasta, to możemy zarządzać wydajnością naszej aplikacji np.:
```sh
docker service scale app_mywww=35
```
 co sprawi, że aplikacja zwiększy ilość maszyn/kontenerów do 35 szt.
 informując nas komunikatem:
```sh
app_mywww scaled to 35
overall progress: 15 out of 35 tasks

....
....
....

app_mywww scaled to 35
overall progress: 35 out of 35 tasks
verify: Service converged
```

### 32) Upewniamy się co do ilośći węzłów:
```sh
   docker stack ps app
```
i mamy 10 maszyn skonwertowanych wcześniej i 25 nowych węzłów
```sh
ID                  NAME                IMAGE                        NODE                DESIRED STATE       CURRENT STATE                ERROR               PORTS
ukhs58kdejol        app_mywww.1         little_www:v2                docker-desktop      Running             Running 9 minutes ago
mt1jc1ustlrb         \_ app_mywww.1     little_www:latest            docker-desktop      Shutdown            Shutdown 9 minutes ago
is2lcap4sk2n        app_proxy.1         dockercloud/haproxy:latest   docker-desktop      Running             Running 44 minutes ago
cq1qridyvf9g        app_mywww.2         little_www:v2                docker-desktop      Running             Running 9 minutes ago
uuhe1o65fgx5         \_ app_mywww.2     little_www:latest            docker-desktop      Shutdown            Shutdown 9 minutes ago
ueybosn4rei9        app_mywww.3         little_www:v2                docker-desktop      Running             Running 8 minutes ago
ck836ai5i63u         \_ app_mywww.3     little_www:latest            docker-desktop      Shutdown            Shutdown 8 minutes ago
bfzzyeted7zt        app_mywww.4         little_www:v2                docker-desktop      Running             Running 7 minutes ago
bt10f8ut2ecv         \_ app_mywww.4     little_www:latest            docker-desktop      Shutdown            Shutdown 7 minutes ago
ef3v4zvtxxfn        app_mywww.5         little_www:v2                docker-desktop      Running             Running 9 minutes ago
sqk7w75728x2         \_ app_mywww.5     little_www:latest            docker-desktop      Shutdown            Shutdown 9 minutes ago
pq2yt2hyejn6        app_mywww.6         little_www:v2                docker-desktop      Running             Running 8 minutes ago
maxd18hwk4ie         \_ app_mywww.6     little_www:latest            docker-desktop      Shutdown            Shutdown 8 minutes ago
9rboha6wkorf        app_mywww.7         little_www:v2                docker-desktop      Running             Running 9 minutes ago
l68dp66ympp2         \_ app_mywww.7     little_www:latest            docker-desktop      Shutdown            Shutdown 9 minutes ago
dvnp96frozei        app_mywww.8         little_www:v2                docker-desktop      Running             Running 8 minutes ago
mdz84pgfncle         \_ app_mywww.8     little_www:latest            docker-desktop      Shutdown            Shutdown 8 minutes ago
u13wh1olmg91        app_mywww.9         little_www:v2                docker-desktop      Running             Running 7 minutes ago
tigltquzy5cv         \_ app_mywww.9     little_www:latest            docker-desktop      Shutdown            Shutdown 7 minutes ago
jp0uakumlsvp        app_mywww.10        little_www:v2                docker-desktop      Running             Running 8 minutes ago
0ads9teq8h1v         \_ app_mywww.10    little_www:latest            docker-desktop      Shutdown            Shutdown 8 minutes ago
65g2qkc3gvdl        app_mywww.11        little_www:v2                docker-desktop      Running             Running about a minute ago
a3pt95cixxm7        app_mywww.12        little_www:v2                docker-desktop      Running             Running about a minute ago
i1e1wceytar0        app_mywww.13        little_www:v2                docker-desktop      Running             Running about a minute ago
sytlskppbike        app_mywww.14        little_www:v2                docker-desktop      Running             Running about a minute ago
yiatav8cgero        app_mywww.15        little_www:v2                docker-desktop      Running             Running about a minute ago
jbxzdab1mrz9        app_mywww.16        little_www:v2                docker-desktop      Running             Running about a minute ago
og184ao7iow4        app_mywww.17        little_www:v2                docker-desktop      Running             Running about a minute ago
7fev81jjfi4q        app_mywww.18        little_www:v2                docker-desktop      Running             Running about a minute ago
o02516yfe4dq        app_mywww.19        little_www:v2                docker-desktop      Running             Running about a minute ago
j70tvruufi1x        app_mywww.20        little_www:v2                docker-desktop      Running             Running about a minute ago
ei2qvyosrpz9        app_mywww.21        little_www:v2                docker-desktop      Running             Running about a minute ago
s0zer20hv8ab        app_mywww.22        little_www:v2                docker-desktop      Running             Running about a minute ago
0ibqm73c6x8h        app_mywww.23        little_www:v2                docker-desktop      Running             Running about a minute ago
ehydr1merayd        app_mywww.24        little_www:v2                docker-desktop      Running             Running about a minute ago
xai5dirr31cw        app_mywww.25        little_www:v2                docker-desktop      Running             Running about a minute ago
ie3mbauuhltf        app_mywww.26        little_www:v2                docker-desktop      Running             Running about a minute ago
9far5lk9nzrt        app_mywww.27        little_www:v2                docker-desktop      Running             Running about a minute ago
niqplvlg1pdv        app_mywww.28        little_www:v2                docker-desktop      Running             Running about a minute ago
qkl5fx682ha8        app_mywww.29        little_www:v2                docker-desktop      Running             Running about a minute ago
d717gcnf12ab        app_mywww.30        little_www:v2                docker-desktop      Running             Running about a minute ago
j4syu3o3io1a        app_mywww.31        little_www:v2                docker-desktop      Running             Running about a minute ago
cme551ho9s8u        app_mywww.32        little_www:v2                docker-desktop      Running             Running about a minute ago
pjpsbacas0ad        app_mywww.33        little_www:v2                docker-desktop      Running             Running about a minute ago
2v82ke98xk9e        app_mywww.34        little_www:v2                docker-desktop      Running             Running about a minute ago
zl7r8gjq1iff        app_mywww.35        little_www:v2                docker-desktop      Running             Running about a minute ago
```

### 33) Możemy zeskalować nasz system też do 1 kontenera lub do 0
```sh
docker service scale app_mywww=0
```
lub
```sh
docker service scale app_mywww=1
```
i zobaczymy rezultat:
```sh
ID                  NAME                IMAGE                        NODE                DESIRED STATE       CURRENT STATE             ERROR               PORTS
qd1lqw4b6xix        app_mywww.1         little_www:v2                docker-desktop      Running             Running 8 seconds ago
mt1jc1ustlrb         \_ app_mywww.1     little_www:latest            docker-desktop      Shutdown            Shutdown 12 minutes ago
is2lcap4sk2n        app_proxy.1         dockercloud/haproxy:latest   docker-desktop      Running             Running 46 minutes ago
```
1 - running, 1 - shutdown, 1 - ago

Zeskalowanie serwisu w stosie do `0` powoduje brak serwisu www i nie działającą stronę w punkcie HA-Proxy.





