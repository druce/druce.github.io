import numpy as np # not used in this example, but works!

def rolling_return(series, n):
    "given a series of m returns, compute m-n rolling n-period returns"
    m = len(series)
    retarray = []
    for i in range(m-n):
        rr = 1.0
        for j in range(n):
            rr = rr * (1+ series[i+j])
        retarray.append(rr-1)
    return retarray

active_sheet("Returns")
stocks = CellRange("Equities").value
bonds = CellRange("Bonds").value
bills = CellRange("Bills").value
cpi = CellRange("CPI").value

realbonds = [bonds[i]-cpi[i] for i in range(len(cpi))]
realbills = [bills[i]-cpi[i] for i in range(len(cpi))]
realstocks = [stocks[i]-cpi[i] for i in range(len(cpi))]

active_sheet("Data_1928")
for i in range(1,31):
    tempbonds = rolling_return(realbonds,i)
    tempbills = rolling_return(realbills,i)
    tempstocks = rolling_return(realstocks,i)
    Cell(i+1,2).value = min(tempstocks)
    Cell(i+1,3).value = min(tempbonds)
    Cell(i+1,4).value = min(tempbills)

active_sheet("Data_1946")

realbonds46=realbonds[18:]
realbills46=realbills[18:]
realstocks46=realstocks[18:]

for i in range(1,31):
    tempbonds = rolling_return(realbonds46,i)
    tempbills = rolling_return(realbills46,i)
    tempstocks = rolling_return(realstocks46,i)
    Cell(i+1,2).value = min(tempstocks)
    Cell(i+1,3).value = min(tempbonds)
    Cell(i+1,4).value = min(tempbills)

