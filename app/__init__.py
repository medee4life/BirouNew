#!/usr/bin/python3
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, HTTPException, Request, Form, status, Response, Depends, Header
from .dependencies import *

from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from app.controllers.auth import router
from app.controllers.home import panel_router
from typing import Optional, Annotated

# ---------------------------------------------------


app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(
    router=router,
    prefix= ""
)

app.include_router(
    router= panel_router,
    prefix= "/panel"
    )

#pages
# ---------------------------------------------------
@app.get("/")
async def read_item(
    user: User=Depends(get_current_user_from_cookie)
):

    if user:
        return RedirectResponse(url='panel', status_code=302)
    
    return RedirectResponse(url='/logout', status_code=302)

@app.get("/login")
async def login(
    request: Request,
    user: User=Depends(get_current_user_from_cookie),
    ):
    if user:
        return RedirectResponse("/panel")
    return html_response("login.html", {"request": request})

@app.get("/panel")
async def panel(
    request: Request,
    user: User=Depends(get_current_user_from_cookie),
):  
    if not user:
        return RedirectResponse('/logout')
    return html_response("panel.html", {"request": request, 'name': user})

@app.get("/logout")
async def login_get():
    response = RedirectResponse(url="/login")
    response.delete_cookie(Settings.COOKIE_NAME)
    return response


































# @app.post('/submitFinal')
# def final(msg: str = Form(...)):
#     return f'You reached your destination. The msg is {msg}'
    
# @app.post('/submit')
# def redirect(msg: str = Form(...)):
#     headers = {'Location': '/submitFinal'}
#     return Response(content=msg, headers=headers, status_code=status.HTTP_307_TEMPORARY_REDIRECT)

# @app.get('/xd')
# def index(request: Request):
#     return templates.TemplateResponse('index.html', {'request': request})