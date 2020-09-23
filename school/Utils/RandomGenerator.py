from lxml import html
import requests
import pymysql.cursors
import sqlite3
import mysql.connector
from datetime import datetime
from mysql.connector import Error
from mysql.connector import errorcode
import random
import sys

NamesM=[
'Canberk',
'Daghan',
'Ahmet',
'Kagan',
'Askin',
'Atakan',
'Kutay',
'Polat',
'Kerem',
'Ali'];

NamesF=[
'Esma',
'Ada', 
'Umran',
'Sinem',
'Ece',
'Sevda',
'Zeynep',
'Bade',
'Irem',
'Ruya'
];

surNames=[
 'Abadan',
 'Sozeri',
 'Bademci',
 'Evliyaoglu',
 'Sezek',
 'Camdali',
 'Ercetin',
 'Ertepinar',
 'Eronat',
 'Ayaydin'
];

clas=['A','B','C','D']
gender=['M','F']


class Student:
    def __init__(self):
        date=(2006+random.randrange(8))
        self.number = random.randrange(1000)+1
        self.clas = str(2014-date) + clas[random.randrange(4)]
        self.gender = gender[random.randrange(2)]
        if self.gender =='M':
            self.name = NamesM[random.randrange(10)]
        else :
            self.name = NamesF[random.randrange(10)]
        self.surName = surNames[random.randrange(10)]
        self.birthDate = str(date)+'-'+str(random.randrange(12)+1)+'-'+str(random.randrange(30)+1)


my_objects = []
for i in range (int(sys.argv[1])):
    my_objects.append(Student())
for obj in my_objects:
    print ("olusturulan objeler :")
    print(obj.name,obj.surName,obj.number,obj.clas,obj.gender,obj.birthDate)
try:
    connection = mysql.connector.connect(host='localhost',
                        database='test',
                        user='root',
                        password='')
    cursor = connection.cursor(prepared=True)
    
   
    for obj in my_objects:
        cursor.execute("SELECT numberr From students Where numberr = "+str(obj.number)+" Limit 1") 
        print("fetchall:")
        result = cursor.fetchall()
        print (result)
        if not result:
            sql_insert_query = """ INSERT INTO `students`
                            (`name`, `surName`, `numberr`, `class`, `gender`, `birthDate`) VALUES (%s,%s,%s,%s,%s,%s)"""
            insert_tuple = (obj.name, obj.surName, obj.number, obj.clas, obj.gender, obj.birthDate)
            result  = cursor.execute(sql_insert_query, insert_tuple)
            connection.commit()
            print ("Record inserted successfully into students table")
except mysql.connector.Error as error :
        connection.rollback()
        print("Failed to insert into MySQL table {}".format(error))
finally:
        #closing database connection.
        if(connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


#ALTER TABLE students AUTO_INCREMENT = 1
#DELETE FROM students
#"SELECT numberr From students Where numberr = ? Limit 1";