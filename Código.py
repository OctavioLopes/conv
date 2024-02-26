# main.py

import time
import pandas as pd
import re
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import WebDriverException
from printer import allPrinters

from webdriver_manager.chrome import ChromeDriverManager

def generate_report():
    global reportPrinter

    reportPrinter = []

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    for i, obj in enumerate(allPrinters):
        newIP = 'http://' + obj['idPrinter'] + '/cgi-bin/dynamic/printer/PrinterStatus.html'
        try:
            teste = driver.get(newIP)
            element = driver.find_element(By.XPATH, "/html/body/table[1]/tbody/tr[3]/td/b")
            text = element.text
            palavras = text.split()
            if len(palavras) > 2:
                numbers = re.findall('\d+', palavras[2])

                number = int(numbers[0])
                if number < 15:
                    reportPrinter.append({"idPrinter": obj['idPrinter'], "localPrinter": obj['localPrinter'], "TONNER": number})
            else:
                reportPrinter.append({"idPrinter": obj['idPrinter'], "localPrinter": obj['localPrinter'], "TONNER": 0})
        except WebDriverException as e:
            pass

    driver.quit()

    return reportPrinter

# ImpressorasTonner