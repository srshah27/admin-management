import mysql.connector
import pandas as pd

db = mysql.connector.connect(
    host="localhost", user="root", password="sr.Shah27", database="suidhaaga"
)
excel_dataframe = pd.read_excel("employee.xlsx", sheet_name="Sheet1")

mycursor = db.cursor()

def insert_data():
    i = 0
    while i < len(excel_dataframe):
        print('this iis test', excel_dataframe.iloc[i, 4])
        query = "INSERT INTO data (firstname, lastname, mobile, employment) VALUES (%s, %s, %s, %s)"
        values = (
            str(excel_dataframe.iloc[i, 1]),
            str(excel_dataframe.iloc[i, 2]),
            int(excel_dataframe.iloc[i, 3]),
            str(excel_dataframe.iloc[i, 4]),
        )
        mycursor.execute(query, values)
        db.commit()
        i = i + 1
    print("Data inserted successfully")



insert_data()
