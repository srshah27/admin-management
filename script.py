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
        query = "INSERT INTO employee (roll, fullname, mobile, batch_month, batch_no, batch_time) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (
            str(excel_dataframe.iloc[i, 0]),
            str(excel_dataframe.iloc[i, 1]),
            int(excel_dataframe.iloc[i, 2]),
            str(excel_dataframe.iloc[i, 3]),
            str(excel_dataframe.iloc[i, 4]),
            str(excel_dataframe.iloc[i, 5]),
        )
        mycursor.execute(query, values)
        db.commit()
        i = i + 1
    print("Data inserted successfully")



insert_data()
