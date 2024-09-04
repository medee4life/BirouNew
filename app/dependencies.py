#!/usr/bin/python3
from fastapi import status, HTTPException, Depends, Request
from fastapi.templating import Jinja2Templates
from app.module import Database
from jwt.exceptions import InvalidTokenError
from typing import Annotated
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
)
from pydantic import BaseModel
from datetime import timedelta, datetime, timezone
from jose import jwt, JWTError


templates = Jinja2Templates(directory="app/templates")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
Db = Database.Database()


class TokenData(BaseModel):
    user_id: str | None = None


#inn app
# ---------------------------------------------------
class Settings:
    ENVIRONMENT: str = "development"
    SECRET_KEY: str = "secret-key"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30  # in mins
    COOKIE_NAME = "access_token"
    COTIZATIE: int = 200
    DATA_COTIZATIE: int = 1

def create_access_token(data: TokenData, expires_delta: timedelta | None = None):
    print(expires_delta, "expires_delta")
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, Settings.SECRET_KEY, algorithm= Settings.ALGORITHM)
    return encoded_jwt


class User(BaseModel):
    username: str
    email: str
    status: str


def check_access(
    token: Annotated[str, Depends(oauth2_scheme)]
)-> User | None:
    print(locals())
    try:
        payload = jwt.decode(token, Settings.SECRET_KEY, algorithms=[Settings.ALGORITHM])
    except InvalidTokenError:
        return 
    
    if not payload:
        return
    
    print(payload, 'payload')

    return {}
    user = Db.user_in_db(username=token_data.username)

def decode_token(token: str) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, 
        detail="Could not validate credentials."
    )
    
    if not token:
        return
    
    token = token.removeprefix("Bearer").strip()
    try:
        payload = jwt.decode(token, Settings.SECRET_KEY, algorithms=[Settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return
    except JWTError as e:
        print(e)
        return
        raise credentials_exception
    
    user = Db.user_in_db(username)
    return user

def get_current_user_from_cookie(request: Request) -> User:
    """
    Get the current user from the cookies in a request.
    
    Use this function from inside other routes to get the current user. Good
    for views that should work for both logged in, and not logged in users.
    """
    token = request.cookies.get(Settings.COOKIE_NAME)
    user = decode_token(token)
    return user


def bad_response(
    message: str | None = None,
    fields: dict | None = None,
    status_code: int = status.HTTP_400_BAD_REQUEST
):
    details: dict = {}
    if message:
        details["message"] = message
    if fields:
        details["fields"] = fields 

    raise HTTPException(
        status_code=status_code,
        detail=details
    )


def ok_response(
    message: str | None = None,
    data: dict | None = None
):
    response: dict = {}
    if message:
        response["message"] = message

    if data:
        response["data"] = data
    return response


def html_response(
    file_path: str,
    context: dict
):
    return templates.TemplateResponse(
        file_path, 
        context
    )
