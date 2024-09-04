from dataclasses import dataclass
from fastapi import Form

@dataclass
class loginForm:
    username: str= Form(...)
    password: str= Form(...)


def conv(data):
    while '!' in data:
        data= data.replace('!', '+q+')
    while '@' in data:
        data= data.replace('@', '+w+')
    while '#' in data:
        data= data.replace('#', '+e+')
    while '$' in data:
        data= data.replace('$', '+r+')
    while '%' in data:
        data= data.replace('%', '+t+')
    while '^' in data:
        data= data.replace('^', '+y+')
    while '&' in data:
        data= data.replace('&', '+u+')
    while '*' in data:
        data= data.replace('*', '+i+')
    while '(' in data:
        data= data.replace('(', '+o+')
    while ')' in data:
        data= data.replace(')', '+p+')
    while '-' in data:
        data= data.replace(')', '+a+')
    while '_' in data:
        data= data.replace(')', '+s+')
    
    return data
    

def reconv(data):
    while '+q+' in data:
        data= data.replace('+q+', '!')
    while '+w+' in data:
        data= data.replace('+w+', '@')
    while '+e+' in data:
        data= data.replace('+e+', '#')
    while '+r+' in data:
        data= data.replace('+r+', '$')
    while '+t+' in data:
        data= data.replace('+t+', '%')
    while '+y+' in data:
        data= data.replace('+y+', '^')
    while '+u+' in data:
        data= data.replace('+u+', '&')
    while '+i+' in data:
        data= data.replace('+i+', '*')
    while '+o+' in data:
        data= data.replace('+o+', '(')
    while '+p+' in data:
        data= data.replace('+p+', ')')
    while '+a+' in data:
        data= data.replace('+a+', '-')
    while '+s+' in data:
        data= data.replace('+s+', '_')

    return data