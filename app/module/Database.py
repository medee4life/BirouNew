import psycopg2
import random
from passlib.hash import bcrypt

class Database:
    def __init__(self):
        self.dbclient = psycopg2.connect(database="creatorshub", user="postgres", password="xd", host="localhost", port="5432")
        self.createdb()
    
    def createdb(self):
        cur = self.dbclient.cursor()
        def create_db():
            cur.execute('''
                        CREATE TABLE IF NOT EXISTS users (
                        id serial PRIMARY KEY, 
                        name VARCHAR(30),
                        password VARCHAR(250),
                        mail VARCHAR(40),
                        status_user SMALLINT not null default 1);
                        ''')
            self.dbclient.commit()
            cur.execute('''
                        CREATE TABLE IF NOT EXISTS membri (
                        id serial PRIMARY KEY, 
                        name VARCHAR(30),
                        mail VARCHAR(40),
                        platit BOOLEAN,
                        status_membri SMALLINT not null default 1);
                        ''')
            self.dbclient.commit()
            cur.execute('''
                        CREATE TABLE IF NOT EXISTS history (
                        date VARCHAR(20),
                        username VARCHAR(30),
                        action VARCHAR(200));
                        ''')
            self.dbclient.commit()
            # Execute tables
            cur.execute('''
                        CREATE TABLE IF NOT EXISTS not_execute_tables (
                        execute BOOLEAN DEFAULT FALSE);
                        ''')
            self.dbclient.commit()
            cur.execute("""
            INSERT INTO not_execute_tables (execute)
            VALUES (FALSE)
            """)
            self.dbclient.commit()

        create_db()
        
        #reloads tables
        def resetdb():
            print('table reset')
            cur.execute('''
            DROP TABLE users;
            ''')
            self.dbclient.commit()
            cur.execute('''
            DROP TABLE membri;
            ''')
            self.dbclient.commit()
            cur.execute('''
            DROP TABLE not_execute_tables;
            ''')
            self.dbclient.commit()
            cur.execute('''
            DROP TABLE history;
            ''')
            self.dbclient.commit()
            
            create_db()
            
            cur.execute("""
            INSERT INTO users (name, password, mail)
            VALUES
                ('user1', %s, 'user1@user.com'),
                ('madalin', %s, 'medee4lifee@gmail.com');
            """, (bcrypt.hash('user1'), bcrypt.hash('madalin')))
                #add acc
            self.dbclient.commit()
            cur.execute("""
                        UPDATE not_execute_tables
                        SET execute = TRUE 
                        """)
            self.dbclient.commit()
        
        def som():
            cur.execute('''
                            SELECT * FROM not_execute_tables;
                            ''')
            resetdbb = cur.fetchone()
            if resetdbb == None:
                return False
            if False in resetdbb:
                return False
            return True
        
        if not som():
            resetdb() 
            
        
    def user_in_db(self, username):
        cur = self.dbclient.cursor()
        cur.execute(f"SELECT name FROM users WHERE name='{username}' AND status_user=1")
        user = cur.fetchone()
        if user == None : return None
        print(user, 'asfsdfsdfghfdhdfhdfghdfgh')
        return user[0]

    def login(self, username, password):
        cur = self.dbclient.cursor()
        cur.execute(f"SELECT password FROM users WHERE name='{username}' AND status_user=1")
        passwordDb = cur.fetchone()
        if passwordDb == None:
            return False, 'Wrong credentials'
        if bcrypt.verify(password, passwordDb[0]):
            return True, 'Correct'
        return False, 'Wrong'
    


    def get_members_count(self, member_status):
        cur = self.dbclient.cursor()
        if member_status == 1 :
            cur.execute("""
                SELECT COUNT(id)
                FROM membri
                WHERE status_membri = 1;
                """)
        else :
                cur.execute("""
                SELECT COUNT(id)
                FROM membri
                """)
        member_count = cur.fetchone()

        return member_count[0]



    def get_membri(self, page, status_membri):
        cur = self.dbclient.cursor()
        if status_membri == 1 :
            cur.execute(f"SELECT id, name, mail, platit FROM membri WHERE status_membri = 1 ORDER BY id LIMIT 10 OFFSET (10 * ({page} - 1))")
        else :
           cur.execute(f"SELECT id, name, mail, platit, status_membri FROM membri ORDER BY id LIMIT 10 OFFSET (10 * ({page} - 1))") 
        lista_membri = cur.fetchall()
        lista_dict_membri=[]
        if status_membri == 1:
            for membru in lista_membri:
                dictmembru={}
                print(membru)
                x= 0
                for info in membru:
                    match x:
                        case 0:
                            dictmembru['id']= info
                        case 1:
                            dictmembru['username']= info
                        case 2:
                            dictmembru['mail']= info
                        case 3:
                            dictmembru['platit']= info
                    x+= 1
                lista_dict_membri.append(dictmembru)
        else:
            for membru in lista_membri:
                dictmembru={}
                print(membru)
                x= 0
                for info in membru:
                    match x:
                        case 0:
                            dictmembru['id']= info
                        case 1:
                            dictmembru['username']= info
                        case 2:
                            dictmembru['mail']= info
                        case 3:
                            dictmembru['platit']= info
                        case 4:
                            dictmembru['status_membru'] = info
                    x+= 1
                lista_dict_membri.append(dictmembru)
                
        return lista_dict_membri
    
    def add_member(self, username, mail, platit):
        cur = self.dbclient.cursor()
        cur.execute("""
            SELECT id FROM membri
            WHERE name = %s AND mail = %s 
            """, (username, mail))
        member_exist = cur.fetchone()
        print(platit, 'zzzzzzzzz')
        if member_exist != None:
            cur = self.dbclient.cursor()
            cur.execute(f"UPDATE membri SET platit = {platit}, status_membri = 1 WHERE id = {member_exist[0]}")
            self.dbclient.commit()
            
        else:
            cur = self.dbclient.cursor()
            cur.execute("""
                INSERT INTO membri (name, mail, platit, status_membri)
                VALUES (%s, %s, %s, 1);
                """,
                (username, mail.lower(), platit))
            self.dbclient.commit()
        return True
    
    def remove_member(self, id):
        cur = self.dbclient.cursor()
        cur.execute(f"UPDATE membri SET status_membri = 0 WHERE id = {id};"
        )
        self.dbclient.commit()
        return True
    
    def update_status_platit(self, id, platit):
        cur = self.dbclient.cursor()
        if platit:
            cur.execute(f"UPDATE membri SET platit = true WHERE id = {id};")
        else:
            cur.execute(f"UPDATE membri SET platit = false WHERE id = {id};")
        self.dbclient.commit()
        return True
    

    def get_history_page(self):
        cur = self.dbclient.cursor()
        cur.execute("""
            SELECT COUNT(date)
            FROM history
            """)
        member_count = cur.fetchone()

        return member_count[0]
    
    def get_history(self, page):
        cur = self.dbclient.cursor()
        cur.execute(f"SELECT date, username, action FROM history ORDER BY date DESC LIMIT 10 OFFSET (10 * ({page} - 1))") 
        
        lista_history = cur.fetchall()
        lista_dict_history=[]
        for action in lista_history:
            dictaction={}
            print(action)
            x= 0
            for info in action:
                match x:
                    case 0:
                        dictaction['date']= info
                    case 1:
                        dictaction['username']= info
                    case 2:
                        dictaction['action']= info
                x+= 1
            lista_dict_history.append(dictaction)
                
        return lista_dict_history
    

    def add_history(self, date, username, sentance):
        cur = self.dbclient.cursor()
        
        cur.execute("""
            INSERT INTO history (date, username, action)
            VALUES (%s, %s, %s);
            """,
            (date, username, sentance))
        self.dbclient.commit()
        return True