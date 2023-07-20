import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVR

dataset = pd.read_csv("./stock-csvs/MMM.csv")
y = dataset.iloc[:, 1].values
x = np.array([(i + 1) for i in range(0, len(y))]).reshape(-1, 1)[::-1]

y = y.reshape(len(y), 1)
standard_scaler_x = StandardScaler()
standard_scaler_y = StandardScaler()
x = standard_scaler_x.fit_transform(x)
y = standard_scaler_y.fit_transform(y)

regressor = SVR(kernel="rbf")
regressor.fit(x, y.ravel())

y_predicted = standard_scaler_y.inverse_transform(regressor.predict(standard_scaler_x.transform(x)))

print(regressor)

# print(regressor.score(x, y))

# comparison_array = [f"{y_predicted[i]} {y[i]}\n" for i in range(0, len(y_predicted))]
# for element in comparison_array:
#     print(element)

plt.scatter(standard_scaler_x.inverse_transform(x), standard_scaler_y.inverse_transform(y), color="red")
plt.plot(standard_scaler_x.inverse_transform(x), standard_scaler_y.inverse_transform(regressor.predict(x)), color="blue")
plt.title("Truth or Bluff (Support Vector Regression)")
plt.xlabel("Position level")
plt.ylabel("Salary")
plt.show()