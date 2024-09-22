from fastapi import Form
from dataclasses import dataclass
from typing import Optional
from pydantic import BaseModel

class Dataremove(BaseModel):
    member_id: int | None = None
    username: str | None = None

class Update_Status(BaseModel):
    member_id: int | None = None
    platit: bool| None = None
    username: str | None = None

class History(BaseModel):
    member_id: int | None
    sentance: str | None = None

class Send_mail(BaseModel):
    member_id: int | None = None
    username: str | None = None
    mail_user: str | None = None

class Add_member(BaseModel):
    member_name: str
    member_mail: str
    member_platit: bool | None = None

# @dataclass
# class adaugareForm:
#     username: Optional[str]
#     mail: Optional[str]
#     platit: bool
#     def is_valid(self) -> bool:
#         return all([self.username, self.mail, self.platit is not None])
    
# def get_form_data(
#         username: str= Form(...),
#         mail: str= Form(...),
#         platit: bool= Form(False)       
# ) -> adaugareForm:
#     return adaugareForm(username= username, mail= mail, platit= platit)

