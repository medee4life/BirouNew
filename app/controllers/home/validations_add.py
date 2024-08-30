#!/usr/bin/python3

import app.libraries.validations as validations

def adaugare_membru(*args): 
    print(args)
    errors: dict = {}

    if "items" not in args[0]:
        errors["error"]= "O eroare a avut loc in zona date trimise"
        return errors

    print(args[0]["items"].username)

    if args[0]["items"].username:
        if not validations.username(args[0]["items"].username):
            errors["username"] = "Datele din campul Utilizator nu sunt corecte"
    else:
        errors["username"] = "Datele din campul Utilizator nu au fost completate"


    if args[0]["items"].password:
        if not validations.password(args[0]["items"].password):
            errors["password"] = "Datele din campul Parola nu sunt corecte"
    else:
        errors["password"] = "Datele din campul Parola nu au fost completate"

    if errors:
        return errors

    return None 