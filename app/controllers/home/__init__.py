#!/usr/bin/python3
from fastapi import APIRouter, Request, Depends, Response, Form

# from .params import LoginItems
from app.dependencies import Db, check_access, create_access_token, html_response, ok_response, bad_response, get_current_user_from_cookie
from datetime import timedelta
from app import Settings, User
from fastapi.responses import HTMLResponse, RedirectResponse
from .params import History, Dataremove, Update_Status, Send_mail, Add_member
from app.libraries.sender import Mail
from datetime import datetime

panel_router = APIRouter()



@panel_router.post('/adaugare')
async def adaugare(
    items: Add_member,
    user: User=Depends(get_current_user_from_cookie)
):
    print('xd adaugare' * 100)
    if not user:
        return RedirectResponse('/logout')
    if not items.member_platit: items.member_platit = False
    if not items.member_name and not items.member_mail: return {'status': False}
    print('xd')
    status, new_member_id = Db.add_member(items.member_name, items.member_mail, items.member_platit)
    if(Db.add_history(new_member_id ,datetime.now().strftime("%Y-%m-%d"), datetime.now().strftime("%H:%M:%S"), user, f'A adaugat membrul {items.member_name}')):
        return {'status': True, 'data': [items.member_name, items.member_mail]}



@panel_router.post('/remove')
async def remove(
    data: Dataremove,
    user: User=Depends(get_current_user_from_cookie)
):
    if not user:
        return RedirectResponse('/logout')
    if(Db.remove_member(data.member_id)):
        return {'status': True, 'data': [data.member_id]}
    return {'status': False}



@panel_router.get('/member_list/')
async def get_member_list(
    page : int,
    total : int,
    status_membri : int,
    user : User=Depends(get_current_user_from_cookie)
):
    print(page, total, status_membri)
    if not user:
        return RedirectResponse('/logout')
    if page < 1 : page = 1
    if not total: page =1
    membri= Db.get_membri(page, status_membri)
    return {'membri': membri}



@panel_router.get('/member_list_count/')
async def get_member_list_count(
    status_membri : int,
    user: User=Depends(get_current_user_from_cookie)
):
    if not user:
        return RedirectResponse('/logout')
    if status_membri != 0 and status_membri != 1 : status_membri = 1
    member_count= Db.get_members_count(status_membri)
    return {'count': member_count}



@panel_router.post('/update')
async def update_status_platit(data: Update_Status, user: User=Depends(get_current_user_from_cookie)):
    if not user:
        return RedirectResponse('/logout')
    if(Db.update_status_platit(data.member_id, data.platit)):
        return {'status': True, 'data': [data.member_id, data.platit, data.username]}
    return {'status': False}



@panel_router.get('/adaugare')
async def get_adaugare(
    request: Request,
    user: User=Depends(get_current_user_from_cookie)
):
    if not user:
        return RedirectResponse('/logout')
    return RedirectResponse('/logout')



@panel_router.post('/sendmail')
async def send_mail(
    data: Send_mail,
    request: Request,
    user: User=Depends(get_current_user_from_cookie)
):
    if not user:
        return RedirectResponse('/logout')
    return Mail.mail_ok({
            'owner': {
            'name' : data.username,
            'mail' : data.mail_user,
        },
    })

@panel_router.get('/history_page_count')
async def history_page_count(
    type_history : int,
    user: User=Depends(get_current_user_from_cookie)
):
    if not user:
        return RedirectResponse('/logout')
    
    history_page_count = Db.get_history_page(type_history)
    return {'count': history_page_count}

@panel_router.get('/history_page/')
async def history_page(
    page : int,
    total : int,
    type_history : int,
    user : User=Depends(get_current_user_from_cookie)
):
    print(page, total)
    if not user:
        return RedirectResponse('/logout')
    if page < 1 : page = 1
    if not total: page =1
    history_page = Db.get_history(page, type_history)
    print(history_page)
    return {'history': history_page}

@panel_router.post('/history_add')
async def history_add(
    data: History,
    user: User=Depends(get_current_user_from_cookie)
):
    if not user:
        return RedirectResponse('/logout')
    xd = datetime.now()

    if(Db.add_history(data.member_id ,datetime.now().strftime("%Y-%m-%d"), datetime.now().strftime("%H:%M:%S"), user, data.sentance)):
        return {'status': True}
    return {'status': False}

@panel_router.get('/sendall')
async def sendall(
    user: User=Depends(get_current_user_from_cookie)
):
    if not user:
        return RedirectResponse('/logout')
    
    lista_membri = Db.get_membrs_mail_name()
    print(lista_membri, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    for membru in lista_membri:
        print(membru['name'])
        if Mail.mail_ok({
            'owner': {
            'name' : membru['name'],
            'mail' : membru['mail'],
            },
        }): pass
        else: return {'status': False}
    return {'status': True}