export function isValidEmail(email: string): string | true {
    if (!email.includes('@')) {
        return 'Uwzględnij znak "@" w adresie e-mail.';
    }
    if (!email.includes('.')) {
        return 'Uwzględnij znak "." w adresie e-mail.';
    }
    return true;
}

export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(phone);
}

export function mainView(): string {
    return `
        <html>
            <head>
                <style>
                    .tabs {
                        display: flex;
                        flex-direction: column;
                        width: 200px; 
                    }

                    .tabs button {
                        margin-bottom: 10px; 
                    }

                    .tab-content {
                        display: none;
                        margin-left: 20px; 
                    }

                    .active {
                        display: block;
                    }
                </style>
                <script>
                    function showTab(tabId) {
                        const contents = document.querySelectorAll('.tab-content');
                        contents.forEach(el => {
                            el.style.display = 'none';
                            el.classList.remove('active');
                        });

                        const content = document.getElementById(tabId);
                        if (content) {
                            content.style.display = 'block';
                            content.classList.add('active');
                        }
                    }
                </script>
            </head>
            <body>
                <div class="tabs">
                    <button onclick="showTab('tab1')">Dodaj Klienta</button>
                    <button onclick="showTab('tab2')">Dodaj Pracownika</button>
                    <button onclick="showTab('tab3')">Dodaj Żądanie</button>
                </div>

                <div id="tab1" class="tab-content">
                    <form action="/submit-form"" method="post">
                    <input type="hidden" name="formId" value="form1">
                        <label for="nazwa">Nazwa:</label>
                        <input type="text" id="nazwa" name="nazwa"><br><br>
                        <label for="adres">Adres:</label>
                        <input type="text" id="adres" name="adres"><br><br>
                        <label for="email">E-mail:</label>
                        <input type="email" id="email" name="email"><br><br>
                        <label for="nip">NIP:</label>
                        <input type="text" id="nip" name="nip"><br><br>
                        <label for="telefon">Telefon:</label>
                        <input type="tel" id="telefon" name="telefon"><br><br>
                        <input type="submit" value="Submit">
                    </form>
                </div>

                <div id="tab2" class="tab-content">
                    <form action="/submit-form"" method="post">
                    <input type="hidden" name="formId" value="form2">
                        <label for="email2">E-mail:</label>
                        <input type="email" id="email2" name="email"><br><br>
                        <label for="haslo">Hasło:</label>
                        <input type="password" id="haslo" name="haslo"><br><br>
                        <label for="imie">Imię:</label>
                        <input type="text" id="imie" name="imie"><br><br>
                        <label for="nazwisko">Nazwisko:</label>
                        <input type="text" id="nazwisko" name="nazwisko"><br><br>
                        <label for="telefon2">Telefon:</label>
                        <input type="tel" id="telefon2" name="telefon"><br><br>
                        <input type="submit" value="Submit">
                    </form>
                </div>

                <div id="tab3" class="tab-content">
                    <form action="/submit-form" method="post">
                        <input type="hidden" name="formId" value="form3">
                        <label for="pracownikID">Pracownik ID:</label>
                        <input type="text" id="pracownikID" name="pracownikID"><br><br>
                        <label for="klientID">Klient ID:</label>
                        <input type="text" id="klientID" name="klientID"><br><br>
                        <label for="opis">Opis:</label>
                        <input type="text" id="opis" name="opis"><br><br>
                        <label for="status">Status:</label>
                        <input type="text" id="status" name="status"><br><br>
                        <input type="submit" value="Submit">
                    </form>
                </div>
            </body>
        </html>
    `;
}