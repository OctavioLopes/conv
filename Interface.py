import tkinter as tk
from tkinter import ttk
import Código

from printer import allPrinters

# Criar a janela principal
janela = tk.Tk()
janela.title("Tabela Tkinter")

# Criar o widget Treeview
tabela = ttk.Treeview(janela, columns=("ID", "LOCAL", "TONNER"))

# Adicionar cabeçalhos
tabela.heading("ID", text="ID")
tabela.heading("LOCAL", text="LOCAL")
tabela.heading("TONNER", text="TONNER")

def on_button_click():
    global reportPrinter

    reportPrinter = Código.generate_report()

    # Apagar a tabela
    tabela.delete(*tabela.get_children())

    # Adicionar linhas de exemplo
    for i, obj in enumerate(reportPrinter):
        tabela.insert(parent="", index="end", iid=i, values=(obj['idPrinter'], obj['localPrinter'], obj['TONNER']))

# Criar o botão
button = tk.Button(janela, text="Click me!", command=on_button_click)

# Mostrar o botão
button.pack()

# Mostrar a tabela
tabela.pack()

# Iniciar o loop principal
janela.mainloop()