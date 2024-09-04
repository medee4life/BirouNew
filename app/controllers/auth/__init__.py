#!/usr/bin/python3
from fastapi import APIRouter, Request, Depends, Response, Form

# from .params import LoginItems
from .validations import loginval
from app.dependencies import Db, check_access, create_access_token, html_response, ok_response, bad_response
from datetime import timedelta
from app import Settings, User
from fastapi.responses import HTMLResponse, RedirectResponse
from .params import loginForm, conv


router = APIRouter()



@router.post('/login')
async def login(
    request: Request,
    response: Response,
    items: loginForm = Depends(),
    # user: User=Depends(check_access)
):
    logver= loginval({"items": items})
    if logver!= None:
        print(logver)
        return html_response("login.html", {'request': request, 'data': logver})
    
    status, message = Db.login(items.username, conv(items.password))
    print(message)
    if not status:
        return html_response("login.html", {'request': request, 'error': message})
    
    
    access_token_expires = timedelta(minutes=Settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": items.username}, expires_delta=access_token_expires
    )
    
    response= RedirectResponse(url='/panel', status_code=302)
    response.set_cookie(
        key=Settings.COOKIE_NAME, 
        value=f"Bearer {access_token}", 
        httponly=True
    )
    return response







