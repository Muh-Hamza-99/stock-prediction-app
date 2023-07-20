import requests
from bs4 import BeautifulSoup

URL = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"

requests = requests.get(URL)

soup = BeautifulSoup(requests.text, "xml")
table = soup.find("table", id="constituents")
table_body = table.tbody
table_rows = table_body.find_all("tr")
table_rows.pop(0)

with open("stocks.txt", "a") as file:
    for row in table_rows:
        cells = row.find_all("td")
        stock_name, company_name = cells[0].a.text, cells[1].a.text
        file.write(f"{stock_name}:{company_name}\n")