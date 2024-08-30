import re





def username(data: str):
    return re.match('^[a-zA-Z0-9\.\@\-\_]+$', data)


def password(data: str):
    return re.match('^[a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\-\_]+$', data)