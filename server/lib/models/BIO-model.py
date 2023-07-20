import requests
import sys
import time
import numpy as np
import pandas as pd
from datetime import datetime
from dateutil.relativedelta import relativedelta
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVR
from io import StringIO

request_headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.8",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
}

TODAY = str(int(time.mktime((datetime.today()).timetuple())))
YEAR_AGO = str(int(time.mktime((datetime.today() - relativedelta(years=1)).timetuple())))

response = requests.get(f"https://query1.finance.yahoo.com/v7/finance/download/BIO?period1={YEAR_AGO}&period2={TODAY}&interval=1d&events=history&includeAdjustedClose=true", headers=request_headers)
dataset = pd.read_csv(StringIO(response.text))

y = dataset.iloc[:, 1].values
x = np.array([(i + 1) for i in range(0, len(y))]).reshape(-1, 1)[::-1]

y = y.reshape(len(y), 1)
standard_scaler_x = StandardScaler()
standard_scaler_y = StandardScaler()
x = standard_scaler_x.fit_transform(x)
y = standard_scaler_y.fit_transform(y)

regressor = SVR(kernel="rbf", epsilon=0.01)
regressor.fit(x, y.ravel())

y_predicted = standard_scaler_y.inverse_transform(regressor.predict(standard_scaler_x.transform([[sys.argv[1]]])))

print(float(y_predicted[0]))