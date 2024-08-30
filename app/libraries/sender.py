#!/usr/bin/python3
# import the smtp email lib
import smtplib
# import the jinja2 template lib
from jinja2 import Environment, PackageLoader, select_autoescape
# import the custom libs

from fastapi.templating import Jinja2Templates
from app.dependencies import Settings 

from operator import itemgetter
from email import utils, encoders
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.header import Header

import urllib.parse
from datetime import datetime, timedelta


class Mail:
    # set the jinja template location
    # _env: Environment = Environment(
    #     loader=PackageLoader('.', 'templates'),
    #     autoescape=select_autoescape(['html', 'xml'])
    # )

    templates = Jinja2Templates(directory="app/libraries/templates")
    # set sender holder
    _sender:dict = {
        'email':'medee4lifee@gmail.com',
        'password':'ttgo bmjy dudm hjlx ',
        'host':'smtp.gmail.com',
        'port':587,
        'name':"notificari@webcreatorshub.ro"
    }


    _text_version = '''Acest e-mail contine parti HTML.\nFoloseste un client compatibil pentru a putea vizualiza mesajul!\n\nEchipa webcreatorshub.ro'''

    @staticmethod
    def _alternative(data, contenttype):
        maintype, subtype = contenttype.split('/')
        if maintype == 'text':
            retval = MIMEText(data, _subtype=subtype)
        else:
            retval = MIMEBase(maintype, subtype)
            retval.set_payload(data)
            encoders.encode_base64(retval)
        return retval

    @staticmethod
    def mail_ok(data: dict)-> bool:

        # get the mail template for this request
        template = Mail.templates.get_template('mail_template.html')
        next_date = ((datetime.today()).replace(day=Settings.DATA_COTIZATIE) + timedelta(days=32)).replace(day=Settings.DATA_COTIZATIE)
        # render the template and send the values data
        html = template.render(
            username = data["owner"]["name"],
            cotizatie = Settings.COTIZATIE,
            date = {
                'day' : next_date.strftime("%d"),
                'month' : next_date.strftime("%m"),
                'year' : next_date.strftime("%Y")
            }
        )

        # check html
        if not html:
            return False

        return Mail.send_email(
            template=html,
            destination=data["owner"]["mail"],
            subject="Reminder"
        )
    
    def send_email(template, destination:str, subject:str)-> bool:
        if Settings.ENVIRONMENT == "development":
            old_destination = destination
            destination = "medee4lifee@gmail.com"
            print(f"\033[93mEmails are send only in test & production. Current {Settings.ENVIRONMENT=:} {destination=:}, intented mail : {old_destination}\033[0m")
            # return True

        # Create message container - the correct MIME type is multipart/alternative.
        msg = MIMEMultipart("alternative")
        msg["Message-ID"] = utils.make_msgid(
            idstring = Settings.SECRET_KEY,
            domain = Mail._sender["email"].split("@")[-1]
        )
        msg["Subject"]    = subject
        msg["From"]       = str(Header(f'{Mail._sender["name"]} <{Mail._sender["email"]}>'))
        msg["Date"]       = utils.formatdate(localtime = 1)
        msg["To"]         = destination

        # attach the text and the template
        msg.attach(Mail._alternative(subject,"text/plain"))
        msg.attach(Mail._alternative(template,"text/html"))

        try:
            # initialize mail object
            mail = smtplib.SMTP(Mail._sender["host"], Mail._sender["port"])
            # perform mail handshake
            mail.ehlo()
            # set secure mail transport
            mail.starttls()
            # login to mail server
            mail.login(Mail._sender["email"], Mail._sender["password"])
            # send message
            mail.sendmail(Mail._sender["email"], destination, msg.as_string())
            # close mail connection
            mail.quit()
        except Exception as e:
            return False

        return True
