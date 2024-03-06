# About project
```
// @desc Listuje wszystkich userow
// @droute GET /api/lists
// @access Public

// @desc Listuje usera po ID produktu jaki posiada
// @droute GET /api/lists/:id
// @access Public

// @desc Rezerwuje produkt o podanym ID
// @droute POST /api/lists/:id
// @access Private

// @desc Rejestruje uzytkownika
// @droute POST /api/regiser_user
// @access Private


// @desc Autentykacja uzytkownika
// @droute POST /api/login_user
// @access Private

// @desc Wyswietl produkty oraz informacje uzytkownika w panelu
// @droute GET /api/dashboard_panel
// @access Private

// @desc Zaktualizuj dane o uzytkowniku (opis firmy, czas pracy, dane o regionie)
// @droute POST /api/dashboard_panel
// @access Private

// @desc Usun produkt
// @droute POST /api/dashboard_panel/remove-item
// @access Private

// @desc Dodaj nowy produkt
// @droute POST /api/dashboard_panel/add
// @access Private


// @desc Otrzymaj dane o produkcie
// @droute GET /api/dashboard_panel/edit/:id
// @access Private


// @desc Zaktualizuj dane o produkcie
// @droute POST /api/dashboard_panel/edit/:id
// @access Private

// @desc Usun produkt
// @droute POST /api/dashboard_panel/delete/:id
// @access Private


// @desc Dane o uzytkowniku o podanym ID
// @droute GET /api/user/:id
// @access Private
```
