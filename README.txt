Projekt został przetestowany na wersji node.js v14.17.6
Wersja npm: 6.14.15

UWAGA: Aby poprawnie zainstalować dane pakiety należy wejśc do odpowiedniego katalogu /client (cd client) oraz /server (cd server) i wykonać polecenie "npm install"

Po tej operacji wszystkie niezbędne moduły zapisane w package.json powinny zostać zainstalowane.

Aby uruchomić server należy użyć polecenia "npm run dev" w katalogu /server, zaś aby uruchomić react'a należy w katalogu /client użyć polecenia "npm start"

Jeżeli w jakiś sposób jeden z pakietów nie został zainstalowany poprawnie
należy zastosować następujące polecenia:

1) W katalogu /server:
"npm install express express-validator jsonwebtoken mongoose nodemon dotenv bcryptjs bcrypt"

2) W katalogu /client:
"npm install react-router-dom react-bootstrap styled-components

W bazie istnieje testowy zarejestrowany użytkownik, bądź można stworzyć własnego użytkownika
email: marcin@o2.pl
hasło: 12345678